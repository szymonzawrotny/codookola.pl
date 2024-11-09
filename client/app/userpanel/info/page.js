"use client"
import { useState, useEffect, useRef} from 'react';
import "@/styles/userpanel/info.scss"
import { GoPencil } from "react-icons/go";

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
            <div className="leftInfo">
                <div className="userData">dane</div>
                <div className="userAddress">adres</div>
            </div>
            <div className="rightInfo">
                <div className="userAvatar">
                    <div className="avatar">Tu twoja fotka</div>
                    <div className="editAvatar">
                        <GoPencil />
                    </div>
                    <div className="interest">
                        Choose ur main interest 
                        <select name="" id="">
                            <option value="koncerty">koncerty</option>
                            <option value="imprezy">imprezy</option>
                            <option value="naukowe">naukowe</option>
                        </select>
                    </div>
                </div>
                <div className="userAccess">zgody</div>
            </div>
        </div>
    )
}
export default Home;