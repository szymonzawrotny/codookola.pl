import { useRouter } from "next/navigation";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaUnlockAlt } from "react-icons/fa";

const LoginForm = ()=>{

    const router = useRouter();

    const handleFormSend = (e)=>{
        e.preventDefault();
        router.push("/map");
    }

    return(
        <form onSubmit={handleFormSend} className="login">
            <div className="input">
                <IoPersonCircleOutline size={42} style={{color:"#222"}}/>
                <input type="text" placeholder="Email" />
            </div>
            <div className="input">
                <FaUnlockAlt size={34} style={{color:"#222",marginLeft: "4px"}}/>
                <input type="password" placeholder="Password"/>
            </div>
            <div className="down">
                <span>Forgot Password?</span>
                <input type="submit" value="NEXT" />
            </div>
        </form>
    )
}
export default LoginForm;