import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import cron from 'node-cron';
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});
conn.connect();

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
    const {regEmail,regPassword} = req.body;

    const query = `insert into users values(NULL,"${regEmail}","${regPassword}","user")`;
    conn.query(query,(err,results)=>{
        if(err) console.log(err);
        res.status(200).json({ success: true, message: 'Zarejestrowano pomyślnie' });
    })
})

app.post("/log",(req,res)=>{
    const {logEmail,logPassword} = req.body;

    const query = `select * from users where email = "${logEmail}" AND password = "${logPassword}" limit 1`;

    
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