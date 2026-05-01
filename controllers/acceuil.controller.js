const db = require('../db');

/**
 * Récupère les pièces pour la vitrine client (Accueil)
 * Gère dynamiquement les URLs Cloudinary et les anciens fichiers locaux
 */
exports.getPiecesAcceuil = async (req, res) => {
  try {
    // 1. Requête SQL pour récupérer toutes les pièces
    const sql = `
      SELECT 
        id, marque, modele, description, prix, 
        etat, annee, quantite, categorie, fournisseur, 
        img_principale, img1, img2, img3, img4 
      FROM pieces 
      ORDER BY id DESC
    `;

    const [rows] = await db.query(sql);

    // 2. Transformation et sécurisation des URLs d'images
    const piecesFormatees = rows.map((piece) => {
      let finalUrl = piece.img_principale;

      // Logique de correction d'URL :
      // Si l'image existe mais n'est pas une URL complète (ne commence pas par http)
      if (finalUrl && !finalUrl.startsWith('http')) {
        /**
         * Si c'est un ancien nom de fichier (ex: 1775589152351-3008-1.jpg),
         * on pointe vers le dossier uploads de ton backend Render au lieu de Vercel.
         */
        finalUrl = `https://teranga-motors-backend.onrender.com/uploads/${finalUrl}`;
      }

      return {
        ...piece,
        // On assigne l'URL corrigée à img_url pour que le frontend Angular la reçoive correctement
        img_url: finalUrl || 'https://via.placeholder.com/400x300?text=Image+indisponible',
      };
    });

    // 3. Envoi de la réponse
    console.log(`✅ ${piecesFormatees.length} pièces (Cloudinary/Local) envoyées avec succès.`);
    res.status(200).json(piecesFormatees);

  } catch (error) {
    console.error('❌ Erreur SQL lors de la récupération (Accueil) :', error.message);
    res.status(500).json({
      message: 'Erreur serveur lors de la récupération des pièces.',
      error: error.message,
    });
  }
};
