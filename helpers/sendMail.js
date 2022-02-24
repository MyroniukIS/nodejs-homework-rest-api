const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (data) => {
        const mail = { ...data, from: "v.l.a.d.a.p.e.l.g.a.n.z@gmail.com" }
        await sgMail.send(mail)
        return true;
};


module.exports = sendMail
