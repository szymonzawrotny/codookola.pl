'use client'
import { useState } from 'react';
import "./style.scss"

import LeftPanel from '@/layout/homePage/LeftPanel';
import RightPanel from "@/layout/homePage/RightPanel";

const Home = ()=>{

    const [headerText,setHeaderText] = useState("zaloguj");

    const handleClickPanel = (e)=>{
        const activePanel = document.querySelector(".active");
        const login = document.querySelector(".login");
        const register = document.querySelector(".register");

        if(e.target.textContent == "sign in"){
            activePanel.classList.remove("move");
            register.classList.remove("move");
            login.classList.add("move");
            setHeaderText("zaloguj");
        } else if(e.target.textContent == "sign up"){
            activePanel.classList.add("move");
            register.classList.add("move");
            login.classList.remove("move");
            setHeaderText("zarejestruj");
        }
    }

    return(
        <div className="home">
            <LeftPanel handleClickPanel={handleClickPanel}/>
            <RightPanel headerText={headerText}/>
            <div className="loginAlert hidden">Konto zostało utworzone!</div>
        </div>
    )
}
export default Home;