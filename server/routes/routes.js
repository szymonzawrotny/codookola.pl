import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'
import "dotenv/config";
import { pool } from '../config/database.js';
import {getResponse} from "../getChatbotAnswer.js"

const register = async (req, res) => {
    const { email, pass, captchaToken } = req.body;

    if (!captchaToken) {
        return res.status(400).json({ message: 'Brak tokenu CAPTCHA' });
    }

    const secretKey = process.env.CAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

    try {
        const response = await fetch(verifyUrl, {
            method: 'POST',
        });
        const data = await response.json();

        if (data.success) {
            const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
            pool.query(checkEmailQuery, [email], (err, results) => {
                if (err) {
                    console.error("Błąd podczas sprawdzania e-mail w bazie danych:", err);
                    return res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
                }

                if (results.length > 0) {
                    return res.status(500).json({ message: 'Już jest taki email' });
                }

                bcrypt.hash(pass, 10, (err, hashedPassword) => {
                    if (err) {
                        console.log("Błąd hashowania hasła: ", err);
                        return res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
                    }

                    const query = `INSERT INTO users (email, password, role) VALUES (?, ?, 'user')`;
                    pool.query(query, [email, hashedPassword], (err, results) => {
                        if (err) {
                            console.error("Błąd podczas zapisu do bazy danych:", err);
                            return res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
                        }
                        res.status(200).json({ success: true, message: 'Zarejestrowano pomyślnie' });
                    });
                });
            });
        } else {
            res.status(400).json({ message: 'Nieprawidłowa CAPTCHA' });
        }
    } catch (error) {
        console.error('Błąd weryfikacji CAPTCHA:', error);
        res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
    }
};

const api = (req, res) => {
    const query = "SELECT * FROM events";
    pool.query(query, (err, results) => {
        if (err) {
            console.error("Błąd zapytania:", err);
            return res.status(500).json({ message: 'Błąd serwera' });
        }
        res.json(results);
    });
};

const likes = (req, res) => {
    const query = `SELECT * FROM likes`;
    pool.query(query, (err, result) => {
        if (err) {
            console.error("Błąd zapytania:", err);
            return res.status(500).json({ message: 'Błąd serwera' });
        }
        res.json(result);
    });
};

const addLike = async (req, res) => {
    const { userId, eventId } = req.body;

    const query = `SELECT * FROM likes WHERE event_id = ? AND user_id = ?`;
    pool.query(query, [eventId, userId], (err, result) => {
        if (err) {
            console.error("Błąd zapytania:", err);
            return res.status(500).json({ message: "coś się zepsuło" });
        }

        if (result[0]) {
            pool.query(`DELETE FROM likes WHERE event_id = ? AND user_id = ?`, [eventId, userId], (err) => {
                if (err) {
                    console.error("Błąd usuwania polubienia:", err);
                    return res.status(500).json({ message: "Błąd serwera" });
                }
                res.status(200).json({ message: "usunięto polubienie" });
            });
        } else {
            pool.query(`INSERT INTO likes VALUES (NULL, ?, ?, 1, ?)`, [eventId, userId, new Date()], (err) => {
                if (err) {
                    console.error("Błąd dodawania polubienia:", err);
                    return res.status(500).json({ message: "Błąd serwera" });
                }
                res.status(200).json({ message: "dodano polubienie" });
            });
        }
    });
};

const save = async (req, res) => {
    const query = `SELECT * FROM save`;
    pool.query(query, (err, result) => {
        if (err) {
            console.error("Błąd zapytania:", err);
            return res.status(500).json({ message: 'Błąd serwera' });
        }
        res.json(result);
    });
};

const addSave = async (req, res) => {
    const { userId, eventId } = req.body;

    const query = `SELECT * FROM save WHERE event_id = ? AND user_id = ?`;
    pool.query(query, [eventId, userId], (err, result) => {
        if (err) {
            console.error("Błąd zapytania:", err);
            return res.status(500).json({ message: "coś się zepsuło" });
        }

        if (result[0]) {
            pool.query(`DELETE FROM save WHERE event_id = ? AND user_id = ?`, [eventId, userId], (err) => {
                if (err) {
                    console.error("Błąd usuwania zapisu:", err);
                    return res.status(500).json({ message: "Błąd serwera" });
                }
                res.status(200).json({ message: "usunięto zapisanie" });
            });
        } else {
            pool.query(`INSERT INTO save VALUES (NULL, ?, ?, 1, ?)`, [eventId, userId, new Date()], (err) => {
                if (err) {
                    console.error("Błąd dodawania zapisu:", err);
                    return res.status(500).json({ message: "Błąd serwera" });
                }
                res.status(200).json({ message: "dodano zapisanie" });
            });
        }
    });
};

const send = (req,res)=>{
    const {email,message,title} = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "szymonzawrotnyserv@gmail.com",
            pass: process.env.MAILER_PASS
        }
    });

    let mailOptions = {
        from: "szymonzawrotnyserv@gmail.com",
        to: "szymonzawrotny@gmail.com",
        subject: title,
        text: message + ` Wiadomość od ${email}`
    }

    transporter.sendMail(mailOptions,(err)=>{
        if(err) console.log(err);
        else console.log("Wysłano!");
    })
}

