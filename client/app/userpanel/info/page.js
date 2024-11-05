"use client"
import { useState, useEffect, useRef} from 'react';
import "@/styles/userpanel/info.scss"

import InfoChart from '@/components/userpanel/InfoChart';

const Home = ()=>{
    useEffect(()=>{
        [...document.querySelectorAll(".option")].forEach((one,index)=>{
            if(index == 1) one.classList.add("active");
            else one.classList.remove("active");
        })
    },[])

    return(
        <div className="info">
            <div className="userInfo">
                <div className="contentInfo">
                    <div className="dataInfo">dane</div>
                    <div className="adressInfo">adres</div>
                    <div className="photoInfo">fotka</div>
                    <div className="accessInfo">zgody</div>
                    <div className="settingsInfo">ustawienia</div>
                </div>
            </div>
            <aside>
                <div className="progressBar">
                    <div className="dot active">
                        <span>Dane</span>
                    </div>
                    <div className="dot">
                        <span>Adres</span>
                    </div>
                    <div className="dot">
                        <span>Zdjęcie profilowe</span>
                    </div>
                    <div className="dot">
                        <span>Zgody</span>
                    </div>
                    <div className="dot">
                        <span>Ustawienia</span>
                    </div>
                </div>
            </aside>
        </div>
    )
}
export default Home;