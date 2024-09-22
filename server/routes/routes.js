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

export { register, api}