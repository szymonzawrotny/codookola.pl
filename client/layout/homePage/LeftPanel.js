"use client"
import "@/styles/homePage/leftPanel.scss";
import { MdArrowDropDown } from "react-icons/md";

const LeftPanel = ()=>{

    const handleClickPanel = (e)=>{
        const activePanel = document.querySelector(".active");
        const login = document.querySelector(".login");
        const register = document.querySelector(".register");

        if(e.target.textContent == "login"){
            activePanel.classList.remove("move");
            register.classList.remove("move");
            login.classList.add("move");
        } else if(e.target.textContent == "register"){
            activePanel.classList.add("move");
            register.classList.add("move");
            login.classList.remove("move");
        }
    }

    const handleScrollDown = ()=>{
        window.scrollTo({
            top:document.documentElement.scrollHeight,
            behavior: "smooth"
        })
        console.log("siemka");
    }

    return(
        <div className="leftPanel">
            <div className="mobileLogo">codookola.pl</div>
            <div className="mobileHeader1">Dołącz do nas,</div>
            <div className="mobileHeader2">odkrywaj wydarzenia!</div>
            <div className="scrollButton" onClick={handleScrollDown}>
                <MdArrowDropDown size={72} style={{color:"#222"}} />
            </div>
            <div className="linePanel"></div>
            <div className="linePanel"></div>
            <div className="linePanel"></div>
            <div className="linePanel"></div>
            <div className="buttons">
                <div className="login move" onClick={handleClickPanel}>login</div>
                <div className="register" onClick={handleClickPanel}>register</div>
            </div>
            <div className="active"></div>
        </div>
    )
}
export default LeftPanel;