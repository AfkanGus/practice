// testing sending email for: https://github.com/ideaq/time/issues/85
var nodemailer = require('nodemailer');
var fs         = require('fs');
var template   = fs.readFileSync('./email_html_template.html', 'utf8')
var textonly   = fs.readFileSync('./email_text_template.txt', 'utf8')
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'welcome.to.dwyl@gmail.com',
        pass: process.env.GMAIL_PASSWORD
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '#dwyl do what you love! <welcome.to.dwyl@gmail.com>', // sender address
    to: 'dwyl.smith@gmail.com', // list of receivers
    subject: 'Welcome to dwyl!', // Subject line
    text: textonly, // plaintext body
    html: template
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});