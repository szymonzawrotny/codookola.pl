import bcrypt from 'bcrypt';
import { conn } from '../config/database.js';

const register = async (req,res)=>{
    const {email,pass, captchaToken} = req.body;

    if (!captchaToken) {
        return res.status(400).json({ message: 'Brak tokenu CAPTCHA' });
    }
 
    const secretKey = process.env.CAPTCHA_SECRET_KEY
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

    try{
        const response = await fetch(verifyUrl, {
            method: 'POST',
        });

        const data = await response.json();

        if(data.success){
            bcrypt.hash(pass,10, (err, hashedPassword)=>{
                if(err){
                    console.log("błąd hashowania hasła: ",err);
                    return res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
                }

                const query = `insert into users values(NULL,"${email}","${hashedPassword}","user")`;

                conn.query(query,(err,results)=>{
                    if(err) console.log(err);
                })

                res.status(200).json({ success: true, message: 'Zarejestrowano pomyślnie' });
            })
        } else {
            res.status(400).json({ message: 'Nieprawidłowa CAPTCHA' });
        }
    } catch(error){
        console.error('Błąd weryfikacji CAPTCHA:', error);
        res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
    }
};

const api = (req,res)=>{
    const query = "select * from events";
    conn.query(query,(err,results)=>{
        if(err) console.log(err)

        res.json(results);
    })
};

const likes = (req,res)=>{
    const query = `select * from likes`;
    conn.query(query,(err,result)=>{
        if(err) console.log(err);

        res.json(result);
    })
};

const addLike = async (req,res)=>{
    const {userId,eventId} = req.body;

    const query = `select * from likes where event_id = ? AND user_id = ?`; // select sprawdza czy jest polajkowany

    conn.query(query,[eventId,userId],async (err,result)=>{
        if(err) res.status(500),json({message: "coś się zepsuło"});

        console.log(result);

        if(result[0]){
            await conn.query(`delete from likes where event_id = ? AND user_id = ?`,[eventId, userId])
            console.log("usunięto");
            res.status(200).json({message:"usunięto polubienie"})
        } else{
            await conn.query(`insert into likes values(NULL,?,?,1,?)`,[eventId, userId,"testowa data"])
            console.log("dodano");
            res.status(200).json({message:"dodano polubienie"})
        }
    })
}

const save = async (req,res)=>{
    const query = `select * from save`;
    conn.query(query,(err,result)=>{
        if(err) console.log(err);

        res.json(result);
    })
}

const addSave = async (req,res)=>{
    const {userId,eventId} = req.body;

    const query = `select * from save where event_id = ? AND user_id = ?`; // select sprawdza czy jest polajkowany

    conn.query(query,[eventId,userId],async (err,result)=>{
        if(err) res.status(500).json({message: "coś się zepsuło"});

        if(result[0]){
            await conn.query(`delete from save where event_id = ? AND user_id = ?`,[eventId, userId])
            res.status(200).json({message:"usunięto zapisanie"})
        } else{
            await conn.query(`insert into save values(NULL,?,?,1,?)`,[eventId, userId,"testowa data"])
            res.status(200).json({message:"dodano zapisanie"})
        }
    })
}

export { register, api, likes, addLike, save, addSave}