const db = require('../db');

exports.getStats = async (req, res) => {
    try {
        // 1. On récupère le compte par catégorie (le total sera calculé à partir de ça)
        const [rows] = await db.query('SELECT categorie, COUNT(*) as count FROM pieces GROUP BY categorie');

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
            if (!row.categorie) return; // Sécurité si une ligne n'a pas de catégorie

            const cat = row.categorie.toLowerCase();
            let count = parseInt(row.count);

            if (cat.includes('motor')) stats.motorisation = count;
            else if (cat.includes('transm')) stats.transmission = count;
            else if (cat.includes('frein')) stats.freinage = count;
            else if (cat.includes('suspens')) stats.suspension = count;
            else if (cat.includes('carros')) stats.carrosserie = count;
            else if (cat.includes('electro')) stats.electronique = count;

            // On calcule le total uniquement sur les catégories que l'on affiche
            // pour que les pourcentages fassent toujours 100% dans le donut
            stats.total += count;
        });

        res.status(200).json(stats);
    } catch (error) {
        console.error("Erreur Stats Dashboard:", error);
        res.status(500).json({ error: "Erreur serveur lors du calcul des statistiques" });
    }
};
