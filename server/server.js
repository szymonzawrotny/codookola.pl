import express from 'express';
import cors from 'cors';
import "dotenv/config";

import { register, login, api } from "./routes/routes.js";
import { handleDisconnect } from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());

handleDisconnect();

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Serwer nasłuchuje na porcie ${port}`);
})

app.get("/api", api)
app.post("/reg", register);
app.post("/log", login)