const addIcon = (req, res) => {
    const { id } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'Brak pliku do przesłania' });
    }

    const newPath = `/uploads/${req.file.filename}`;

    pool.query('SELECT * FROM icons WHERE user_id = ?', [id], (err, result) => {
        if (err) {
            console.error("Błąd przy zapytaniu do bazy danych:", err);
            return res.status(500).json({ message: "Błąd przy zapytaniu do bazy danych" });
        }

        if (result.length > 0) {
            pool.query('UPDATE icons SET path = ? WHERE user_id = ?', [newPath, id], (err) => {
                if (err) {
                console.error("Błąd przy aktualizacji bazy danych:", err);
                return res.status(500).json({ message: "Błąd przy aktualizacji bazy danych" });
                }
                return res.status(200).json({ message: "Aktualizacja zakończona sukcesem", path: newPath });
            });
        } else {
            pool.query('INSERT INTO icons (user_id, path) VALUES (?, ?)', [id, newPath], (err) => {
                if (err) {
                console.error("Błąd przy dodawaniu do bazy danych:", err);
                return res.status(500).json({ message: "Błąd przy dodawaniu do bazy danych" });
                }
                return res.status(200).json({ message: "Dodanie zakończone sukcesem", path: newPath });
            });
        }
    });
}

const icons = (req,res)=>{
    const query = `SELECT * FROM icons`;
    pool.query(query, (err, result) => {
        if (err) {
            console.error("Błąd zapytania:", err);
            return res.status(500).json({ message: 'Błąd serwera' });
        }
        res.json(result);
    });
}

const askbot = async (req,res)=>{
    const {value} = req.body

    // getResponse(value).then(data=>{
    //     console.log(data);
    //     res.status(200).json({answer:data,question:value});
    // });

    res.status(200).json({answer:"kod zablokowałem bo to płatne i się boję XD",question:value});
}

const getSavedEvents = async (req,res)=>{
    const {id} = req.body

    try {
        const [events] = await pool.promise().query("SELECT * FROM events");
        const [saved] = await pool.promise().query(`SELECT * FROM save WHERE user_id = ?`, [id]);

        const savedEvents = events.filter(one => 
            saved.some(s => s.event_id === one.event_id)
        );

        res.status(200).json({ answer: savedEvents }); 
    } catch (err) {
        console.error("Błąd zapytania:", err);
        res.status(500).json({ message: "Błąd serwera" });
    }
}

const views = async (req,res)=>{
    const {id} = req.body; 

    try{
        const [views] = await pool.promise().query(`select * from views where user_id = ? limit 5`,[id])  
        const [events] = await pool.promise().query("SELECT * FROM events");

        const lastEvents = events.filter(one => 
            views.some(s => s.event_id === one.event_id)
        );

        res.status(200).json({answer: lastEvents})

    } catch(err){
        res.status(500).json({message:"Błąd serwera"})
        console.log("błąd zapytania: ",err)
    }
}

const addView = async (req,res)=>{
    const {id,eventId} = req.body; 

    try{
        const [view] = await pool.promise().query(`select * from views where user_id = ? && event_id = ?`,[id,eventId])

        if(view.length <= 0){
             pool.query('INSERT INTO views (view_id,event_id,user_id, date) VALUES (NULL,?,?,?)', [eventId, id,new Date()], (err) => {
                if (err) {
                    console.error("Błąd przy dodawaniu do bazy danych:", err);
                    return res.status(500).json({ message: "Błąd przy dodawaniu do bazy danych" });
                }
                return res.status(200).json({ message: "Dodanie zakończone sukcesem"});
            });
        }
    } catch(err){
        res.status(500).json({message:"Błąd serwera"})
        console.log("błąd zapytania: ",err)
    }
}

const eventsToAccept = async (req,res) =>{
    const query = "SELECT * FROM events_to_accept";
    pool.query(query, (err, results) => {
        if (err) {
            console.error("Błąd zapytania:", err);
            return res.status(500).json({ message: 'Błąd serwera' });
        }
        res.json(results);
    });
}

const eventsReported = async (req,res) =>{
    const query = "SELECT * FROM events_reported";
    pool.query(query, (err, results) => {
        if (err) {
            console.error("Błąd zapytania:", err);
            return res.status(500).json({ message: 'Błąd serwera' });
        }
        res.json(results);
    });
}

const addReport = async (req,res)=>{
    const {id,eventId} = req.body; 

    try{
        const [view] = await pool.promise().query(`select * from events_reported where user_id = ? && event_id = ?`,[id,eventId])

        if(view.length <= 0){
             pool.query('INSERT INTO events_reported (report_id,user_id,event_id, data) VALUES (NULL,?,?,?)', [id, eventId,new Date()], (err) => {
                if (err) {
                    console.error("Błąd przy dodawaniu do bazy danych:", err);
                    return res.status(500).json({ message: "Błąd przy dodawaniu do bazy danych" });
                }
                return res.status(200).json({ message: "Dodanie zgłoszenia zakończone sukcesem"});
            });
        }
    } catch(err){
        res.status(500).json({message:"Błąd serwera"})
        console.log("błąd zapytania: ",err)
    }
}

export { register, api, likes, addLike, save, addSave, send,
         addIcon,icons,askbot, getSavedEvents,views,addView,eventsToAccept,eventsReported, addReport};