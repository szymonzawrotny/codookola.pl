import express from 'express';
import cors from 'cors';
import "dotenv/config";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { register, api, likes, addLike, save, addSave, send,
         addIcon,icons, askbot, getSavedEvents, views, addView } from "./routes/routes.js";
import { pool } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // folder, w którym zapisujesz pliki
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

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
app.post("/send",send);
app.get("/icons",icons)
app.post('/addIcon', upload.single('file'), addIcon);
app.post("/askbot",askbot);
app.post("/getsavedevents",getSavedEvents);
app.post("/views",views)
app.post("/addView",addView)