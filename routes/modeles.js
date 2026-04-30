const express = require('express');
const router = express.Router();
const db = require('../db'); // Import de ta connexion DB

// Route pour récupérer tous les modèles et marques
router.get('/all', async (req, res) => {
    try {
        // On récupère id, modele, et rappel_marque
        const [rows] = await db.execute('SELECT id, modele, rappel_marque FROM modeles ORDER BY rappel_marque ASC');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erreur SQL :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des modèles" });
    }
});

module.exports = router;
