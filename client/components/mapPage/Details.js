"use client"
import {useEffect, useState} from 'react';
import "@/styles/mapPage/interface/panels/details.scss"
import { FaRegUserCircle,FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FcBullish, FcCalendar } from "react-icons/fc";
import { RiOpenaiFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import SwiperBox from "./SwiperBox";
import { useSession } from 'next-auth/react'

import {General, Opinions, Chatbot} from './DetailsOptions';

const Details = ({title,author,desc,id})=>{

    const {data:session} = useSession({
        required: false,
    })

    const [component,setComponent] = useState(<General desc={desc}/>)
    const [like, setLike] = useState(false);
    const [save, setSave] = useState(false);
    const [address,setAddress] = useState("");
    const [city,setCity] = useState("");
    const [eventType,setEventType] = useState("");
    const [date,setDate] = useState("");


    const handleDetails = (e)=>{
        const value = e.target.getAttribute("data-component");

        [...document.querySelectorAll("nav.detailsNav>.option")].forEach(one=>{
            one.classList.remove("active");
        })
        e.target.classList.add("active");

        switch(value){
            case "general": {
                setComponent(<General desc={desc} address={address} city={city} date={date} eventType={eventType}/>)
            } break;
            case "chatbot": {
                setComponent(<Chatbot/>)
            } break;
            case "opinions": {
                setComponent(<Opinions/>)
            } break;
        }
    }

    const fetchLikes = async ()=>{
        setLike(false);

        const result = await fetch("http://localhost:5000/likes")
        .then(response => response.json())
        .then(data=>{
            const list = data;
            list.forEach(one=>{
                if(one.event_id === id && one.user_id === session?.user?.email?.id){
                    setLike(true);
                }
            })
        });
    }

    const fetchSaves = async ()=>{
        setSave(false);

        const result = await fetch("http://localhost:5000/save")
        .then(response => response.json())
        .then(data=>{
            const list = data;
            list.forEach(one=>{
                if(one.event_id === id && one.user_id === session?.user?.email?.id){
                    setSave(true);
                }

            })
        });
    }

    const handleLike = async (e)=>{

        setLike(!like)

        let eventId;
        if(e.target.tagName == "svg"){
            eventId = e.target.parentNode.id;
        } else if(e.target.tagName == "path"){
            eventId = e.target.parentNode.parentNode.id;
        }else {
            eventId = e.target.id;
        }

        const response = await fetch("http://localhost:5000/addlike",{
        method: "POST",
        body:JSON.stringify({
            userId: session.user.email.id,
            eventId
        }),
        headers: {
            "Content-Type": "application/json"
        }
        })

        if(response.ok){
            const data = await response.json();
        }
    }

    const handleSave = async (e)=>{

        setSave(!save)

        let eventId;
        if(e.target.tagName == "svg"){
            eventId = e.target.parentNode.id;
        } else if(e.target.tagName == "path"){
            eventId = e.target.parentNode.parentNode.id;
        }else {
            eventId = e.target.id;
        }

        const response = await fetch("http://localhost:5000/addSave",{
        method: "POST",
        body:JSON.stringify({
            userId: session.user.email.id,
            eventId
        }),
        headers: {
            "Content-Type": "application/json"
        }
        })

        if(response.ok){
            const data = await response.json();
        }
    }

    const fetchDetailInfo = async ()=>{
        const response = await fetch("http://localhost:5000/api")
        .then(response=>response.json())
        .then(data=>{
            data.forEach(one=>{
                if(id===one.event_id){
                    console.log(one.adres)
                    setAddress(one.adres)
                    setCity(one.miasto)
                    setDate(one.data)
                    setEventType(one.rodzaj)
                }
            })
        })
    }

    useEffect(()=>{
        fetchDetailInfo();
    },[])

    useEffect(()=>{
        fetchDetailInfo();
        setComponent(<General desc={desc} address={address} city={city} date={date} eventType={eventType}/>)
        fetchLikes();
        fetchSaves();
    },[desc,address])

    return(
        <div className="details">
            <div className="mainPhoto">
                <SwiperBox/>
            </div>
            <h1>{title}</h1>
            <h2>{author}</h2>
            <div className="detailButtons">
                <div className="like" onClick={handleLike} id={id}>
                   {like ? <FaHeart className='liked'/> : <FaRegHeart className='noLiked'/>}
                </div>
                <div className="save" onClick={handleSave} id={id}>
                    {save? <FaBookmark style={{color:"lightgreen"}}/> : <FaRegBookmark style={{color:"#222"}}/>}
                </div>
            </div>
            <nav className="detailsNav">
                <div 
                    className="option active" 
                    onClick={handleDetails}
                    data-component="general">
                        <FcCalendar style={{marginRight:"5px"}}/>ogólne</div>
                <div 
                    className="option"
                    onClick={handleDetails}
                    data-component="chatbot">
                        <RiOpenaiFill style={{marginRight:"5px"}}/>chatbot</div>
                <div 
                    className="option" 
                    onClick={handleDetails}
                    data-component="opinions">
                        <FcBullish style={{marginRight:"5px"}}/>opinie</div>
            </nav>
            <div className="detailsMain">
                {component}
            </div>
        </div>
    )
}
export default Details; 