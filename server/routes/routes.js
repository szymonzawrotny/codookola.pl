import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
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

const login = (req,res)=>{
    const {email,pass} = req.body;

    const query = `select * from users where email = "${email}" limit 1`;

    let user;

    conn.query(query,(err,results)=>{
        if(err) console.log(err);

        if(results[0]){
            user = results[0];

            bcrypt.compare(pass,user.password, (err, isMatch)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
                }

                if(isMatch){
                    user.status = "Zalogowany pomyślnie";

                    const token = jwt.sign({email,pass},process.env.TOKEN_SECRET_KEY,{expiresIn:"1h"})

                    res.status(200).json({ success: true, message: 'Zalogowano pomyślnie',token });
                } else{
                    res.status(401).json({ success: false, message: 'Błędny login' });
                }
            })
            
        } else {
            res.status(401).json({ success: false, message: 'błędny login' });
        }
    });
};

const api = (req,res)=>{
    const query = "select * from events";
    conn.query(query,(err,results)=>{
        if(err) console.log(err)

        res.json(results);
    })
};

const protectedRoute = (req,res)=>{
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).json({message: "brak tokena :("})
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "token nieprawidłowy"})
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: "niepoprawny token"})
        }

        res.status(200).json({message: "token prawidłowy", user: decoded})
    })
}

export { register, login, api, protectedRoute }