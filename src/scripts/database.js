const sqlite3 = require('sqlite3').verbose();

// Asegúrate de que el path a la base de datos sea correcto.
const db = new sqlite3.Database('./src/database/database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
