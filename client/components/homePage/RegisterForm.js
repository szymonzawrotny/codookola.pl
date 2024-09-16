'use client'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaUnlockAlt, FaEye } from "react-icons/fa";
import { TiArrowRepeat } from "react-icons/ti";
import { FaEyeSlash } from "react-icons/fa6";

const RegisterForm = ()=>{

    const password = useRef();
    const passwordRepeat = useRef();

    const router = useRouter();
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [passRepeat,setPassRepeat] = useState("");
    const [error,setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);

    const handleFormSend = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/reg",{
            method: "POST",
            body: JSON.stringify({
                email,
                pass
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        router.push("/map");
    }

    const validation = ()=>{
        const passValue = password.current.value;
        const passRepeatValue = passwordRepeat.current.value;

        if(passValue !== passRepeatValue){
            setError("Hasła muszą być identyczne")
        } else if(passValue == passRepeatValue){
            setError("")
        }
    }

    const handleInput = e=>{

        if(e.target.id == "email"){
            setEmail(e.target.value);
        } else if(e.target.id == "password"){
            setPass(e.target.value);
        } else if(e.target.id == "passwordRepeat"){
            setPassRepeat(e.target.value);
        }

        validation();
    }

    const changeType = () => {
        setPasswordVisible(!passwordVisible);
    };

    const changeType2 = () => {
        setPasswordVisible2(!passwordVisible2);
    };

    return(
        <form onSubmit={handleFormSend} className="register">
            <div className="input">
                <IoPersonCircleOutline size={42} style={{color:"#222"}}/>
                <input 
                    type="text" 
                    value={email}
                    onChange={handleInput}
                    id="email"
                    placeholder="Email" />
            </div>
            <div className="input">
                <FaUnlockAlt size={34} style={{color:"#222",marginLeft: "4px"}}/>
                <input 
                    type={passwordVisible ? "text" : "password"} 
                    value={pass}
                    onChange={handleInput}
                    id="password"
                    ref={password}
                    placeholder="Password"/>
                {passwordVisible ? <FaEyeSlash size={36} onClick={changeType}/> : <FaEye size={36} onClick={changeType}/>}
            </div>
            <div className="input">
                <TiArrowRepeat size={34} style={{color:"#222",marginLeft: "4px"}}/>
                <input 
                    type={passwordVisible2 ? "text" : "password"}  
                    value={passRepeat}
                    onChange={handleInput}
                    id="passwordRepeat"
                    ref={passwordRepeat}
                    placeholder="Repeat Password"/>
                {passwordVisible2 ? <FaEyeSlash size={36} onClick={changeType2}/> : <FaEye size={36} onClick={changeType2}/>}
            </div>
            <div className="down">
                <span></span>
                <input type="submit" value="NEXT" />
            </div>
        </form>
    )
}
export default RegisterForm;