import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'
import "dotenv/config";
import { pool } from '../config/database.js';
import {getResponse} from "../getChatbotAnswer.js"
import { convert } from "../addressToLocation.js";

const register = async (req, res) => {
    const {name, email, pass, captchaToken } = req.body;

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

                    const query = `INSERT INTO users (name,lastname,city,street,age,email, password, role,chat_number) VALUES (?," "," "," ",0,?, ?, 'user',3)`;
                    pool.query(query, [name,email, hashedPassword], (err, results) => {
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
        const [alerts] = await pool.promise().query("SELECT * FROM alerts where user_id = ? order by alert_id desc",[id]);

        res.status(200).json({answer: alerts})

    } catch(err){
        res.status(500).json({message:"Błąd serwera"})
        console.log("błąd zapytania: ",err)
    }
}

const addEvent = async (req, res) => {
    const { id, email, title, desc, country, city, street, number, type, date, hour } = req.body;

    let location = { lat: "brak", lng: "brak" };

    const address = `${country},${city} ${street} ${number}`;

    try {
        location = await convert(address);
    } catch (error) {
        console.error(error);
    }

    // Pobranie ścieżek plików
    const photoPaths = req.files.map(file => `/uploads/${file.filename}`);

    const [photo_path, photo_path2, photo_path3] = photoPaths;

    //if path == null to ustawiasz /uploads/default.jpg 

    try {
        pool.query(
            'INSERT INTO events_to_accept (event_id, nazwa, adres, miasto, kod_pocztowy, lat, lng, opis, rodzaj, data, author_id, author_email, photo_path, photo_path2, photo_path3) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, street, city, number, location.lat, location.lng, desc, type, date, id, email, photo_path, photo_path2, photo_path3],
            (err) => {
                if (err) {
                    console.error("Błąd przy dodawaniu do bazy danych:", err);
                    return res.status(500).json({ message: "Błąd przy dodawaniu do bazy danych" });
                }
                return res.status(200).json({ message: "Dodanie zgłoszenia zakończone sukcesem" });
            }
        );
    } catch (err) {
        res.status(500).json({ message: "Błąd serwera" });
        console.log("Błąd zapytania: ", err);
    }
};

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
        const [users] = await pool.promise().query(`SELECT user_id,email FROM users limit 25`);

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

            const [path] = await pool.promise().query("SELECT path FROM icons WHERE user_id = ?", [one.user_id]);

            one.path = ( path[0] && path[0].path ) ? path[0].path : "brak"
        }

        users.sort((a, b) => b.points - a.points);

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Błąd serwera" });
        console.error("Błąd zapytania: ", err);
    }
};

