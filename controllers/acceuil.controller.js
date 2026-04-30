const db = require('../db');

/**
 * Récupère les pièces pour la vitrine client (Accueil)
 * Les URLs d'images proviennent désormais de Cloudinary
 */
exports.getPiecesAcceuil = async (req, res) => {
  try {
    // 1. Requête SQL
    // On récupère toutes les colonnes, les URLs Cloudinary sont stockées directement en base
    const sql = `
            SELECT
                id,
                marque,
                modele,
                description,
                prix,
                etat,
                annee,
                quantite,
                categorie,
                fournisseur,
                img_principale,
                img1,
                img2,
                img3,
                img4
            FROM pieces
            ORDER BY id DESC
        `;

    const [rows] = await db.query(sql);

    // 2. Transformation simplifiée
    const piecesFormatees = rows.map((piece) => {
      return {
        ...piece,
        // On utilise directement l'URL stockée.
        // Si img_principale est vide, on met un placeholder générique.
        img_url: piece.img_principale
          ? piece.img_principale
          : 'https://via.placeholder.com/400x300?text=Image+indisponible',
      };
    });

    // 3. Envoi de la réponse
    console.log(`✅ ${piecesFormatees.length} pièces (Cloudinary) envoyées avec succès.`);
    res.status(200).json(piecesFormatees);
  } catch (error) {
    console.error('❌ Erreur SQL lors de la récupération (Accueil) :', error.message);
    res.status(500).json({
      message: 'Erreur serveur lors de la récupération des pièces.',
      error: error.message,
    });
  }
};
