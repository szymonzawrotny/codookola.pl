"use client"
import "@/styles/homePage/leftPanel.scss";
import { MdArrowDropDown } from "react-icons/md";

const LeftPanel = ({handleClickPanel})=>{

    const handleScrollDown = ()=>{
        window.scrollTo({
            top:document.documentElement.scrollHeight,
            behavior: "smooth"
        })
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
                <div className="login move" onClick={handleClickPanel}>sign in</div>
                <div className="register" onClick={handleClickPanel}>sign up</div>
            </div>
            <div className="active"></div>
        </div>
    )
}
export default LeftPanel;