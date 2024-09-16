import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import cron from 'node-cron';
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

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
handleDisconnect();

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Serwer nasłuchuje na porcie ${port}`);
})

let user = {
    status: "Zaloguj aby zobaczyć więcej..."
}

app.get("/api",(req,res)=>{
    const query = "select * from events";
    conn.query(query,(err,results)=>{
        if(err) console.log(err)

        res.json(results);
    })
})

app.get("/userApi",(req,res)=>{
    res.json(user)
})

// app.get("/api2",(req,res)=>{
//     const query = `select * from events where autor = ${user.autor}`;
//     conn.query(query,(err,results)=>{
//         if(err) console.log(err)

//         res.json(results);
//     })
// })

app.post("/reg",(req,res)=>{
    const {email,pass} = req.body;

    const query = `insert into users values(NULL,"${email}","${pass}","user")`;
    conn.query(query,(err,results)=>{
        if(err) console.log(err);
        res.status(200).json({ success: true, message: 'Zarejestrowano pomyślnie' });
    })
})

app.post("/log",(req,res)=>{
    const {email,pass} = req.body;

    const query = `select * from users where email = "${email}" AND password = "${pass}" limit 1`;

    
    conn.query(query,(err,results)=>{
        if(err) console.log(err);

        if(results[0]){
            user = results[0];
            user.status = "Zalogowany pomyślnie";
            res.status(200).json({ success: true, message: 'Zalogowano pomyślnie' });
            
        } else {
            res.status(401).json({ success: false, message: 'błędny login' });
        }
    });
})