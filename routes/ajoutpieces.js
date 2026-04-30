const express = require('express');
const router = express.Router();
// On importe la config Cloudinary qui gère déjà le stockage distant
const { upload } = require('../cloudinaryConfig');
const pieceController = require('../controllers/ajoutpieces.controller');

/**
 * Configuration des champs d'images
 * Le middleware 'upload' (configuré avec CloudinaryStorage)
 * va automatiquement envoyer les fichiers vers Cloudinary
 * avant d'arriver au contrôleur.
 */
const uploadFields = upload.fields([
  { name: 'img_principale', maxCount: 1 }, // Obligatoire
  { name: 'img1', maxCount: 1 }, // Obligatoire
  { name: 'img2', maxCount: 1 }, // Obligatoire
  { name: 'img3', maxCount: 1 }, // Facultatif
  { name: 'img4', maxCount: 1 }, // Facultatif
]);

// Route POST pour l'ajout
// Note : Les erreurs d'upload (format de fichier, etc.) seront interceptées ici
router.post('/ajouter', uploadFields, pieceController.ajouterPiece);

module.exports = router;
