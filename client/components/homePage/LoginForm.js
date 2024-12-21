import { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';

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

        const result = await signIn("credentials",{
            redirect: false,
            username: email,
            password: pass
          })
      
          if(result.error){
            console.log(result.error);
            setEmailError("Nieprawidłowe dane logowania!");
            setPasswordError("Nieprawidłowe dane logowania!");
            emailInputRef.current.classList.add("error");
            passInputRef.current.classList.add("error");
          } else {
            router.push('/map')
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
                {passwordVisible ? <FaEyeSlash size={36} onClick={changeType} style={{cursor:"pointer"}}/> : <FaEye size={36} onClick={changeType} style={{cursor:"pointer"}}/>}
            </div>
            <div className="down">
                <input type="submit" value="NEXT" />
            </div>
        </form>
    )
}
export default LoginForm;