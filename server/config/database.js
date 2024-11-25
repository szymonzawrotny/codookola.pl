import mysql from 'mysql2';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

pool.on('connection', () => {
    console.log('Nawiązano nowe połączenie z bazą danych');
});

pool.on('error', (err) => {
    console.log('Błąd połączenia z bazą danych:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
        console.log('Utracono połączenie, próbuję połączyć się ponownie...');
    } else {
        throw err;
    }
});

export { pool };
