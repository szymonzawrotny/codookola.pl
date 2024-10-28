import express from 'express';
import cors from 'cors';
import session from 'express-session';
import "dotenv/config";

import { register, api, likes, addLike, save, addSave} from "./routes/routes.js";
import { handleDisconnect } from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());  //to do usunięcia?

handleDisconnect();

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Serwer nasłuchuje na porcie ${port}`);
})

app.get("/api", api)
app.post("/reg", register);
app.get("/likes", likes);
app.post("/addlike",addLike);
app.get("/save",save)
app.post("/addSave",addSave);