import CredentialsProvider from "next-auth/providers/credentials";
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

export const options = {
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                username: {
                    type: "text",
                    placeholder: "login or email"
                },
                password: {
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials){
                const conn = await mysql.createConnection({
                    host: process.env.DATABASE_HOST,
                    user: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    database: process.env.DATABASE_NAME
                });

                try{
                    const [rows] = await conn.execute(
                        'select * from users where email = ?',
                        [credentials.username]
                    );

                    if(rows.length > 0){
                        const user = rows[0];

                        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

                        if(isPasswordValid){
                            return {
                                email: {
                                    id:user.user_id,
                                    email: user.email,
                                    role: user.role
                                }
                            };
                        } else {
                            return null;  //złe hasło
                        }
                    } else {
                        return null  //nie ma takiego emaila
                    }
                } catch(error){
                    console.log(error);
                    return null;
                } finally {
                    await conn.end();
                }
            }
        })
    ],
    pages: {
        signIn: "/"
    },
    secret: process.env.NEXT_AUTH_SECRET_KEY,
}