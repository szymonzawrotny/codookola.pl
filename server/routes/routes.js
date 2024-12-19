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
    const {value,id,chatNumber} = req.body

    let newNumber = chatNumber-1;

    pool.query('update users set chat_number = ? where user_id = ?', [newNumber,id], (err) => {
        if (err) {
        console.error("Błąd przy aktualizacji bazy danych:", err);
        return res.status(500).json({ message: "Błąd przy aktualizacji bazy danych" });
        }
    });

    // getResponse(value).then(data=>{
    //     console.log(data);
    //     res.status(200).json({answer:data,question:value});
    // });

    res.status(200).json({answer:"Tymczasowo zablokowane...",question:value});
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

const getAlerts = async (req,res)=>{
    const {id} = req.body; 

    try{ 
        const [alerts] = await pool.promise().query("SELECT * FROM alerts where user_id = ?",[id]);

        res.status(200).json({answer: alerts})

    } catch(err){
        res.status(500).json({message:"Błąd serwera"})
        console.log("błąd zapytania: ",err)
    }
}

const addEvent = async (req,res) =>{
    const {id,email,title,desc,country,city,street,number,type,date,hour} = req.body;

    const lat = '53.565344951554245';
    const lng = '19.11881682197994';

    const photo_path = "/uploads/default.jpg"

    try{
        pool.query('INSERT INTO events_to_accept (event_id,nazwa,adres,miasto,kod_pocztowy,lat,lng,opis,rodzaj,data,author_id,author_email,photo_path,photo_path2,photo_path3) VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?)', [title,street,city,number,lat,lng,desc,type,date,id,email,photo_path,photo_path,photo_path ], (err) => {
            if (err) {
                console.error("Błąd przy dodawaniu do bazy danych:", err);
                return res.status(500).json({ message: "Błąd przy dodawaniu do bazy danych" });
            }
            return res.status(200).json({ message: "Dodanie zgłoszenia zakończone sukcesem"});
        });
    } catch(err){
        res.status(500).json({message:"Błąd serwera"})
        console.log( "błąd zapytania: ",err)
    }
}

const deleteEvent = async (req,res) =>{
    const {id,eventId} = req.body; 

    try{
        const [event] = await pool.promise().query(`select * from events where author_id = ? && event_id = ?`,[id,eventId])

        if(event.length > 0){
             pool.query('delete from events where event_id = ? && author_id', [eventId,id], (err) => {
                if (err) {
                    console.error("Błąd przy dodawaniu do bazy danych:", err);
                    return res.status(500).json({ message: "Błąd przy dodawaniu do bazy danych" });
                }
                return res.status(200).json({ message: "Dodanie zakończone sukcesem"});
            });
        } else {
            res.status(500).json({ message: "nie ma takiego wydarzenia :/" });
        }
    } catch(err){
        res.status(500).json({message:"Błąd serwera"})
        console.log("błąd zapytania: ",err)
    }
}

const checkNumber = async (req,res)=>{
    const {id} = req.body; 

    try{
        const [event] = await pool.promise().query(`select chat_number from users where user_id = ?`,[id])

        res.status(200).json({message:"działa ok",answer:event})
        
    } catch(err){
        res.status(500).json({message:"Błąd serwera"})
        console.log("błąd zapytania: ",err)
    }
}

const rankingList = async (req, res) => {
    try {
        const [users] = await pool.promise().query(`SELECT user_id, email FROM users limit 25`);

        for (const one of users) {
            one.views = 0;
            one.likes = 0;
            one.save = 0;

            const [events] = await pool.promise().query("SELECT event_id FROM events WHERE author_id = ?", [one.user_id]);

            for(const event of events){
                const [likes] = await pool.promise().query("SELECT count(event_id) as number FROM likes WHERE event_id = ?", [event.event_id]);
                const [views] = await pool.promise().query("SELECT count(event_id) as number FROM views WHERE event_id = ?", [event.event_id]);
                const [save] = await pool.promise().query("SELECT count(event_id) as number FROM save WHERE event_id = ?", [event.event_id]);

                one.views += views[0].number
                one.likes += likes[0].number
                one.save += save[0].number
            }   

            one.points = one.views + one.likes + one.save;
        }

        users.sort((a, b) => b.points - a.points);

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Błąd serwera" });
        console.error("Błąd zapytania: ", err);
    }
};

