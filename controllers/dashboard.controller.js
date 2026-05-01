const db = require('../db');

exports.getStats = async (req, res) => {
    try {
        // 1. Récupération des données groupées par catégorie depuis Aiven
        const [rows] = await db.query('SELECT TRIM(categorie) as categorie, COUNT(*) as count FROM pieces GROUP BY categorie');
        
        console.log("Données reçues de MySQL:", rows);

        const stats = {
            total: 0,
            motorisation: 0,
            transmission: 0,
            freinage: 0,
            suspension: 0,
            carrosserie: 0,
            electronique: 0
        };

        rows.forEach(row => {
            if (!row.categorie) return;

            const cat = row.categorie
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            
            const count = parseInt(row.count);

            // ✅ SOLUTION : On ajoute 'moteur' et on simplifie les racines
            if (cat.includes('motor') || cat.includes('moteur')) {
                stats.motorisation += count;
            } else if (cat.includes('trans')) {
                stats.transmission += count;
            } else if (cat.includes('frein')) {
                stats.freinage += count;
            } else if (cat.includes('susp')) {
                stats.suspension += count;
            } else if (cat.includes('carr')) {
                stats.carrosserie += count;
            } else if (cat.includes('elec')) {
                stats.electronique += count;
            }

            // Calcul du total global
            stats.total += count;
        });

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
