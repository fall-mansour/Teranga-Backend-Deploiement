const db = require('../db');

exports.getStats = async (req, res) => {
    try {
        // 1. Récupération des données groupées par catégorie depuis Aiven
        // On utilise TRIM() en SQL pour enlever les espaces parasites dès la source
        const [rows] = await db.query('SELECT TRIM(categorie) as categorie, COUNT(*) as count FROM pieces GROUP BY categorie');
        
        // Log pour vérifier ce que la base de données renvoie réellement
        console.log("Données reçues de MySQL:", rows);

        // 2. Initialisation de l'objet de statistiques
        const stats = {
            total: 0,
            motorisation: 0,
            transmission: 0,
            freinage: 0,
            suspension: 0,
            carrosserie: 0,
            electronique: 0
        };

        // 3. Répartition des comptes
        rows.forEach(row => {
            if (!row.categorie) return;

            // Nettoyage de la chaîne : minuscule et suppression des accents courants
            // On utilise normalize("NFD") pour transformer "Électronique" en "Electronique"
            const cat = row.categorie
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            
            const count = parseInt(row.count);

            // Mapping flexible pour correspondre aux catégories de l'interface
            if (cat.includes('motor')) {
                stats.motorisation += count;
            } else if (cat.includes('transm')) {
                stats.transmission += count;
            } else if (cat.includes('frein')) {
                stats.freinage += count;
            } else if (cat.includes('suspens')) {
                stats.suspension += count;
            } else if (cat.includes('carros')) {
                stats.carrosserie += count;
            } else if (cat.includes('electr')) {
                stats.electronique += count;
            }

            // Le total est calculé dynamiquement sur l'ensemble des pièces trouvées
            stats.total += count;
        });

        // Log final pour vérifier l'objet envoyé au frontend
        console.log("Stats finales envoyées au Dashboard:", stats);

        res.status(200).json(stats);
    } catch (error) {
        console.error("Erreur Stats Dashboard:", error);
        res.status(500).json({ 
            error: "Erreur serveur lors du calcul des statistiques",
            details: error.message 
        });
    }
};
