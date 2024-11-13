import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import "dotenv/config";
import { pool } from '../config/database.js';

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
            bcrypt.hash(pass, 10, (err, hashedPassword) => {
                if (err) {
                    console.log("Błąd hashowania hasła: ", err);
                    return res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
                }

                const query = `INSERT INTO users VALUES (NULL, ?, ?, 'user')`;
                pool.query(query, [email, hashedPassword], (err, results) => {
                    if (err) {
                        console.error("Błąd podczas zapisu do bazy danych:", err);
                        return res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
                    }
                    res.status(200).json({ success: true, message: 'Zarejestrowano pomyślnie' });
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
        // Jeśli rekord istnieje, wykonujemy UPDATE
        pool.query('UPDATE icons SET path = ? WHERE user_id = ?', [newPath, id], (err) => {
            if (err) {
            console.error("Błąd przy aktualizacji bazy danych:", err);
            return res.status(500).json({ message: "Błąd przy aktualizacji bazy danych" });
            }
            return res.status(200).json({ message: "Aktualizacja zakończona sukcesem", path: newPath });
        });
        } else {
        // Jeśli rekord nie istnieje, wykonujemy INSERT
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

export { register, api, likes, addLike, save, addSave, send, addIcon,icons };