const stats = async (req,res)=>{
    const { id } = req.body;  //id użytkownika

    try{
        const createDate = today=>`${today.getDate()}.${today.getMonth()+1}.${today.getYear()-100}`

        //tydzień
        const generateWeek = async (type) => {
            let today = new Date();
            let weekData = [];

            const [events] = await pool.promise().query("SELECT event_id FROM events WHERE author_id = ?", [id]);
            const eventIds = events.map(event => event.event_id);

            if (eventIds.length === 0) return weekData; 

            let query = "";
            switch (type) {
                case "views":
                    query = "SELECT date FROM views WHERE event_id IN (?)";
                    break;
                case "likes":
                    query = "SELECT date FROM likes WHERE event_id IN (?)";
                    break;
                case "save":
                    query = "SELECT date FROM save WHERE event_id IN (?)";
                    break;
                default:
                    throw new Error("Invalid type specified");
            }

            const [data] = await pool.promise().query(query, [eventIds]);

            const groupedData = data.reduce((acc, item) => {
                const date = new Date(item.date).toISOString().split("T")[0]; // yyyy-mm-dd
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});

            for (let i = 6; i >= 0; i--) {
                const currentDate = new Date(today);
                currentDate.setDate(today.getDate() - i);
                const currentDateString = currentDate.toISOString().split("T")[0]; // yyyy-mm-dd

                const number = groupedData[currentDateString] || 0;

                weekData.push({ date: createDate(currentDate), value: number });
            }

            return weekData;
        };
        
        const series = [
            {
                name: 'Wyświetlenia',
                color: "green",
                data: await generateWeek("views"),
                
            },
            {
                name: 'Polubienia',
                color: "blue",
                data: await generateWeek("likes"),
            },
            {
                name: 'Zapisania',
                color: "red",
                data: await generateWeek("save"),
            },
        ];

        //miesiąc
        const generateMonth = async (type) => {
            let today = new Date();
            let weekData = [];
            let currentMonth = today.getMonth() - 1;
            let currentYear = today.getFullYear();

            if (currentMonth < 0) {
                currentMonth = 11; // Grudzień poprzedniego roku
                currentYear -= 1;
            }

            const [events] = await pool.promise().query("SELECT event_id FROM events WHERE author_id = ?", [id]);

            // Pobranie wszystkich danych dla optymalizacji
            const dataMap = {};
            for (const event of events) {
                const [data] = await pool.promise().query(`SELECT date FROM ${type} WHERE event_id = ?`, [event.event_id]);
                for (const row of data) {
                    const dateKey = new Date(row.date).toISOString().split("T")[0];
                    dataMap[dateKey] = (dataMap[dateKey] || 0) + 1;
                }
            }

            for (let i = 0; i < 4; i++) {
                const startDay = i * 7 + 1;
                const endDay = (i + 1) * 7;
                let number = 0;

                for (let j = startDay; j <= endDay; j++) { 
                    const currentDate = new Date(currentYear, currentMonth, j);
                    const currentDateString = currentDate.toISOString().split("T")[0];
                    number += dataMap[currentDateString] || 0;
                }

                weekData.push({
                    date: `${startDay}-${endDay}.${currentMonth + 1}.${currentYear}`,
                    value: number,
                });
            }

            return weekData;
        };

        const series2 = [
        {
            name: 'Wyświetlenia',
            color: "green",
            data: await generateMonth("views")
        },
        {
            name: 'Polubienia',
            color: "blue",
            data: await generateMonth("likes")
        },
        {
            name: 'Zapisania',
            color: "red",
            data: await generateMonth("save")
        },
        ];

        //rok
        const monthName = [
            'Styczeń',
            'Luty',
            'Marzec',
            'Kwiecień',
            'Maj',
            'Czerwiec',
            'Lipiec',
            'Sierpień',
            'Wrzesień',
            'Pazdziernik',
            'Listopad',
            'Grudzień',
        ]

        const generateYear = async (type) => {
            let yearData = [];
            const today = new Date();
            const previousYear = today.getFullYear() - 1;

            const [events] = await pool.promise().query("SELECT event_id FROM events WHERE author_id = ?", [id]);
            const eventIds = events.map(event => event.event_id);

            if (eventIds.length === 0) return yearData; 

            let query = "";
            switch (type) {
                case "views":
                    query = "SELECT date FROM views WHERE event_id IN (?)";
                    break;
                case "likes":
                    query = "SELECT date FROM likes WHERE event_id IN (?)";
                    break;
                case "save":
                    query = "SELECT date FROM save WHERE event_id IN (?)";
                    break;
                default:
                    throw new Error("Invalid type specified");
            }

            const [data] = await pool.promise().query(query, [eventIds]);

            const groupedData = data.reduce((acc, item) => {
                const date = new Date(item.date);
                if (date.getFullYear() === previousYear) {
                    const month = date.getMonth();
                    acc[month] = (acc[month] || 0) + 1;
                }
                return acc;
            }, {});

            for (let i = 0; i < 12; i++) {
                const number = groupedData[i] || 0;

                yearData.push({
                    date: monthName[i],
                    value: number,
                });
            }

            return yearData;
        };

        const series3 = [
        {
            name: 'Wyświetlenia',
            color: "green",
            data: await generateYear("views")
        },
        {
            name: 'Polubienia',
            color: "blue",
            data: await generateYear("likes")
        },
        {
            name: 'Zapisania',
            color: "red",
            data: await generateYear("save")
        },
        ];

        //ogólne
        let viewsNumber = 0;
        let likesNumber = 0;
        let saveNumber = 0;

        const [events] = await pool.promise().query("SELECT event_id FROM events WHERE author_id = ?", [id]);

        for(const event of events){
            const [likes] = await pool.promise().query("SELECT count(event_id) as number FROM likes WHERE event_id = ?", [event.event_id]);
            const [views] = await pool.promise().query("SELECT count(event_id) as number FROM views WHERE event_id = ?", [event.event_id]);
            const [save] = await pool.promise().query("SELECT count(event_id) as number FROM save WHERE event_id = ?", [event.event_id]);

            viewsNumber += views[0].number
            likesNumber += likes[0].number
            saveNumber += save[0].number
        }   

        res.status(200).json({answer:series,answer2:series2,answer3:series3,views:viewsNumber,likes:likesNumber,save:saveNumber})

    } catch(err){
        res.status(500).json({ message: "Błąd serwera" });
        console.error("Błąd zapytania: ", err);
    }
}

