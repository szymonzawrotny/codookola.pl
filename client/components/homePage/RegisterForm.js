'use client'
import { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

import { IoPersonCircleOutline } from "react-icons/io5";
import { FaUnlockAlt, FaEye } from "react-icons/fa";
import { TiArrowRepeat } from "react-icons/ti";
import { FaEyeSlash } from "react-icons/fa6";

const RegisterForm = ()=>{

    const emailRef = useRef();
    const password = useRef();
    const passwordRepeat = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordRepeatInputRef = useRef();


    const recaptchaRef = useRef();
    const [captchaToken, setCaptchaToken] = useState('');

    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [passRepeat,setPassRepeat] = useState("");

    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [passwordRepeatError,setPasswordRepeatError] = useState("");
    
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);

    const onCaptchaChange = (token) => {
        if (token) setCaptchaToken(token);
    };

    const handleFormSend = async (e)=>{
        e.preventDefault();

        if((emailError=="" && passwordError=="" && passwordRepeatError=="") && email!=="" && pass!==""){

            recaptchaRef.current.execute();

            const response = await fetch("http://localhost:5000/reg",{
                method: "POST",
                body: JSON.stringify({
                    email,
                    pass,
                    captchaToken
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(response.ok){
                console.log("dodano konto")
                alert("dodano konto")
            } else {
                console.log("błąd rejestracji")
            }
        } else{
            console.log("uzupełnij poprawnie formularz")
        }
    }

    const validation = ()=>{
        const passValue = password.current.value;
        const passRepeatValue = passwordRepeat.current.value;

        if(passValue !== passRepeatValue){
            setPasswordError("Hasła muszą być identyczne!");
            setPasswordRepeatError("Hasła muszą być identyczne!");
            passwordInputRef.current.classList.add("error");
            passwordRepeatInputRef.current.classList.add("error");
        } else if(passValue == passRepeatValue){
            setPasswordError("");
            setPasswordRepeatError("")
            passwordInputRef.current.classList.remove("error");
            passwordRepeatInputRef.current.classList.remove("error");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let email = emailRef.current.value;

        if(!emailRegex.test(email) && email !== ""){
            setEmailError("Błędny adres email!");
            emailInputRef.current.classList.add("error");
        } else{
            setEmailError("");
            emailInputRef.current.classList.remove("error");
        }

        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if(!passRegex.test(passValue) && passValue !== ""){
            setPasswordError("Hasło powinno zawierać  conajmniej 6 znaków (mała i duża litera, cyfra oraz znak specjalny)");
            passwordInputRef.current.classList.add("error");
        } else{
            setPasswordError("");
            passwordInputRef.current.classList.remove("error");
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

    const changeType = () => setPasswordVisible(!passwordVisible);
    const changeType2 = () => setPasswordVisible2(!passwordVisible2);

    useEffect(()=>{
        recaptchaRef.current.execute();
    },[0])

    return(
        <form onSubmit={handleFormSend} className="register">

            <div className="input" ref={emailInputRef}>
                <IoPersonCircleOutline size={42} style={{color:"#222"}}/>
                <input 
                    type="text" 
                    value={email}
                    onChange={handleInput}
                    id="email"
                    ref={emailRef}
                    placeholder="Email" />
                <div className="errorText">{emailError}</div>
            </div>

            <div className="input" ref={passwordInputRef}>
                <FaUnlockAlt size={34} style={{color:"#222",marginLeft: "8px"}}/>
                <input 
                    type={passwordVisible ? "text" : "password"} 
                    value={pass}
                    onChange={handleInput}
                    id="password"
                    ref={password}
                    placeholder="Password"/>
                <div className="errorText">{passwordError}</div>
                {passwordVisible ? <FaEyeSlash size={36} onClick={changeType} style={{cursor:"pointer"}}/> : <FaEye size={36} onClick={changeType} style={{cursor:"pointer"}}/>}
            </div>

            <div className="input" ref={passwordRepeatInputRef}>
                <TiArrowRepeat size={34} style={{color:"#222",marginLeft: "8px"}}/>
                <input 
                    type={passwordVisible2 ? "text" : "password"}  
                    value={passRepeat}
                    onChange={handleInput}
                    id="passwordRepeat"
                    ref={passwordRepeat}
                    placeholder="Repeat Password"/>
                <div className="errorText">{passwordRepeatError}</div>
                {passwordVisible2 ? <FaEyeSlash size={36} onClick={changeType2} style={{cursor:"pointer"}}/> : <FaEye size={36} onClick={changeType2} style={{cursor:"pointer"}}/>}
            </div>

            <div className="down">
                <div className="captchaBox">
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_CAPTCHA}
                        ref={recaptchaRef}
                        size="invisible"
                        onChange={onCaptchaChange}
                    />
                 </div>
                <span></span>
                <input type="submit" value="NEXT" />
            </div>

        </form>
    )
}
export default RegisterForm;