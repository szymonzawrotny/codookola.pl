import { useState } from 'react';

import { SlOptions } from "react-icons/sl";
import { FaRegUserCircle,FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import SwiperBox from "./SwiperBox";

const Event = ({author,name,handleButton,desc,handleLike,isLike,id,handleSave,save})=>{

    return(
        <div className="event">
            <div className="options"><SlOptions size={28}/></div>
            <div className="userData">
                <div className="icon"><FaRegUserCircle/></div>
                <div className="name">{author}</div>
            </div>
            <div className="photos">
                <SwiperBox/>
            </div>
            <div className="title">
                <span>{name}</span>
            </div>
            <div className="buttons">
                <div className="like" onClick={handleLike} id={id}>
                    {isLike ? <FaHeart style={{color:"red"}}/> : <FaRegHeart style={{color:"#222"}}/>}
                </div>
                <div className="save" onClick={handleSave} id={id}>
                    {save? <FaBookmark style={{color:"lightgreen"}}/> : <FaRegBookmark style={{color:"#222"}}/>}
                </div>
                <button 
                    className="check" 
                    onClick={()=>handleButton(name,author,desc,id)}>
                        sprawdź
                </button>
            </div>
        </div>
    )
}
export default Event;