const express = require("express");
const app = express();
const mariadb = require('mariadb');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DTB,
});

// Endpoint pour récupérer les données de la table "Articles"
app.get("/api/articles", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM articles");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});

// Endpoint pour récupérer les données de la table "users"
app.get("/api/users", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM users");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});
app.post("/api/users", async (req, res) => {
    let conn;
    try {
        console.log(req.body);
        conn = await pool.getConnection();

        // Check if email already exists
        const rows = await conn.query("SELECT * FROM users WHERE email = ?", [req.body.email]);
        if (rows.length > 0) { // If email exists, return error
            return res.status(400).json({ message: 'Email already used' });

        }

        // If email doesn't exist, insert new user
        const result = await conn.query("INSERT INTO users (email,password,firstName,lastName) values (?,?,?,?) ",[req.body.email,req.body.password,req.body.firstName,req.body.lastName]);
        res.status(200).json({ message: 'Successfully registered', result: result });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    } finally {
        if (conn) conn.release();
    }
});
app.delete("/api/users/:id", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM users WHERE id = ?", [req.params.id]);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});
app.listen(3002, () => {
    console.log("Server is running on port 3002");
});