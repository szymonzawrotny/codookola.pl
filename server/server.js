import express from 'express';
import cors from 'cors';
import "dotenv/config";
import multer from 'multer';
import path from 'path';
import cron from 'node-cron'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { register, api, likes, addLike, save, addSave, send,
         addIcon,icons, askbot, getSavedEvents, views, addView, eventsToAccept, 
         eventsReported, addReport, getAlerts, addEvent, deleteEvent, checkNumber } from "./routes/routes.js";
         
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

let cronIteration = 0;

cron.schedule('00 01 * * *',()=>{
    if(cronIteration == 0){
        pool.query('update users set chat_number = 3',(err) => {
        if (err) {
          console.error("Błąd przy aktualizacji bazy danych:", err);
          return res.status(500).json({ message: "Błąd przy aktualizacji bazy danych" });
        }
        console.log("odnowiono")
    });

        cronIteration++;
    }
})

cron.schedule('02 00 * * *',()=>{
    cronIteration = 0;
})

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
app.get("/eventsToAccept",eventsToAccept);
app.get("/eventsReported",eventsReported);
app.post("/addreport", addReport)
app.post("/getalerts",getAlerts)
app.post("/addevent",addEvent);
app.post("/deleteevent",deleteEvent);
app.post("/checknumber",checkNumber)