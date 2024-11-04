import express from 'express';
import cors from 'cors';
import "dotenv/config";

import { fetchEvents, response } from './webScrapping.js';

import { register, api, likes, addLike, save, addSave } from "./routes/routes.js";
import { pool } from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});

app.get("/api", api);
app.post("/reg", register);
app.get("/likes", likes);
app.post("/addlike", addLike);
app.get("/save", save);
app.post("/addSave", addSave);

// fetchEvents();

// app.get("/api2",(req,res)=>{
//     res.json({
//         events: response
//     })
// })
