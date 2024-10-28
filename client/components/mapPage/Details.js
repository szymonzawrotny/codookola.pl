"use client"
import {useState} from 'react';
import "@/styles/mapPage/interface/panels/details.scss"
import { FaRegUserCircle,FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import SwiperBox from "./SwiperBox";

const General = ({desc})=> <div><p>{desc}</p></div>
const Opinions = ()=> <div>opinie</div>
const Info = ()=> <div>info</div>

const Details = ({title,author,desc})=>{

    const [component,setComponent] = useState(<General desc={desc}/>)

    const handleDetails = (e)=>{
        const value = e.target.getAttribute("data-component");

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

    return(
        <div className="details">
            <div className="mainPhoto">
                <SwiperBox/>
            </div>
            <h1>{title}</h1>
            <h2>{author}</h2>
            <div className="detailButtons">
                <div className="like">
                   <FaRegHeart style={{color:"#222"}}/>
                </div>
                <div className="save">
                    <FaRegBookmark style={{color:"#222"}}/>
                </div>
            </div>
            <nav className="detailsNav">
                <div 
                    className="option" 
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