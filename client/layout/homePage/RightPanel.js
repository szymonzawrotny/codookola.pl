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
            <div className="wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
                    <path fill="#FFE97F" fillOpacity="1" d="M0,96L60,117.3C120,139,240,181,360,170.7C480,160,600,96,720,96C840,96,960,160,1080,197.3C1200,235,1320,245,1380,250.7L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>
            </div>
            <div className="logo"></div>
            <div className="title">login</div>
            <form onSubmit={handleFormSend}>
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
            <footer>
                <span>sprawdź też</span>
                <div className="socials">
                    <a href="https://github.com/szymonzawrotny" target="_blank">
                        <div className="icon">
                            <FaGithub size={26} />
                        </div>
                    </a>
                    <a href="https://www.instagram.com/zawruto/" target="_blank">
                        <div className="icon">
                            <FaInstagramSquare size={26}/>
                        </div>
                    </a>
                    <a href="https://www.facebook.com/szymon.zawrotny/" target="_blank">
                        <div className="icon">
                            <FaFacebook size={26}/>
                        </div>
                    </a>
                </div>
                <div className="wave2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#FFE97F" fillOpacity="1" d="M0,224L48,240C96,256,192,288,288,256C384,224,480,128,576,80C672,32,768,32,864,53.3C960,75,1056,117,1152,144C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </footer>
        </div>
    )
}
export default RightPanel;