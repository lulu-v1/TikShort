// Function to insert a new user
const db = require('./database');

const addUser = (username, email) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
        db.run(sql, [username, email], function(err) {
            if (err) {
                reject(err.message);
            } else {
                resolve(this.lastID); // Devuelve el ID del usuario recién insertado
            }
        });
    });
};

// Function to add a new video
const addVideo = (userId, title, description) => {
    const query = `INSERT INTO videos (user_id, title, description) VALUES (?, ?, ?);`;
    db.run(query, [userId, title, description], function(err) {
        if (err) {
            console.error('Error adding video:', err.message);
        } else {
            console.log(`A new video has been added with ID ${this.lastID}`);
        }
    });
};

// Function to post a comment
const addComment = (videoId, userId, comment) => {
    const query = `INSERT INTO comments (video_id, user_id, comment) VALUES (?, ?, ?);`;
    db.run(query, [videoId, userId, comment], function(err) {
        if (err) {
            console.error('Error adding comment:', err.message);
        } else {
            console.log(`A new comment has been added with ID ${this.lastID}`);
        }
    });
};
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
module.exports = { addUser, getUserById };