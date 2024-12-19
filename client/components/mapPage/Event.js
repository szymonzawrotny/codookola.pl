import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react'

import { SlOptions } from "react-icons/sl";
import { FaRegUserCircle,FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { MdReportGmailerrorred } from "react-icons/md";
import Image from 'next/image';

import SwiperBox from "./SwiperBox";
import "@/styles/mapPage/interface/panels/event.scss";

const Event = ({handleButton,handleLike,isLike,handleSave,save,eventInfo})=>{

    const {data:session} = useSession({
        required: false,
    })

    const ref = useRef();

    const handleOptions = (e)=>{
        ref.current.classList.toggle("active"); 
    }

    const handleReport = async ()=>{
        if(session){
            console.log("zgłoszono!")
            const response = await fetch("http://localhost:5000/addreport",{
                method: "POST",
                body: JSON.stringify({
                    id: session?.user?.email?.id,
                    eventId: eventInfo.event_id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(response.ok)console.log("dodano")
            else console.log("coś nie poszło")
        } else {
            console.log("musisz sie zalogować")
        }
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

    const [path,setPath] = useState("http://localhost:5000/uploads/default.jpg");
    const [path2,setPath2] = useState("http://localhost:5000/uploads/default.jpg");
    const [path3,setPath3] = useState("http://localhost:5000/uploads/default.jpg");

    useEffect(()=>{
        fetchIcon();
        setPath(`http://localhost:5000${eventInfo.photo_path}`)
        setPath2(`http://localhost:5000${eventInfo.photo_path2}`)
        setPath3(`http://localhost:5000${eventInfo.photo_path3}`)
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
                <SwiperBox path={path} path2={path2} path3={path3}/>
            </div>
            <div className="title">
                <span>{eventInfo.nazwa}</span>
            </div>
            <div className="buttons">
                {session ? <div className="like" onClick={handleLike} id={eventInfo.event_id}>
                    {isLike ? <FaHeart className='liked'/> : <FaRegHeart className='noLiked'/>}
                </div> : null}
                {session ? <div className="save" onClick={handleSave} id={eventInfo.event_id}>
                    {save? <FaBookmark style={{color:"lightgreen"}}/> : <FaRegBookmark style={{color:"#222"}}/>}
                </div> : null}
                <button 
                    className="check" 
                    onClick={()=>handleButton(eventInfo.nazwa,eventInfo.author_email,eventInfo.opis,eventInfo.event_id,eventInfo)}>
                        sprawdź
                </button>
            </div>
        </div>
    )
}
export default Event;