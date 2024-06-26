const db = require('./database');

const initializeDatabase = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );`);
        db.run(`CREATE TABLE IF NOT EXISTS videos (
            video_id INTEGER PRIMARY KEY AUTOINCREMENT,
            path TEXT NOT NULL
        );`);
        db.run(`CREATE TABLE IF NOT EXISTS comments (
            comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
            video_id INTEGER,
            user_id INTEGER,
            comment TEXT NOT NULL,
            FOREIGN KEY (video_id) REFERENCES videos (video_id),
            FOREIGN KEY (user_id) REFERENCES users (user_id)
        );`);
    });
};

initializeDatabase();
