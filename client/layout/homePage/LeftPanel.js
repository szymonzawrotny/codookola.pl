"use client"
import "@/styles/homePage/leftPanel.scss";

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

    return(
        <div className="leftPanel">
            <div className="linePanel"></div>
            <div className="linePanel"></div>
            <div className="linePanel"></div>
            <div className="linePanel"></div>
            <div className="buttons">
                <div className="login move" onClick={handleClickPanel}>login</div>
                <div className="register" onClick={handleClickPanel}>register</div>
            </div>
            <div className="active"></div>
            {/* <div className="logo">codOOkola.pl</div> */}
        </div>
    )
}
export default LeftPanel;