import { useState, useRef, useEffect } from 'react';

import { SlOptions } from "react-icons/sl";
import { FaRegUserCircle,FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { MdReportGmailerrorred } from "react-icons/md";
import Image from 'next/image';

import SwiperBox from "./SwiperBox";
import "@/styles/mapPage/interface/panels/event.scss";

const Event = ({handleButton,handleLike,isLike,handleSave,save,eventInfo})=>{

    const ref = useRef();

    const handleOptions = (e)=>{
        ref.current.classList.toggle("active"); 
    }

    const handleReport = ()=>{
        console.log("zgłoszono!")
    }


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

    useEffect(()=>{
        fetchIcon();
    },[])

    return(
        <div className="event">
            <div className="options" onClick={handleOptions} ref={ref}>
                <SlOptions size={28}/>
                <div className="optionsPanel" onClick={handleReport}>
                    <MdReportGmailerrorred/>zgłoś
                </div>
            </div>
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
                <SwiperBox/>
            </div>
            <div className="title">
                <span>{eventInfo.nazwa}</span>
            </div>
            <div className="buttons">
                <div className="like" onClick={handleLike} id={eventInfo.event_id}>
                    {isLike ? <FaHeart className='liked'/> : <FaRegHeart className='noLiked'/>}
                </div>
                <div className="save" onClick={handleSave} id={eventInfo.event_id}>
                    {save? <FaBookmark style={{color:"lightgreen"}}/> : <FaRegBookmark style={{color:"#222"}}/>}
                </div>
                <button 
                    className="check" 
                    onClick={()=>handleButton(eventInfo.nazwa,eventInfo.author_email,eventInfo.opis,eventInfo.event_id,isLike,save)}>
                        sprawdź
                </button>
            </div>
        </div>
    )
}
export default Event;