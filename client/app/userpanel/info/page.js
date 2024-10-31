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
                userinfo
            </div>
            <aside>
                <div className="infoChart">
                    <InfoChart/>
                </div>
                <div className="describe">desc</div>
            </aside>
        </div>
    )
}
export default Home;