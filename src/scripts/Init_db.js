const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Directorio de la base de datos
const dbDir = path.resolve(__dirname, '../database');

// Crear el directorio si no existe
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Ruta de la base de datos
const dbPath = path.join(dbDir, 'database.db');

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        createTables();
    }
});

// Función para crear las tablas necesarias
const createTables = () => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
     username TEXT UNIQUE NOT NULL,
     email TEXT UNIQUE NOT NULL,
     lastname TEXT NOT NULL,
     password TEXT NOT NULL,
      dark_mode INTEGER DEFAULT 0,
      autoplay INTEGER DEFAULT 0,
    profile_pic TEXT
            )`, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS videos (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       url TEXT NOT NULL,
       description TEXT
            )`, (err) => {
        if (err) {
            console.error('Error creating videos table:', err.message);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS comments (
       comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
       video_id INTEGER,
       user_id INTEGER,
       text TEXT,
       timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (video_id) REFERENCES videos(id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        )`, (err) => {
        if (err) {
            console.error('Error creating comments table:', err.message);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS feedback (
        feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
        video_id INTEGER,
        user_id INTEGER,
        type TEXT CHECK(type IN ('like', 'dislike')),
        FOREIGN KEY (video_id) REFERENCES videos(id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        )`, (err) => {
        if (err) {
            console.error('Error creating feedback table:', err.message);
        }
    });

    console.log('All tables created successfully.');
};

// Cerrar la conexión a la base de datos cuando se detenga el proceso
process.on('exit', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        }
        console.log('Closed the database connection.');
    });
});
