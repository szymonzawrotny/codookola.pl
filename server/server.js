import express from 'express';
import cors from 'cors';
import session from 'express-session';
import "dotenv/config";

import { register, api} from "./routes/routes.js";
import { handleDisconnect } from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    session({
        secret:process.env.TOKEN_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    })
)   //to do usunięcia?

handleDisconnect();

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Serwer nasłuchuje na porcie ${port}`);
})

app.get("/api", api)
app.post("/reg", register);