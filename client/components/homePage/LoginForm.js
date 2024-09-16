import { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaEye , FaUnlockAlt } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const LoginForm = ()=>{

    const router = useRouter();
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [error,setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const ref = useRef();

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

        const data = await response.json();

        if(data.message == "Zalogowano pomyślnie"){
            router.push("/map");
        } else{
            setError("Nieprawidłowe dane logowania!");
        }
    }

    const validation = ()=>{
        //console.log("Siema");
    }

    const handleInput = e=>{

        if(e.target.id == "text") setEmail(e.target.value);
        else if(e.target.id == "password") setPass(e.target.value)

        validation();
    }

    const changeType = () => {
        setPasswordVisible(!passwordVisible);
    };

    return(
        <form onSubmit={handleFormSend} className="login">
            <div className="input">
                <IoPersonCircleOutline size={42} style={{color:"#222"}}/>
                <input 
                    type="text" 
                    id="text"
                    placeholder="Email" 
                    value={email}
                    onChange={handleInput}
                    />
            </div>
            <div className="input">
                <FaUnlockAlt size={34} style={{color:"#222",marginLeft: "4px"}}/>
                <input 
                    type={passwordVisible ? "text" : "password"}
                    id="password" 
                    placeholder="Password"
                    value={pass}
                    onChange={handleInput}
                    ref={ref}
                    />
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