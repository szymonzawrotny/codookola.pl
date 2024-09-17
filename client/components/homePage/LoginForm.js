import { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaEye , FaUnlockAlt } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const LoginForm = ()=>{

    const router = useRouter();
    const emailRef = useRef();
    const emailInputRef = useRef();
    const passInputRef = useRef();

    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");

    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleFormSend = async (e)=>{
        e.preventDefault();

        const response  = await fetch("http://localhost:5000/log",{
            method: "POST",
            body: JSON.stringify({
                email,
                pass
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.ok){
            const data = await response.json();
            const token = data.token;

            localStorage.setItem('token',token);

            router.push("/map");
        } else{
            setEmailError("Nieprawidłowe dane logowania!");
            setPasswordError("Nieprawidłowe dane logowania!");
            emailInputRef.current.classList.add("error");
            passInputRef.current.classList.add("error");
        }
    }

    const handleInput = e=>{

        if(e.target.id == "text"){
            setEmail(e.target.value);
            setEmailError("");
            emailInputRef.current.classList.remove("error");
        }else if(e.target.id == "password"){
            setPass(e.target.value);
            setPasswordError("");
            passInputRef.current.classList.remove("error");
        }
    }

    const changeType = () => setPasswordVisible(!passwordVisible);

    return(
        <form onSubmit={handleFormSend} className="login">
            <div className="input" ref={emailInputRef}>
                <IoPersonCircleOutline size={42} style={{color:"#222"}}/>
                <input 
                    type="text" 
                    id="text"
                    placeholder="Email" 
                    value={email}
                    ref={emailRef}
                    onChange={handleInput}/>
                <div className="errorText">{emailError}</div>
            </div>
            <div className="input" ref={passInputRef}>
                <FaUnlockAlt size={34} style={{color:"#222",marginLeft: "8px"}}/>
                <input 
                    type={passwordVisible ? "text" : "password"}
                    id="password" 
                    placeholder="Password"
                    value={pass}
                    onChange={handleInput}/>
                    <div className="errorText">{passwordError}</div>
                {passwordVisible ? <FaEyeSlash size={36} onClick={changeType}/> : <FaEye size={36} onClick={changeType}/>}
            </div>
            <div className="down">
                <span>Forgot Password?</span>
                <input type="submit" value="NEXT" />
            </div>
        </form>
    )
}
export default LoginForm;