const stats = async (req,res)=>{
    const { id } = req.body;

    const createDate = today=>`${today.getDate()}.${today.getMonth()+1}.${today.getYear()-100}`

    //tydzień
    
    const generateWeek = ()=>{
        let today = new Date();
        let weekData = [];

        for(let i=7;i>=1;i--){
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate()-i);
            weekData.push({ date: createDate(currentDate), value: Math.floor(Math.random() * 100) })
        }

        return weekData
    }

    const series = [
        {
            name: 'Wyświetlenia',
            color: "green",
            data: generateWeek(),
            
        },
        {
            name: 'Polubienia',
            color: "blue",
            data: generateWeek(),
        },
        {
            name: 'Zapisania',
            color: "red",
            data: generateWeek(),
        },
    ];

    //miesiąc

    const series2 = [
    {
        name: 'Wyświetlenia',
        color: "green",
        data: [
            { date: '07.10.24', value: Math.floor(Math.random() *100)},
            { date: '14.10.24', value: Math.floor(Math.random() *100)},
            { date: '24.10.24', value: Math.floor(Math.random() *100)},
            { date: '28.10.24', value: Math.floor(Math.random() *100)},
        ],
    },
    {
        name: 'Polubienia',
        color: "blue",
        data: [
            { date: '07.10.24', value: Math.floor(Math.random() *100)},
            { date: '14.10.24', value: Math.floor(Math.random() *100)},
            { date: '24.10.24', value: Math.floor(Math.random() *100)},
            { date: '28.10.24', value: Math.floor(Math.random() *100)},
        ],
    },
    {
        name: 'Zapisania',
        color: "red",
        data: [
            { date: '07.10.24', value: Math.floor(Math.random() *100)},
            { date: '14.10.24', value: Math.floor(Math.random() *100)},
            { date: '24.10.24', value: Math.floor(Math.random() *100)},
            { date: '28.10.24', value: Math.floor(Math.random() *100)},
        ],
    },
    ];


    //rok

    const series3 = [
    {
        name: 'Wyświetlenia',
        color: "green",
        data: [
            { date: 'Styczeń', value: Math.floor(Math.random() *100)},
            { date: 'Luty', value: Math.floor(Math.random() *100)},
            { date: 'Marzec', value: Math.floor(Math.random() *100)},
            { date: 'Kwiecień', value: Math.floor(Math.random() *100)},
            { date: 'Maj', value: Math.floor(Math.random() *100)},
            { date: 'Czerwiec', value: Math.floor(Math.random() *100)},
            { date: 'Lipiec', value: Math.floor(Math.random() *100)},
            { date: 'Sierpień', value: Math.floor(Math.random() *100)},
            { date: 'Wrzesień', value: Math.floor(Math.random() *100)},
            { date: 'Pazdziernik', value: Math.floor(Math.random() *100)},
            { date: 'Listopad', value: Math.floor(Math.random() *100)},
            { date: 'Grudzień', value: Math.floor(Math.random() *100)},
        ]
    },
    {
        name: 'Polubienia',
        color: "blue",
        data: [
            { date: 'Styczeń', value: Math.floor(Math.random() *100)},
            { date: 'Luty', value: Math.floor(Math.random() *100)},
            { date: 'Marzec', value: Math.floor(Math.random() *100)},
            { date: 'Kwiecień', value: Math.floor(Math.random() *100)},
            { date: 'Maj', value: Math.floor(Math.random() *100)},
            { date: 'Czerwiec', value: Math.floor(Math.random() *100)},
            { date: 'Lipiec', value: Math.floor(Math.random() *100)},
            { date: 'Sierpień', value: Math.floor(Math.random() *100)},
            { date: 'Wrzesień', value: Math.floor(Math.random() *100)},
            { date: 'Pazdziernik', value: Math.floor(Math.random() *100)},
            { date: 'Listopad', value: Math.floor(Math.random() *100)},
            { date: 'Grudzień', value: Math.floor(Math.random() *100)},
        ],
    },
    {
        name: 'Zapisania',
        color: "red",
        data: [
        { date: 'Styczeń', value: Math.floor(Math.random() *100)},
        { date: 'Luty', value: Math.floor(Math.random() *100)},
        { date: 'Marzec', value: Math.floor(Math.random() *100)},
        { date: 'Kwiecień', value: Math.floor(Math.random() *100)},
        { date: 'Maj', value: Math.floor(Math.random() *100)},
        { date: 'Czerwiec', value: Math.floor(Math.random() *100)},
        { date: 'Lipiec', value: Math.floor(Math.random() *100)},
        { date: 'Sierpień', value: Math.floor(Math.random() *100)},
        { date: 'Wrzesień', value: Math.floor(Math.random() *100)},
        { date: 'Pazdziernik', value: Math.floor(Math.random() *100)},
        { date: 'Listopad', value: Math.floor(Math.random() *100)},
        { date: 'Grudzień', value: Math.floor(Math.random() *100)},
        ],
    },
    ];


    res.status(200).json({answer:series,answer2:series2,answer3:series3})

}

const getComments = async (req,res)=>{
    const {id} = req.body; 

    try{ 
        const [comments] = await pool.promise().query("SELECT * FROM comments where event_id = ?",[id]);

        for(const comment of comments){

            const [email] = await pool.promise().query("SELECT email FROM users where user_id = ?",[comment.user_id]);

            comment.email = email[0].email
        }   

        res.status(200).json({answer: comments})

    } catch(err){
        res.status(500).json({message:"Błąd serwera"})
        console.log("błąd zapytania: ",err)
    }
}

const addComment = async (req,res)=>{
   const {id,userId,value} = req.body;

   try{
        pool.query('INSERT INTO comments (comment_id,event_id,user_id,value,date) VALUES (NULL,?,?,?,?)', [id,userId,value, new Date()], (err) => {
            if (err) {
                console.error("Błąd przy dodawaniu do bazy danych:", err);
                return res.status(500).json({ message: "Błąd przy dodawaniu do bazy danych" });
            }
            return res.status(200).json({ message: "Dodanie zgłoszenia zakończone sukcesem"});
        });
    } catch(err){
        res.status(500).json({message:"Błąd serwera"})
        console.log( "błąd zapytania: ",err)
    }
}

export { register, api, likes, addLike, save, addSave, send,
         addIcon,icons,askbot, getSavedEvents,views,addView,
         eventsToAccept,eventsReported, addReport, getAlerts,
         addEvent, deleteEvent,checkNumber,rankingList, stats, getComments, addComment};