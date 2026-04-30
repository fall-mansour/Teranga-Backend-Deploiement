const express = require('express');
const router = express.Router();
const acceuilCtrl = require('../controllers/acceuil.controller');

// GET http://localhost:3000/api/acceuil
router.get('/', acceuilCtrl.getPiecesAcceuil);

module.exports = router;
