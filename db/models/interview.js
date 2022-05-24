const { DataTypes, Model } = require("sequelize");
const sequelize = require("../connect");

class InterviewRound extends Model {}

InterviewRound.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "InterviewRound",
  }
);

class Interviewer extends Model {}

Interviewer.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Interviewer",
    indexes: [{ unique: true, fields: ["email"] }],
  }
);

class InterviewerSlot extends Model {}

InterviewerSlot.init(
  {
    start: {
      type: DataTypes.STRING(16), //ISO Format without seconds and milliseconds is 16 digits long
      allowNull: false,
    },
    end: {
      type: DataTypes.STRING(16), //ISO Format without seconds and milliseconds is 16 digits long
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "InterviewerSlot",
  }
);

// InterviewerInvite is junction model for the many-to-many relationship between "Interviewer" and "InterviewRound"
class InterviewerInvite extends Model {
  deleteSlots() {
    return InterviewerSlot.destroy({ where: { InterviewerInviteId: this.id } });
  }
}
InterviewerInvite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  { sequelize, modelName: "InterviewerInvite" }
);

// StudentInterviewRoundInvite is junction model for the many-to-many relationship between "Student" and "InterviewRound"
class StudentInterviewRoundInvite extends Model {}
StudentInterviewRoundInvite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  { sequelize, modelName: "StudentInterviewRoundInvite" }
);

module.exports = {
  InterviewRound,
  Interviewer,
  InterviewerInvite,
  InterviewerSlot,
  StudentInterviewRoundInvite,
};

//all associations are in the user.js and quizmodel.js files because different ordering of loading of these files causes bugs
// see https://stackoverflow.com/questions/50615835/hasmany-called-with-something-thats-not-a-subclass-of-sequelize-model
