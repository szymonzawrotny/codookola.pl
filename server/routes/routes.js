import bcrypt from 'bcrypt';
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
            pool.query(`INSERT INTO likes VALUES (NULL, ?, ?, 1, ?)`, [eventId, userId, "testowa data"], (err) => {
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
            pool.query(`INSERT INTO save VALUES (NULL, ?, ?, 1, ?)`, [eventId, userId, "testowa data"], (err) => {
                if (err) {
                    console.error("Błąd dodawania zapisu:", err);
                    return res.status(500).json({ message: "Błąd serwera" });
                }
                res.status(200).json({ message: "dodano zapisanie" });
            });
        }
    });
};

export { register, api, likes, addLike, save, addSave };