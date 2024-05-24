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

const getVideoUrls = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT path FROM videos';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err.message);
            } else {
                // Map over the array and extract the 'path' property
                const paths = rows.map(row => row.path);
                resolve(paths);
            }
        });
    });
}
// Define API endpoint
app.get('/api/user/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
});
app.get('/api/videos', async (req, res) => {
    try {
        const videos = await getVideoUrls(req.params.id);
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error });
    }
});
app.get('/api/comments/:videoId', async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const comments = await getCommentsByVideoId(videoId);
        res.json({ comments });
    } catch (error) {
        res.status(500).json({ error });
    }
});

const getCommentsByVideoId = (videoId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT comments.comment, users.username FROM comments INNER JOIN users ON comments.user_id = users.user_id WHERE comments.video_id = ?';
        db.all(sql, [videoId], (err, rows) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(rows);
            }
        });
    });
};
app.post('/api/comment', (req, res) => {
    const { videoId, userId, comment } = req.body;
    db.run('INSERT INTO comments (video_id, user_id, comment) VALUES (?, ?, ?)', [videoId, userId, comment], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
