const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 1. Initialisation de l'application
const app = express();

// 2. Importation de la connexion DB (Depuis le backend Gestion)
const db = require('./db');

// 3. Importation de TOUTES les routes (Client + Gestion)
const acceuilRoutes = require('./routes/acceuil');
const compteRoutes = require('./routes/compte');
const connexionRoutes = require('./routes/connexion');
const modelesRoutes = require('./routes/modeles');
const demandeRoutes = require('./routes/demande');

const PiecesRoutes = require('./routes/ajoutpieces');
const StockRoutes = require('./routes/stock');
const DashboardRoutes = require('./routes/dashboard');

// --- MIDDLEWARES ---
app.use(cors()); // Autorise vos deux Angular (Client et Gestion)
// Remplace la ligne 25 par ceci :
app.use(cors({
  origin: ['https://teranga-motors.vercel.app', 'http://localhost:4200'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/**
 * CONFIGURATION UNIQUE DU DOSSIER UPLOADS
 * On utilise le dossier 'uploads' situé dans le dossier de ce serveur.
 * Toutes les images de 'SmartTech Central' doivent être ici.
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES API ---

// Routes Partie Client
app.use('/api/acceuil', acceuilRoutes);
app.use('/api/compte',  compteRoutes);
app.use('/api/connexion',  connexionRoutes);
app.use('/api/modeles',  modelesRoutes);
app.use('/api/demande', demandeRoutes);

// Routes Partie Gestion (Admin)
app.use('/api/pieces', PiecesRoutes);
app.use('/api/stock', StockRoutes);
app.use('/api/dashboard', DashboardRoutes);

// Route de base
app.get('/', (req, res) => {
    res.send('🚀 API Teranga Motors (SmartTech Central) Unifiée et en ligne !');
});

// --- LANCEMENT DU SERVEUR ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('=======================================================');
    console.log(`✅ SERVEUR UNIFIÉ TERANGA MOTORS ACTIF`);
    console.log(`🔗 URL API : http://localhost:${PORT}/api`);
    console.log(`🖼️  DOSSIER IMAGES : http://localhost:${PORT}/uploads`);
    console.log('=======================================================');
});
