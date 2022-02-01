const nodemailer = require('nodemailer');
const ejs = require("ejs");
const { Student } = require('../db/models/user');

async function sendTextMail(recepient, subject, text) {
  if (process.env.NODE_ENV == "production") {
    // checking if this student has unsubscribed from emails, if so, we won't send email
    const student = await Student.findOne({where:{email:recepient}, attributes:["hasUnsubscribedFromEmails"]})
    
    if (student==null || !student.hasUnsubscribedFromEmails)
    {
      var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'mail@iec.org.pk',
          pass: 'Jah29535'
        },
        pool:true,
        rateLimit: 0.5
      });
      
      var mailOptions = {
        from: 'IEC Assessments <mail@iec.org.pk>',
        to: recepient,
        subject: subject,
        text: text
      };
      
      return transporter.sendMail(mailOptions);
    } else {
      return new Promise(resolve=>{
        resolve()
      })
    }
  } else {
    return new Promise(resolve=>{
      resolve()
    })
  }
}

async function sendHTMLMail(recepient, subject, ejs_obj) {
  if (process.env.NODE_ENV == "production") {
    // checking if this student has unsubscribed from emails, and if so, we won't send him/her an email
    const student = await Student.findOne({where:{email:recepient}, attributes:["hasUnsubscribedFromEmails"]})
    console.log(recepient, student)
    if (student==null || !student.hasUnsubscribedFromEmails)
    {
      var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'mail@iec.org.pk',
          pass: 'Jah29535'
        },
        pool:true,
        rateLimit: 0.5
      });

      const html = await ejs.renderFile(__dirname + "/../views/templates/mail-template-1.ejs", ejs_obj)
        
      var mailOptions = {
        from: 'IEC Assessments <mail@iec.org.pk>',
        to: recepient,
        subject: subject,
        html: html
      };
      
      return transporter.sendMail(mailOptions);
    } else {
      console.log(recepient, "email not allowed.")
      return new Promise(resolve=>{
        resolve()
      })
    }
  } else {
    return new Promise(resolve=>{
      resolve()
    })
  }
}

module.exports = {sendTextMail, sendHTMLMail}