const getComments = async (req,res)=>{
    const {id} = req.body; 

    try{ 
        const [comments] = await pool.promise().query("SELECT * FROM comments where event_id = ?",[id]);

        for(const comment of comments){

            const [email] = await pool.promise().query("SELECT email FROM users where user_id = ?",[comment.user_id]);
            const [icon] = await pool.promise().query("SELECT path FROM icons where user_id = ?",[comment.user_id]);

            comment.email = (email[0] && email[0].email) ? email[0].email : "Użytkownik usunięty"
            comment.icon = (icon[0] && icon[0].path) ? icon[0].path : "brak";
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

const editUserData = async (req,res)=>{
    const {id,type,value} = req.body;

    try{

        let query = '';

        switch(type){
            case "name":{
                query = 'update users set name = ? where user_id = ?';
            }break;
            case "lastname":{
                query = 'update users set lastname = ? where user_id = ?';
            }break;
            case "city":{
                query = 'update users set city = ? where user_id = ?';
            }break;
            case "street":{
                query = 'update users set street = ? where user_id = ?';
            }break;
            case "age":{
                query = 'update users set age = ? where user_id = ?';
            }break;
        }


        pool.query(query,[value,id],(err) => {
            if (err) {
            console.error("Błąd przy aktualizacji bazy danych:", err);
            res.status(500).json({message: "błąd w zapytaniu do bazy danych "})
            }
        });

        res.status(200).json({message: "zmieniono dane użytkownika"})
    } catch(err){
        console.log("błąd w zapytaniu do bazy danych")
        res.status(500).json({message: "błąd w zapytaniu do bazy danych "})
    }
}

const usersApi = async (req,res)=>{
    const query = "SELECT user_id,name,lastname,email,role,city,street,age FROM users";
    pool.query(query, (err, results) => {
        if (err) {
            console.error("Błąd zapytania:", err);
            return res.status(500).json({ message: 'Błąd serwera' });
        }
        res.json(results);
    });
}

const addEventToMap = async (req,res)=>{
    const {data} = req.body;
     
    try {
        await pool.promise().query(
        `INSERT INTO events (nazwa, adres, miasto, kod_pocztowy, lat, lng, opis, rodzaj, data, author_id, author_email, photo_path, photo_path2, photo_path3) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [
            data.nazwa, data.adres, data.miasto, data.kod_pocztowy, data.lat, data.lng, 
            data.opis, data.rodzaj, data.data, data.author_id, data.author_email, 
            data.photo_path, data.photo_path2, data.photo_path3
        ]
        );
        console.log(`Przeniesiono wydarzenie: ${data.nazwa}`);

        await pool.promise().query('DELETE FROM events_to_accept WHERE event_id = ?',[data.event_id]);

        await pool.promise().query('insert into alerts (alert_id,user_id,content) values (NULL, ?, ?)',[data.author_id,"Pomyślnie dodano wydarzenie! Możesz już zobaczyć swoje wydarzenie na mapie."]);

        res.status(200).json({message:"dodano działa"})
    } catch (err) {
        console.error(`Błąd podczas przenoszenia wydarzenia ${data.nazwa}:`, err);
        res.status(500).json({message: "błąd serwera"})
    }
}

const dontAcceptEvent = async (req,res)=>{
    const { user_id,event_id } = req.body;

    try{
        await pool.promise().query('DELETE FROM events_to_accept WHERE event_id = ?',[event_id]);
        console.log("nie zaakcpetowano wydarzenia")

        await pool.promise().query('insert into alerts (alert_id,user_id,content) values (NULL, ?, ?)',[user_id,"Nie udało się dodać wydarzenia. Prawdopodobnie zawiera ono poważny błąd bądź treści nie zgodne z regulaminem. Popraw wydarzenie a następnie dodaj je podobnie"]);

        res.status(200).json({message:"usunięto wydarzenie wszystko ok"})
    } catch(err){
        console.log(`Błąd podczas usuwania wydarzenia ${event_id}:`,err);
        res.status(500).json({message:"błąd serwera"})
    }

}

const editEventData = async (req, res) => {
    const { id, type, value, userId } = req.body;

    try {
        let query = '';
        let tab = [];

        switch (type) {
            case "name": {
                query = 'UPDATE events SET nazwa = ? WHERE event_id = ?';
                tab = [value, id];
            } break;

            case "desc": {
                query = 'UPDATE events SET opis = ? WHERE event_id = ?';
                tab = [value, id];
            } break;

            case "address": {
                let text = value.split(',').map(item => item.trim());
                if (text.length < 3) {
                    res.status(400).json({ message: "Nieprawidłowy format adresu. Oczekiwano: 'miasto, kod_pocztowy, adres'" });
                    return;
                }

                const address = `Polska,${text[0]},${text[2]}`;
                let location = { lat: "brak", lng: "brak" };
                try {
                    location = await convert(address);
                } catch (error) {
                    console.error(error);
                }

                query = 'UPDATE events SET miasto = ?, kod_pocztowy = ?, adres = ?, lat = ?, lng = ? WHERE event_id = ?';
                tab = [text[0], text[1], text[2],location.lat,location.lng, id];

                 
            } break;

            default: {
                res.status(400).json({ message: "Nieprawidłowy typ edycji" });
                return;
            }
        }

        pool.query(query, tab, async (err) => {
            if (err) {
                console.error("Błąd przy aktualizacji bazy danych:", err);
                res.status(500).json({ message: "błąd w zapytaniu do bazy danych" });
                return;
            }

            await pool.promise().query('insert into alerts (alert_id,user_id,content) values (NULL, ?, ?)',[userId,"Edytowano wydarzenie! Dane zostały zaktualizowane."]);
            res.status(200).json({ message: "zmieniono dane wydarzenia" });
        });
    } catch (err) {
        console.error("Błąd w zapytaniu do bazy danych", err);
        res.status(500).json({ message: "błąd w zapytaniu do bazy danych" });
    }
};

const editPhotos = async (req,res)=>{
    const { id } = req.body;

    try{
        const photoPaths = req.files.map(file => `/uploads/${file.filename}`);

        const [photo_path, photo_path2, photo_path3] = photoPaths;

        let query = 'UPDATE events SET photo_path = ?, photo_path2 = ?, photo_path3 = ? WHERE event_id = ?';

        pool.query(query, [photo_path, photo_path2, photo_path3,id], async (err) => {
            if (err) {
                console.error("Błąd przy aktualizacji bazy danych:", err);
                res.status(500).json({ message: "błąd w zapytaniu do bazy danych" });
                return;
            }
            res.status(200).json({ message: "zmieniono dane wydarzenia" });
        });
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Błąd przy edytowaniu zdjęć"})
    }
}

export {register, api, likes, addLike, save, addSave, send,
        addIcon,icons,askbot, getSavedEvents,views,addView,
        eventsToAccept,eventsReported, addReport, getAlerts,
        addEvent, deleteEvent,checkNumber,rankingList, stats,
        getComments, addComment, editUserData, usersApi,
        addEventToMap,dontAcceptEvent,editEventData,editPhotos
};