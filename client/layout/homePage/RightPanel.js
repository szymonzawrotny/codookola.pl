'use client'
import { useRouter } from "next/navigation";
import "@/styles/homePage/rightPanel.scss";

import { IoPersonCircleOutline } from "react-icons/io5";
import { FaUnlockAlt, FaGithub, FaInstagramSquare, FaFacebook } from "react-icons/fa";

const RightPanel = ()=>{

    const router = useRouter();

    const handleFormSend = (e)=>{
        e.preventDefault();
        console.log("siema");
        router.push("/map");
    }

    return(
        <div className="rightPanel">
            <div className="logo"></div>
            <div className="title">login</div>
            <form onSubmit={handleFormSend}>
                <div className="input">
                    <IoPersonCircleOutline size={42} style={{color:"#8c92ac"}}/>
                    <input type="text" placeholder="Email" />
                </div>
                <div className="input">
                    <FaUnlockAlt size={34} style={{color:"#8c92ac"}}/>
                    <input type="password" placeholder="Password"/>
                </div>
                <div className="down">
                    <span>Forgot Password?</span>
                    <input type="submit" value="LOGIN" />
                </div>
            </form>
            <footer>
                <span>sprwdź też</span>
                <div className="socials">
                    <a href="https://github.com/szymonzawrotny" target="_blank">
                        <div className="icon">
                            <FaGithub style={{marginRight:"5px"}} /> Github
                        </div>
                    </a>
                    <a href="https://www.instagram.com/zawruto/" target="_blank">
                        <div className="icon">
                            <FaInstagramSquare style={{marginRight:"5px"}}/> Instagram
                        </div>
                    </a>
                    <a href="https://www.facebook.com/szymon.zawrotny/" target="_blank">
                        <div className="icon">
                            <FaFacebook style={{marginRight:"5px"}}/> Facebook
                        </div>
                    </a>
                </div>
            </footer>
        </div>
    )
}
export default RightPanel;