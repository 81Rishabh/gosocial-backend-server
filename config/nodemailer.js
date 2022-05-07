const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
    
   
    let mailOptions = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
           user : 'rishabhvishwa378@gmail.com',
           pass : '1rishu2@'
        },
       
    }
    //  setup mailer
    let transporter = nodemailer.createTransport(mailOptions);


    // render html templete 
   let  renderTemplete = (data , realtivePath) => {
      let mailHtml;

      ejs.renderFile(
          path.join(__dirname, '../views/mailers' , realtivePath),
          data,
          function (err, templete) {
             if(err) {
                 console.log('error in rendring templete' , err);
                 return;
             }
                mailHtml = templete;
          }
      );
      return mailHtml;
  }


  module.exports = {
      transporter,
      renderTemplete
  }