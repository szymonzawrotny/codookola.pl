import mysql from 'mysql';

let conn;

const handleDisconnect = ()=>{
    conn = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    conn.connect((err) => {
        if (err) {
            console.log('Błąd przy próbie połączenia, ponawiam za 2 sekundy...', err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('Połączono ponownie z bazą danych');
        }
    });

    conn.on('error', (err) => {
        console.log('Błąd połączenia z bazą danych:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            console.log('Utracono połączenie, próbuję połączyć się ponownie...');
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
export { conn, handleDisconnect }