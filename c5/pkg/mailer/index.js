const mailgun = require("mailgun-js");
const conf = require('../config');

const mg = mailgun({ 
    apiKey: conf.get('mailer').key, 
    domain: conf.get('mailer').domain 
});

const loginNotification = (user_name, user_email) => {
    return new Promise((success, fail) => {
        const message = {
            from: "Mailgun Sandbox <postmaster@sandbox4bfc4c3027df468c8c1e1d83da34fd70.mailgun.org>",
            to: user_email,
            subject: "New login on our system",
            text: `User ${user_name} with email ${user_email} just logged in.`
        };
        mg.messages().send(message, (err, body) => {
            if(err) {
                console.log(err);
                return fail(err);
            }
            console.log(body);
            return success(body);
        });
    });
};

module.exports = {
    loginNotification
};