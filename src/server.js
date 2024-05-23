const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3001;

// Connect to SQLite database
const db = require ('./scripts/database');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Define API endpoints
const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE user_id = ?';
        db.get(sql, [userId], (err, row) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(row);
            }
        });
    });
};

// Define API endpoint
app.get('/api/user/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// app.post('/api/data', (req, res) => {
//     const { name, value } = req.body;
//     db.run('INSERT INTO mytable (name, value) VALUES (?, ?)', [name, value], function (err) {
//         if (err) {
//             res.status(500).json({ error: err.message });
//         } else {
//             res.json({ id: this.lastID });
//         }
//     });
// });

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
