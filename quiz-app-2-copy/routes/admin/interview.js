const express = require("express");
const router = express.Router();

const randomstring = require("randomstring");
const checkAdminAuthenticated = require("../../db/check-admin-authenticated");
const checkInterviewerAuthenticated = require("../../db/check-interviewer-authenticated");
const { generateRandomNumberInRange } = require("../../functions/utilities");
const getQuizTotalScore = require("../../functions/getQuizTotalScore");
const {
  InterviewRound,
  Interviewer,
  InterviewerInvite,
  InterviewerSlot,
  StudentInterviewRoundInvite,
} = require("../../db/models/interview");
const { DateTime } = require("luxon");
const { sendHTMLMail } = require("../../functions/sendEmail");
const passport = require("passport");
const { Quiz, Section } = require("../../db/models/quizmodel");
const { Score, Assignment, Student, Attempt } = require("../../db/models/user");
const roundToTwoDecimalPlaces = require("../../functions/roundToTwoDecimalPlaces");
// middleware that is specific to this router
router.use((req, res, next) => {
  next();
});

router.get("/", checkAdminAuthenticated, (req, res) => {
  res.render("admin/interview/index.ejs", {
    env: process.env.NODE_ENV,
    myname: req.user.user.firstName,
    user_type: req.user.type,
    site_domain_name: process.env.SITE_DOMAIN_NAME,
    current_url: `/admin/interview${req.url}`,
  });
});

router.get("/new/:quiz_id", checkAdminAuthenticated, (req, res) => {
  const new_interview_round_name = `Interview Round ${DateTime.now().toFormat(
    "hh:mm:ss-yyyy-LLL-dd"
  )}`;
  InterviewRound.create({
    title: new_interview_round_name,
    QuizId: req.params.quiz_id,
  }).then((interview_round) => {
    res.render("admin/interview/new.ejs", {
      interview_round_name: new_interview_round_name,
      interview_round_id: interview_round.id,
      env: process.env.NODE_ENV,
      user_type: req.user.type,
    });
  });
});

