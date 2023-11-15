const express = require("express");
const app = express();
require("dotenv").config();
const mariadb = require("mariadb");
let cors = require("cors");
const session = require('express-session');
const bcrypt = require('bcrypt');
const pool = require('./db');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuration de la session
app.use(session({
    secret: 'votre_secret',
    resave: true,
    saveUninitialized: true
}));

// Middleware d'authentification de session
function authenticateSession(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        return res.status(401).json({ message: 'Accès non autorisé' });
    }
}

// Route pour l'inscription d'un utilisateur
app.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)`,
            [email, hashedPassword, firstName, lastName]
        );

        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
    }
});

// Route pour la connexion d'un utilisateur
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        if (!user) {
            return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
        }

        req.session.userId = user.id;

        res.json({ message: 'Utilisateur connecté avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur' });
    }
});

// Route pour la création d'un article de blog par un utilisateur connecté
app.post('/articles', authenticateSession, async (req, res) => {
    try {
        const { title, content, author_id } = req.body;

        const result = await pool.query(
            `INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)`,
            [title, content, author_id]
        );

        res.status(201).json({ message: 'Article créé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'article' });
    }
});

// Autres routes CRUD pour les articles...

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
