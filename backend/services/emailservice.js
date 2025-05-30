const transporter = require("../config/emailconfig");
const { welcomeTemplate } = require("../templates/welcomeEmail");



exports.sendWelcomeEmail = async (firstName, lastName, email) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Bienvenue sur notre plateforme !",
            html: welcomeTemplate(firstName, lastName, email)
        });

        console.log("Email envoyé avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
    }
};

exports.sendVerificationEmail = async (email, name, url) => {
    const html = `
        <h3>Bonjour ${name},</h3>
        <p>Merci de vous être inscrit ! Veuillez cliquer sur le lien suivant pour vérifier votre adresse email :</p>
        <a href="${url}">${url}</a>
        <p>Ce lien expire dans 24h.</p>
    `;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Vérifiez votre adresse email",
        html
    });
};