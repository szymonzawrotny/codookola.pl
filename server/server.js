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
         eventsReported, addReport, getAlerts, addEvent, deleteEvent, checkNumber,
         rankingList, stats, getComments, addComment } from "./routes/routes.js";
         
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

cron.schedule('01 00 * * *',async ()=>{
    if(cronIteration == 0){
      pool.query('update users set chat_number = 3',(err) => {
        if (err) {
          console.error("Błąd przy aktualizacji bazy danych:", err);
          return res.status(500).json({ message: "Błąd przy aktualizacji bazy danych" });
        }
      });

      const [events] = await pool.promise().query(`SELECT * FROM events WHERE data < NOW()`);
      console.log(`Znaleziono ${events.length} wydarzeń do przeniesienia`);

      // Przenoszenie wydarzeń do tabeli events_completed
      for (const event of events) {
        try {
          await pool.promise().query(
            `INSERT INTO events_completed (nazwa, adres, miasto, kod_pocztowy, lat, lng, opis, rodzaj, data, author_id, author_email, photo_path, photo_path2, photo_path3) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [
              event.nazwa, event.adres, event.miasto, event.kod_pocztowy, event.lat, event.lng, 
              event.opis, event.rodzaj, event.data, event.author_id, event.author_email, 
              event.photo_path, event.photo_path2, event.photo_path3
            ]
          );
          console.log(`Przeniesiono wydarzenie: ${event.nazwa}`);
        } catch (err) {
          console.error(`Błąd podczas przenoszenia wydarzenia ${event.nazwa}:`, err);
        }
      }

      // Usuwanie starych wydarzeń
      await pool.promise().query('DELETE FROM events WHERE data < NOW()');
      console.log('Usunięto stare wydarzenia');

      cronIteration++;
    }
})

cron.schedule('02 00 * * *',()=>{
  cronIteration = 0;
})

app.get("/api", api)
app.post("/reg", register)
app.get("/likes", likes)
app.post("/addlike", addLike)
app.get("/save", save)
app.post("/addSave", addSave)
app.post("/send",send)
app.get("/icons",icons)
app.post('/addIcon', upload.single('file'), addIcon)
app.post("/askbot",askbot);
app.post("/getsavedevents",getSavedEvents)
app.post("/views",views)
app.post("/addView",addView)
app.get("/eventsToAccept",eventsToAccept)
app.get("/eventsReported",eventsReported)
app.post("/addreport", addReport)
app.post("/getalerts",getAlerts)
app.post("/addevent",addEvent)
app.post("/deleteevent",deleteEvent)
app.post("/checknumber",checkNumber)
app.get("/rankingList",rankingList)
app.post("/stats",stats)
app.post("/addcomment",addComment)
app.post("/getcomments",getComments);