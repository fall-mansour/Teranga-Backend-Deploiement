const express = require('express');
const router = express.Router();
const stockCtrl = require('../controllers/stock.controller');

// Route pour récupérer toutes les pièces (GET http://localhost:3000/api/stock)
router.get('/', stockCtrl.getAllPieces);

// Route pour supprimer une pièce (DELETE http://localhost:3000/api/stock/:id)
router.delete('/:id', stockCtrl.deletePiece);

module.exports = router;
