'use client'
import { useState } from 'react';
import "./style.scss"

import LeftPanel from "@/layout/homePage/LeftPanel";
import RightPanel from "@/layout/homePage/RightPanel";

const Home = ()=>{

    const [headerText,setHeaderText] = useState("login");

    const handleClickPanel = (e)=>{
        const activePanel = document.querySelector(".active");
        const login = document.querySelector(".login");
        const register = document.querySelector(".register");

        if(e.target.textContent == "login"){
            activePanel.classList.remove("move");
            register.classList.remove("move");
            login.classList.add("move");
            setHeaderText("login");
        } else if(e.target.textContent == "register"){
            activePanel.classList.add("move");
            register.classList.add("move");
            login.classList.remove("move");
            setHeaderText("register");
        }
    }

    return(
        <div className="home">
            <LeftPanel handleClickPanel={handleClickPanel}/>
            <RightPanel headerText={headerText}/>
        </div>
    )
}
export default Home;