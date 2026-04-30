const db = require('../db');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("🔑 Tentative de connexion pour :", email);

    try {
        // 1. On cherche dans la table 'users' (vérifie bien le nom dans ta BD)
        const [users] = await db.execute('SELECT * FROM users WHERE mail = ?', [email]);

        if (users.length === 0) {
            console.log("❌ Utilisateur non trouvé dans la base.");
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        const user = users[0];
        console.log("👤 Utilisateur trouvé, vérification du mot de passe...");

        // 2. Comparaison Bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("❌ Mot de passe incorrect.");
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // 3. Succès
        console.log("✅ Connexion réussie pour", user.prenom);

        const userData = {
            id: user.id,
            prenom: user.prenom,
            nom: user.nom,
            mail: user.mail,
            vehicule: user.marque_vehicule ? `${user.marque_vehicule} ${user.modele_vehicule}` : 'Non spécifié'
        };

        return res.status(200).json({
            message: "Connexion réussie !",
            user: userData
        });

    } catch (error) {
        console.error("🔥 Erreur Login :", error);
        return res.status(500).json({ message: "Erreur technique sur le serveur." });
    }
};
