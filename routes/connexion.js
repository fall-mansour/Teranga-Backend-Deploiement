const express = require('express');
const router = express.Router();
const connexionCtrl = require('../controllers/connexion.controller');

// La route correspond à ton apiUrl : http://localhost:3000/api/login
router.post('/', connexionCtrl.login);

module.exports = router;
