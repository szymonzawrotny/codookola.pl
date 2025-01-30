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

const Details = ({eventInfo,title,author,desc,id})=>{

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

    const [path,setPath] = useState("http://localhost:5000/uploads/default.jpg");
    const [path2,setPath2] = useState("http://localhost:5000/uploads/default.jpg");
    const [path3,setPath3] = useState("http://localhost:5000/uploads/default.jpg");


    const handleDetails = (e)=>{
        let value;

        [...document.querySelectorAll("nav.detailsNav>.option")].forEach(one=>{
            one.classList.remove("active");
        })

        if (e.target.tagName == "svg") {
            e.target.parentNode.classList.add("active");
            value = e.target.parentNode.getAttribute("data-component");
        } else if (e.target.tagName == "path") {
            e.target.parentNode.parentNode.classList.add("active");
            value = e.target.parentNode.parentNode.getAttribute("data-component");
        } else {
            e.target.classList.add("active");
            value = e.target.getAttribute("data-component");
        }

        switch(value){
            case "general": {
                setComponent(<General desc={desc} address={address} city={city} date={date} eventType={eventType}/>)
            } break;
            case "chatbot": {
                setComponent(<Chatbot/>)
            } break;
            case "opinions": {
                setComponent(<Opinions id={id}/>)
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
        setPath(`http://localhost:5000${eventInfo.photo_path}`)
        setPath2(`http://localhost:5000${eventInfo.photo_path2}`)
        setPath3(`http://localhost:5000${eventInfo.photo_path3}`)
    },[eventInfo])

    useEffect(()=>{
        fetchDetailInfo();
        setComponent(<General desc={desc} address={address} city={city} date={date} eventType={eventType}/>)
        fetchLikes();
        fetchSaves();
        setPath(`http://localhost:5000${eventInfo.photo_path}`)
        setPath2(`http://localhost:5000${eventInfo.photo_path2}`)
        setPath3(`http://localhost:5000${eventInfo.photo_path3}`)
    },[desc,address,eventInfo])

    return(
        <div className="details">
            <div className="mainPhoto">
                <SwiperBox path={path} path2={path2} path3={path3}/>
            </div>
            <h1>{title}</h1>
            <h2>{author}</h2>
            <div className="detailButtons">
                {session ? <div className="like" onClick={handleLike} id={id}>
                   {like ? <FaHeart className='liked'/> : <FaRegHeart className='noLiked'/>}
                </div> : null}
                {session ? <div className="save" onClick={handleSave} id={id}>
                    {save? <FaBookmark style={{color:"lightgreen"}}/> : <FaRegBookmark style={{color:"#222"}}/>}
                </div> : null}
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