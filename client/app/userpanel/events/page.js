"use client"
import { useState, useEffect, useRef} from 'react';

const Home = ()=>{
    useEffect(()=>{
        [...document.querySelectorAll(".option")].forEach((one,index)=>{
            if(index == 3) one.classList.add("active");
            else one.classList.remove("active");
        })
    },[])

    return(
        <div>events</div>
    )
}
export default Home;