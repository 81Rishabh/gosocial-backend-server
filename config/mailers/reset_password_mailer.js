const nodemailer = require('../nodemailer');

// this is another way of exporting a method
exports.resetPassword = (user , resetLink) => {
    let htmlString = nodemailer.renderTemplete({resetLink : resetLink} , '/forgot_password/reset_password_link.ejs');

    nodemailer.transporter.sendMail({
        from: 'rishabhvishwa378@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: "Reset password", // Subject line
        // text: "Hello world?", // plain text body
        html:  htmlString // html body
    } , (err , info) => {
        if(err) {
            console.log("error in seding email " ,err);
            return;
        }
        console.log("Email sent");
        return;
    }); 
}