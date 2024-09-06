import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import cron from 'node-cron';
import "dotenv/config";

const app = express();

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Serwer nasłuchuje na porcie ${port}`);
})

app.get("/",(req,res)=>{
    res.send("siema");
})