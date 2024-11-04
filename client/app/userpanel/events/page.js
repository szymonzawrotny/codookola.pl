"use client"
import { useState, useEffect, useRef} from 'react';
import "@/styles/userpanel/events.scss"
import { IoIosArrowDown } from "react-icons/io";

const Home = ()=>{
    useEffect(()=>{
        [...document.querySelectorAll(".option")].forEach((one,index)=>{
            if(index == 3) one.classList.add("active");
            else one.classList.remove("active");
        })
    },[])

    const handleEventElement = (e)=>{
        [...document.querySelectorAll(".event")].forEach((one,index)=>{
            one.classList.remove("active");
        })
        e.target.classList.add("active")
    }

    return(
        <div className='events'>
            <div className="eventsOption">siema</div>
            <div className="eventsList">
                <h1>Twoje wydarzenia</h1>
                <div className="eventsContainer">
                    <div className="event" onClick={handleEventElement}>
                        <span>1. Przykładowy tekst coś tam <IoIosArrowDown /></span>
                        <div className="eventButtons">
                            <div className="show">show</div>
                            <div className="edit">edit</div>
                            <div className="delete">delete</div>
                        </div>
                    </div>
                    <div className="event" onClick={handleEventElement}>
                        <span>1. Przykładowy tekst coś tam <IoIosArrowDown /></span>
                        <div className="eventButtons">
                            <div className="show">show</div>
                            <div className="edit">edit</div>
                            <div className="delete">delete</div>
                        </div>
                    </div>
                    <div className="event" onClick={handleEventElement}>
                        <span>1. Przykładowy tekst coś tam <IoIosArrowDown /></span>
                        <div className="eventButtons">
                            <div className="show">show</div>
                            <div className="edit">edit</div>
                            <div className="delete">delete</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;