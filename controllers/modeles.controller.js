// controllers/modeles.controller.js
const db = require('../db');

exports.getAllModeles = async (req, res) => {
    try {
        // On récupère tout, classé par marque puis par modèle
        const [rows] = await db.execute('SELECT * FROM modeles ORDER BY rappel_marque, modele');
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
