// On importe uniquement la connexion à la base de données (db.js)
const db = require('../db');

// 1. Récupérer toutes les pièces (pour l'affichage du stock)
exports.getAllPieces = async (req, res) => {
    try {
        // Requête SQL pour récupérer toutes les lignes de la table 'pieces'
        const [rows] = await db.query('SELECT * FROM pieces ORDER BY id DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erreur GET stock:", error);
        res.status(500).json({ message: "Erreur lors de la récupération du stock", error: error.message });
    }
};

// 2. Supprimer une pièce par son ID
exports.deletePiece = async (req, res) => {
    try {
        const id = req.params.id;

        // Requête SQL de suppression
        const [result] = await db.query('DELETE FROM pieces WHERE id = ?', [id]);

        // Si aucune ligne n'a été modifiée, c'est que l'ID n'existait pas
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pièce non trouvée dans la base de données" });
        }

        res.status(200).json({ message: "La pièce a été supprimée avec succès !" });
    } catch (error) {
        console.error("Erreur DELETE pièce:", error);
        res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
};
