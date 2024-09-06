'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaLocationDot } from "react-icons/fa6";
import "./style.scss";

const Home = ()=>{

    // const router = useRouter();

    let [logEmail,setLogEmail] = useState("");
    let [logPassword,setLogPassword] = useState("");
    let [regEmail,setRegEmail] = useState("");
    let [regPassword,setRegPassword] = useState("");
    let [regPassword2,setRegPassword2] = useState("");

    const handleReg = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/reg",{
            method: "POST",
            body: JSON.stringify({
                regEmail,
                regPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();
        console.log(data.message); 

        setRegEmail("");
        setRegPassword("");
        setRegPassword2("");
    }

    const handleLog = async (e)=>{
        e.preventDefault();
        const response  = await fetch("http://localhost:5000/log",{
            method: "POST",
            body: JSON.stringify({
                logEmail,
                logPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();
        console.log(data.message); 

        if(data.message == "Zalogowano pomyślnie"){
          //router.push("/home");
        }

        setLogEmail("");
        setLogPassword("");
    }

    const handleInputs = (e)=>{
        let id = e.target.id;
        switch(id){
            case 'logEmail': setLogEmail(e.target.value);break;
            case 'logPassword': setLogPassword(e.target.value);break;
            case 'regEmail': setRegEmail(e.target.value);break;
            case 'regPassword': setRegPassword(e.target.value);break;
            case 'regPassword2': setRegPassword2(e.target.value);break;
            default: console.log("coś się zepsuło");
        }
    } 

    return(
      <div className="app">
        <div className="loginPage">
            <div className="loginForm">
                <FaLocationDot
                    className='emotka'
                />
                <span>login</span>
                <form action="POST">
                    <input 
                        type="email" 
                        placeholder='email...' 
                        onChange={handleInputs}
                        value={logEmail}
                        id="logEmail" />
                    <input 
                        type="password" 
                        placeholder='password...' 
                        onChange={handleInputs}
                        value={logPassword}
                        id="logPassword"/>
                    <input 
                        type="submit" 
                        value="next" 
                        className="submit" 
                        onClick={handleLog}/>
                </form>
            </div>
            <div className="registerForm">
                <FaLocationDot
                    size={100}
                    className='emotka'
                />
                <span>Register</span>
                <form action="POST">
                    <input 
                        type="email" 
                        placeholder='email...' 
                        onChange={handleInputs}
                        value={regEmail}
                        id="regEmail"/>
                    <input 
                        type="password" 
                        placeholder='password...' 
                        onChange={handleInputs}
                        value={regPassword}
                        id="regPassword"/>
                    <input 
                        type="password" 
                        placeholder='repeat password...' 
                        onChange={handleInputs}
                        value={regPassword2}
                        id="regPassword2"/>
                    <input type="text" placeholder='TU BĘDZIE CAPTCHA...'/>
                    <input 
                        type="submit" 
                        value="next" 
                        className="submit" 
                        onClick={handleReg}/>
                </form>
            </div>
            <div className="logo">
                <span className="bigger">All events in your area!</span>
                <span className="smaller">and a lot more...</span>
            </div>
            
        </div>
      </div>
    )
}
export default Home;