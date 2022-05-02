const route = require("express").Router();
const nodemailer = require("nodemailer");

route.post("/", (req, res) => {
  const {
    sender_email,
    sender_password,
    cc_email,
    bcc_email,
    receiver_email,
    sender_name,
    subject,
    message,
  } = req.body;
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: sender_email,
      pass: sender_password,
    },
    secure: true,
  });

  //   console.log(transporter);
  let senderName;
  if (sender_name === undefined) {
    senderName = sender_email;
  } else {
    senderName = sender_name;
  }

  function wabodyfun(html) {
    var text1 = html.replace("*", "");
    var text2 = text1.replace(/<\/?[^>]+>/gi, "");
    return text2;
  }

  if (message.includes("*") && message.includes("<") && message.includes(">")) {
    htmlData = message;
    textData = wabodyfun(htmlData);
  } else {
    htmlData = "";
    textData = message;
  }

  const mailOptions = {
    from: senderName + " <" + sender_email + ">",
    to: receiver_email,
    subject: subject,
    cc: cc_email,
    bcc: bcc_email,
    text: textData,
    html: htmlData,
    // attachments: [
    //     {
    //         filename: 'text notes.txt',
    //         path: 'notes.txt
    //     },
    //  ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send(info.response);
    }
  });
});

// sending email multiple users at a time
route.post("/multiple", (req, res) => {
  const {
    sender_email,
    sender_password,
    cc_email,
    bcc_email,
    receiver_email,
    sender_name,
    subject,
    message,
  } = req.body;
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: sender_email,
      pass: sender_password,
    },
    secure: true,
  });

  let senderName;
  if (sender_name === undefined) {
    senderName = sender_email;
  } else {
    senderName = sender_name;
  }

  function wabodyfun(html) {
    var text1 = html.replace("*", "");
    var text2 = text1.replace(/<\/?[^>]+>/gi, "");
    return text2;
  }

  receiver_email.forEach((element) => {
    // console.log(element);
    const mailOptions = {
      from: senderName + " <" + sender_email + ">",
      to: receiver_email,
      subject: subject,
      cc: cc_email,
      bcc: bcc_email,
      text: textData,
      html: htmlData,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send(info.response);
      }
    });
  });
});

// cc and bcc
// route.post("/cc", (req, res) => {
//   const {
//     sender_email,
//     sender_password,
//     cc_email,
//     bcc_email,
//     receiver_email,
//     sender_name,
//     subject,
//     message,
//   } = req.body;
//   const transporter = nodemailer.createTransport({
//     port: 465,
//     host: "smtp.gmail.com",
//     auth: {
//       user: sender_email,
//       pass: sender_password,
//     },
//     secure: true,
//   });

//   let senderName;
//   if (sender_name === undefined) {
//     senderName = sender_email;
//   } else {
//     senderName = sender_name;
//   }

//   const mailOptions = {
//     from: senderName + " <" + sender_email + ">",
//     to: receiver_email,
//     subject: subject,
//     text: message,
//     html: message,
//     cc: cc_email,
//     bcc: bcc_email,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     } else {
//       console.log("Email sent: " + info.response);
//       res.send(info.response);
//     }
//   });
// });

module.exports = route;
