"use client"
import {useEffect, useState} from 'react';
import "@/styles/mapPage/interface/panels/details.scss"
import { FaRegUserCircle,FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import SwiperBox from "./SwiperBox";
import { useSession } from 'next-auth/react'

const General = ({desc})=> <div><p>{desc}</p></div>
const Opinions = ()=> <div>opinie</div>
const Info = ()=> <div>info</div>

const Details = ({title,author,desc,id})=>{

    const {data:session} = useSession({
        required: false,
    })

    const [component,setComponent] = useState(<General desc={desc}/>)
    const [like, setLike] = useState(false);
    const [save, setSave] = useState(false);


    const handleDetails = (e)=>{
        const value = e.target.getAttribute("data-component");

        [...document.querySelectorAll("nav.detailsNav>.option")].forEach(one=>{
            one.classList.remove("active");
        })
        e.target.classList.add("active");

        switch(value){
            case "general": {
                setComponent(<General desc={desc}/>)
            } break;
            case "info": {
                setComponent(<Info/>)
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

    useEffect(()=>{
        setComponent(<General desc={desc}/>)
        fetchLikes();
        fetchSaves();
    },[desc])

    return(
        <div className="details">
            <div className="mainPhoto">
                <SwiperBox/>
            </div>
            <h1>{title}</h1>
            <h2>{author}</h2>
            <div className="detailButtons">
                <div className="like" onClick={handleLike} id={id}>
                   {like ? <FaHeart style={{color:"red"}}/> : <FaRegHeart style={{color:"#222"}}/>}
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
                        ogólne</div>
                <div 
                    className="option"
                    onClick={handleDetails}
                    data-component="info">
                        informacje</div>
                <div 
                    className="option" 
                    onClick={handleDetails}
                    data-component="opinions">
                        opinie</div>
            </nav>
            <div className="detailsMain">
                {component}
            </div>
        </div>
    )
}
export default Details; 