router.get("/edit/:interview_round_id", checkAdminAuthenticated, (req, res) => {
  InterviewRound.findOne({
    where: { id: req.params.interview_round_id },
  })
    .then((interview_round) => {
      if (interview_round != null) {
        res.render("admin/interview/new.ejs", {
          interview_round_name: interview_round.title,
          interview_round_id: interview_round.id,
          env: process.env.NODE_ENV,
          user_type: req.user.type,
        });
      } else {
        res.render("templates/error.ejs", {
          additional_info: "No such interview round exists",
          error_message:
            "You must have entered the wrong URL into the address bar of your browser. Please recheck or contact IT.",
          action_link: "/interview",
          action_link_text: "Return to Interview Panel",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.patch(
  "/update-round-title/:interview_round_id",
  checkAdminAuthenticated,
  async (req, res) => {
    try {
      const interview_round = await InterviewRound.findOne({
        where: { id: req.params.interview_round_id },
      });
      if (interview_round == null) res.sendStatus(401);
      else {
        await interview_round.update({ title: req.body.title });
        res.sendStatus(200);
      }
    } catch (err) {
      res.sendStatus(501);
    }
  }
);
router.post("/send-emails", checkAdminAuthenticated, async (req, res) => {
  const email_content = req.body.email_content;
  try {
    await new Promise((resolve) => {
      let i = 0;
      const n = req.body.interviewers.length;
      req.body.interviewers.forEach(async (interviewer) => {
        const interviewer_password = (
          await Interviewer.findOne({
            where: { email: interviewer.email },
            attributes: ["password"],
          })
        ).password;
        const interviewer_login_link = `${
          process.env.SITE_DOMAIN_NAME
        }/admin/interview/login/${
          interviewer.email
        }?password=${encodeURIComponent(interviewer_password)}`;
        await sendHTMLMail(interviewer.email, `${email_content.subject}`, {
          heading: email_content.heading,
          inner_text: email_content.body,
          button_announcer: email_content.button_pre_text,
          button_text: email_content.button_label,
          button_link: interviewer_login_link,
        });
        i++;
        if (i == n) resolve();
      });
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(501);
  }
});

router.post(
  "/update-interviewer-list/:interview_round_id",
  checkAdminAuthenticated,
  async (req, res) => {
    try {
      const interview_round = await InterviewRound.findOne({
        where: { id: req.params.interview_round_id },
      });
      const interviewers = await interview_round.getInterviewers();

      // we create two HashMaps. One for all the interviewers of this InterviewRound present in the Database, and one for all the interviewers sent by the user in this request

      let db_interviewers_map = new Map();
      interviewers.forEach((interviewer_object) => {
        db_interviewers_map.set(interviewer_object.email, interviewer_object);
      });

      let new_interviewers_map = new Map();
      req.body.interviewers.forEach((interviewer) => {
        new_interviewers_map.set(interviewer.email, true);
      });

      await new Promise((resolve) => {
        let i = 0;
        const n = req.body.interviewers.length;
        if (req.body.interviewers.length == 0) resolve();
        else {
          req.body.interviewers.forEach(async (interviewer) => {
            if (!db_interviewers_map.has(interviewer.email)) {
              const new_interviewer = (
                await Interviewer.findOrCreate({
                  where: { email: interviewer.email },
                  defaults: {
                    name: interviewer.name,
                    email: interviewer.email,
                    password: randomstring.generate({
                      length: generateRandomNumberInRange(14, 20),
                    }),
                  },
                })
              )[0];

              await InterviewerInvite.create({
                InterviewerId: new_interviewer.id,
                InterviewRoundId: req.params.interview_round_id,
              });
              db_interviewers_map.delete(interviewer.email);
            }
            i++;
            if (i == n) resolve();
          });
        }
      });

      await new Promise(async (resolve) => {
        let i = 0;
        const n = db_interviewers_map.size;
        if (n == 0) resolve();
        else {
          for (const interviewer of db_interviewers_map) {
            if (!new_interviewers_map.has(interviewer[1].email)) {
              await interviewer[1].destroy();
              await InterviewerInvite.destroy({
                where: {
                  InterviewerId: interviewer[1].id,
                  InterviewRoundId: req.params.interview_round_id,
                },
              });
            }
            i++;
            if (i == n) resolve();
          }
        }
      });

      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(501);
    }
  }
);

router.get("/login/:email", async (req, res) => {
  if (req.query.hasOwnProperty("password")) {
    res.render("interviewer/login/index.ejs", {
      email: req.params.email,
      password: req.query.password,
    });
  } else {
    res.sendStatus(400);
  }
});

router.post(
  "/login",
  passport.authenticate("interviewer-login", {
    failureRedirect: "/",
    failureFlash: true,
  }),
  async (req, res) => {
    if (req.hasOwnProperty("user")) {
      res.redirect("/admin/interview/panel");
    } else {
      res.sendStatus(403);
    }
  }
);

router.get("/panel", checkInterviewerAuthenticated, async (req, res) => {
  try {
    const interviewer = await Interviewer.findOne({
      where: { id: req.user.user.id },
    });
    const interview_rounds = await interviewer.getInterviewRounds();

    res.render("interviewer/panel.ejs", {
      env: process.env.NODE_ENV, //required when deciding which React dependencies to include (prod or dev)
      myname: req.user.user.name,
      user_type: req.user.type,
      interview_rounds: interview_rounds,
    });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get(
  "/declare-time-slots/:interview_round_id",
  checkInterviewerAuthenticated,
  async (req, res) => {
    const interview_round = await InterviewRound.findOne({
      where: { id: req.params.interview_round_id },
    });
    res.render("interviewer/time-slots-picker.ejs", {
      env: process.env.NODE_ENV,
      myname: req.user.user.name,
      user_type: req.user.type,
      interview_round_id: req.params.interview_round_id,
      interview_round_title: interview_round.title,
    });
  }
);

router.post(
  "/interviewer/save-time-slots",
  checkInterviewerAuthenticated,
  async (req, res) => {
    const interviewer_invite = await InterviewerInvite.findOne({
      where: {
        InterviewerId: req.user.user.id,
        InterviewRoundId: req.body.interview_round_id,
      },
    });
    await interviewer_invite.deleteSlots(); //custom class instance method I declared in models/interview.js
    let promises = [];
    req.body.time_slots.forEach((time_slot) => {
      promises.push(interviewer_invite.createInterviewerSlot(time_slot));
    });
    Promise.all(promises)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
);

router.post("/interviewees/save", checkAdminAuthenticated, async (req, res) => {
  try {
    const interview_round_id = req.body.interview_round_id;

    // let's get all students who have already been invited to this InterviewRound and create a hashmap.
    let interview_round_invites = await StudentInterviewRoundInvite.findAll({
      where: { InterviewRoundId: interview_round_id },
    });

    let students_already_invited = new Map();
    interview_round_invites.map((invite) => {
      students_already_invited.set(invite.StudentId, invite);
    });

    let i = 0;
    const n = req.body.students.length;

    await new Promise((resolve, reject) => {
      req.body.students.map(async (student) => {
        if (
          student.added == false &&
          students_already_invited.has(student.id)
        ) {
          students_already_invited.get(student.id).destroy();
        } else if (
          student.added == true &&
          !students_already_invited.has(student.id)
        ) {
          await StudentInterviewRoundInvite.create({
            StudentId: student.id,
            InterviewRoundId: interview_round_id,
          });
        }
        i++;
        if (i == n) {
          resolve();
        }
      });
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

router.get(
  "/all-students/:interview_round_id",
  checkAdminAuthenticated,
  async (req, res) => {
    const interview_round = await InterviewRound.findOne({
      where: { id: req.params.interview_round_id },
      attributes: ["id", "QuizId"],
      include: [{ model: Quiz, include: [Section] }],
    });

    if (interview_round != null && interview_round.QuizId != null) {
      // finding total score of quiz
      let quiz_total_score = await getQuizTotalScore(interview_round.Quiz);

      let data = []; //list of students who have solved this quiz and their data

      let assignments = await Assignment.findAll({
        where: { QuizId: interview_round.QuizId },
        include: [
          {
            model: Student,
            include: [InterviewRound],
          },
          {
            model: Attempt,
            include: [{ model: Section, order: ["id"] }, Score],
          },
        ],
      });

      if (assignments != null && assignments.length > 0) {
        assignments.forEach((assignment) => {
          // checking if this orientation exists in the
          const cur_index =
            data.push({
              added: assignment.Student.InterviewRounds.length > 0,
              id: assignment.Student.id,
              name:
                assignment.Student.firstName +
                " " +
                assignment.Student.lastName,
              email: assignment.Student.email,
              age: assignment.Student.age,
              gender: assignment.Student.gender,
              total_score_achieved: 0,
              percentage_score: 0,
            }) - 1;

          let remove_student = false; //we remove student from data if student turns out to have an unsolved section (no attempt)
          assignment.Attempts.forEach((attempt) => {
            if (attempt == null || attempt.Score == null) {
              remove_student = true;
            } else {
              data[cur_index].total_score_achieved += attempt.Score.score;
            }
          });

          data[cur_index].percentage_score = roundToTwoDecimalPlaces(
            (data[cur_index].total_score_achieved / quiz_total_score) * 100
          );
          if (remove_student) data.pop();
        });
      }
      res.json({ success: true, data: data });
    } else {
      console.log("Error: QuizId: or orientation:", orientation, "is NULL");
      res.json({ success: false });
    }
  }
);

router.get(
  "/interviewer/time-slots/:interview_round_id",
  checkInterviewerAuthenticated,
  async (req, res) => {
    const interviewer_invite = await InterviewerInvite.findOne({
      where: {
        InterviewerId: req.user.user.id,
        InterviewRoundId: req.params.interview_round_id,
      },
    });
    const time_slots = await interviewer_invite.getInterviewerSlots();

    res.json({ success: true, time_slots: time_slots });
  }
);

router.get(
  "/interviewers/all/:interview_round_id",
  checkAdminAuthenticated,
  async (req, res) => {
    const interview_round = await InterviewRound.findOne({
      where: { id: req.params.interview_round_id },
    });

    if (interview_round == null) res.sendStatus(404);
    else {
      const interviewers = await interview_round.getInterviewers({
        attributes: ["name", "email"],
      });
      res.status(200).json(interviewers);
    }
  }
);

router.get("/all", checkAdminAuthenticated, (req, res) => {
  InterviewRound.findAll({ order: [["id", "desc"]] })
    .then((interview_rounds) => {
      res.json({ success: true, interview_rounds: interview_rounds });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

module.exports = router;