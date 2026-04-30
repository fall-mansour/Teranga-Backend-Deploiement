const nodemailer = require('nodemailer');

exports.envoyerDemande = async (req, res) => {
    // Récupération des données envoyées par le TS
    const { nom, email, telephone, marque, modele, annee, description } = req.body;

    // 1. Configuration du transporteur Gmail
    // IMPORTANT : Le "pass" doit être un code de 16 caractères (Mot de passe d'application Google)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mansourbabydriver221@gmail.com',
            pass: 'lyam zgrs epbz okei'
        }
    });

    // 2. Construction de l'e-mail
    const mailOptions = {
        from: `"${nom}" <${email}>`, // Nom de l'expéditeur affiché
        to: 'mansourbabydriver221@gmail.com', // Destinataire (toi)
        replyTo: email, // Si tu cliques sur "Répondre", ça ira vers le mail du client
        subject: `🛠️ Nouvelle Demande : ${marque.toUpperCase()} - ${modele}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
                <h2 style="color: #2faad3; border-bottom: 2px solid #2faad3; padding-bottom: 10px;">
                    Tranga Motors ⚙️ : Demande de pièce
                </h2>
                <p><strong>Client :</strong> ${nom}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Téléphone :</strong> ${telephone}</p>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <h3 style="color: #2c3e50;">Détails du véhicule</h3>
                <p><strong>Véhicule :</strong> ${marque} ${modele} (${annee})</p>
                <h3 style="color: #2c3e50;">Description du besoin</h3>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 5px solid #d32f2f;">
                    ${description}
                </div>
                <p style="font-size: 12px; color: #777; margin-top: 20px;">
                    Cet e-mail a été généré automatiquement par le système  Teranga Motors.
                </p>
            </div>
        `
    };

    // 3. Envoi réel
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Mail de demande envoyé pour ${nom}`);
        res.status(200).json({ message: "Demande envoyée avec succès" });
    } catch (error) {
        console.error("❌ Erreur Nodemailer :", error);
        res.status(500).json({ error: "Impossible d'envoyer l'e-mail" });
    }
};
