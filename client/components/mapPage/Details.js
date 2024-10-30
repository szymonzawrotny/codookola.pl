"use client"
import {useEffect, useState} from 'react';
import "@/styles/mapPage/interface/panels/details.scss"
import { FaRegUserCircle,FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import SwiperBox from "./SwiperBox";

const General = ({desc})=> <div><p>{desc}</p></div>
const Opinions = ()=> <div>opinie</div>
const Info = ()=> <div>info</div>

const Details = ({title,author,desc})=>{

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

    useEffect(()=>{
        setComponent(<General desc={desc}/>)
    },[desc])

    return(
        <div className="details">
            <div className="mainPhoto">
                <SwiperBox/>
            </div>
            <h1>{title}</h1>
            <h2>{author}</h2>
            <div className="detailButtons">
                <div className="like" onClick={()=>setLike(!like)}>
                   {like ? <FaHeart style={{color:"red"}}/> : <FaRegHeart style={{color:"#222"}}/>}
                </div>
                <div className="save" onClick={()=>setSave(!save)}>
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