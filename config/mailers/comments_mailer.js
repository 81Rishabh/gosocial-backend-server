const nodemailer = require('../nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplete({comment : comment} , '/comments/new_comments.ejs')

    nodemailer.transporter.sendMail({
        from: 'rishabhvishwa378@gmail.com', // sender address
        to: comment.user.email, // list of receivers
        subject: "new Comment published", // Subject line
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