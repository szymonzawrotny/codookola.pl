"use client"
import { useState, useEffect, useRef } from 'react'
import "@/styles/mapPage/interface/panels/eventcompleted.scss"
import { FaRegUserCircle,FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import Image from 'next/image';
import SwiperBox from "./SwiperBox";

const EventCompleted = ({eventInfo})=>{

    const ref = useRef();

    const [path,setPath] = useState("http://localhost:5000/uploads/default.jpg");
    const [path2,setPath2] = useState("http://localhost:5000/uploads/default.jpg");
    const [path3,setPath3] = useState("http://localhost:5000/uploads/default.jpg");

    const [isActive,setIsActive] = useState(false);

    const [iconPath,setIconPath] = useState(false)
    const fetchIcon = async ()=>{
        const response = await fetch("http://localhost:5000/icons")
        .then(response=>response.json())
        .then(data=>{
            data.forEach(one=>{
                if(one.user_id === eventInfo.author_id){
                    setIconPath(`http://localhost:5000${one.path}`)
                }
            })
        })
    }

    const setActive = ()=>{
        ref.current.classList.toggle("active")
        setIsActive(!isActive);
    }

    useEffect(()=>{
        fetchIcon();
        setPath(`http://localhost:5000${eventInfo.photo_path}`)
        setPath2(`http://localhost:5000${eventInfo.photo_path2}`)
        setPath3(`http://localhost:5000${eventInfo.photo_path3}`)
        console.log(eventInfo)
    },[])

    return(
        <div className="EventCompleted" ref={ref}>
            <div className="userData">
                <div className="icon">
                    {iconPath ? <div className="userIcon"><Image
                            src={iconPath} 
                            alt="siema"
                            width="1920" 
                            height="1080"/></div> : <FaRegUserCircle />}
                </div>
                <div className="name">{eventInfo.author_email}</div>
            </div>
            <div className="photos">
                <SwiperBox path={path} path2={path2} path3={path3}/>
            </div>
            <div className="title">
                <span>{eventInfo.nazwa}</span>
            </div>
            <div className="desc">
                {eventInfo.opis}
            </div>
            <div className="data">
                <p>{eventInfo.adres}</p>
                <p>{`${eventInfo.miasto}, ${eventInfo.kod_pocztowy}`}</p>
                <p>Rodzaj wydarzenia: {eventInfo.rodzaj}</p>
                <p>Wydarzenie odbyło się: {eventInfo.data}</p>
            </div>
            <div className="unroll" onClick={setActive}>
                {isActive ? <BiSolidUpArrow/> : <BiSolidDownArrow/>}
            </div>
        </div>
    )
}
export default EventCompleted