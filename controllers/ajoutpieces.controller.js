const db = require('../db');

exports.ajouterPiece = async (req, res) => {
  console.log("--- Tentative d'ajout de pièce via Cloudinary ---");

  // 1. Vérification des champs textuels obligatoires
  const { description, marque, categorie, modele, annee, fournisseur, prix, etat, quantite } =
    req.body;

  if (!description || !marque || !categorie || !modele || !annee || !prix || !quantite) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
  }

  // 2. Vérification des images obligatoires (req.files contient les infos Cloudinary)
  if (!req.files || !req.files['img_principale'] || !req.files['img1'] || !req.files['img2']) {
    console.error('❌ Erreur : Images obligatoires manquantes.');
    return res
      .status(400)
      .json({ message: "L'image principale ainsi que les images 1 et 2 sont obligatoires." });
  }

  try {
    /**
     * Avec multer-storage-cloudinary, req.files[champ][0].path
     * contient directement l'URL sécurisée (https://res.cloudinary.com/...)
     */
    const img_principale = req.files['img_principale'][0].path;
    const img1 = req.files['img1'][0].path;
    const img2 = req.files['img2'][0].path;

    // Images optionnelles : on vérifie si elles existent avant de prendre le .path
    const img3 = req.files['img3'] ? req.files['img3'][0].path : null;
    const img4 = req.files['img4'] ? req.files['img4'][0].path : null;

    const sql = `INSERT INTO pieces
            (description, marque, categorie, modele, annee, fournisseur, prix, etat, quantite, img_principale, img1, img2, img3, img4)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      description,
      marque,
      categorie,
      modele,
      annee,
      fournisseur,
      prix,
      etat,
      quantite,
      img_principale,
      img1,
      img2,
      img3,
      img4,
    ];

    const [result] = await db.query(sql, values);

    console.log(`✅ Succès : Pièce enregistrée avec URLs Cloudinary. ID: ${result.insertId}`);
    res.status(201).json({
      message: 'Pièce ajoutée avec succès !',
      id: result.insertId,
      url_principale: img_principale,
    });
  } catch (error) {
    console.error("❌ ERREUR lors de l'insertion Cloudinary/SQL :", error);
    res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
  }
};
