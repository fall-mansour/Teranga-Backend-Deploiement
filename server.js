const express = require('express');
const cors = require('cors');
const path = require('path'); // Indispensable pour gérer les chemins
require('dotenv').config();

const app = express();
const db = require('./db');

// Importation des routes
const acceuilRoutes = require('./routes/acceuil');
const compteRoutes = require('./routes/compte');
const connexionRoutes = require('./routes/connexion');
const modelesRoutes = require('./routes/modeles');
const demandeRoutes = require('./routes/demande');
const PiecesRoutes = require('./routes/ajoutpieces');
const StockRoutes = require('./routes/stock');
const DashboardRoutes = require('./routes/dashboard');

// Middlewares
app.use(cors());
app.use(express.json());

/**
 * ✅ CORRECTION : EXPOSITION DU DOSSIER UPLOADS
 * Cette ligne permet à Render de servir tes images stockées localement.
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES API ---
app.use('/api/acceuil', acceuilRoutes);
app.use('/api/compte',  compteRoutes);
app.use('/api/connexion',  connexionRoutes);
app.use('/api/modeles',  modelesRoutes);
app.use('/api/demande', demandeRoutes);
app.use('/api/pieces', PiecesRoutes);
app.use('/api/stock', StockRoutes);
app.use('/api/dashboard', DashboardRoutes);

app.get('/', (req, res) => {
    res.send('🚀 API Teranga Motors (SmartTech Central) Unifiée et en ligne !');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('=======================================================');
    console.log(`✅ SERVEUR UNIFIÉ TERANGA MOTORS ACTIF`);
    console.log(`🔗 URL API : http://localhost:${PORT}/api`);
    // On log l'URL Cloudinary/Render pour le debug
    console.log(`🖼️  DOSSIER IMAGES ACTIF SUR /uploads`);
    console.log('=======================================================');
});
