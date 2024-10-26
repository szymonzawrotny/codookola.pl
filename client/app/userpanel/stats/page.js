"use client"
import { useState, useEffect, useRef} from 'react';
import dynamic from 'next/dynamic';
import "@/styles/userpanel/stats.scss"
import { TbView360 } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { MdBookmarkBorder } from "react-icons/md";

const LikeChart = dynamic(()=>import("@/components/userpanel/LikeChart"),{ssr:false});
const SaveChart = dynamic(()=>import('@/components/userpanel/SaveChart'),{ssr:false});
const ViewChart = dynamic(()=>import('@/components/userpanel/ViewChart'),{ssr:false})

const Home = ()=>{

    useEffect(()=>{
        [...document.querySelectorAll(".option")].forEach((one,index)=>{
            if(index == 2) one.classList.add("active");
            else one.classList.remove("active");
        })
    },[])

    const [component,setComponent] = useState(<ViewChart/>);
    const [headerText,setHeaderText] = useState("Wyświetlenia")

    const likeRef = useRef();
    const saveRef = useRef();
    const viewRef = useRef();

    const handleButton = (e)=>{

        const buttons = [...document.querySelectorAll(".chartButton")]

        buttons.forEach(one=>{
        one.classList.remove("active");
        })

        const option = e.target.getAttribute("data-option");

        switch(option){
        case "like": {
            setComponent(<LikeChart/>)
            setHeaderText("Polubienia")
            likeRef.current.classList.add("active")
        } break;
        case "save": {
            setComponent(<SaveChart/>)
            setHeaderText("Zapisania")
            saveRef.current.classList.add("active")
        } break;
        case "view":{
            setComponent(<ViewChart/>)
            setHeaderText("Wyświetlenia")
            viewRef.current.classList.add("active")
        } break;
        }
    }

    return(
        <div className="stats">
            <div className="chartButtons">
                <div 
                    onClick={handleButton}
                    data-option="view"
                    ref={viewRef}
                    className="chartButton active">
                        <span>Wyświetlenia</span>
                        <TbView360 />
                </div>
                <div 
                    onClick={handleButton}
                    data-option="like"
                    ref={likeRef}
                    className="chartButton">
                        <span>Polubienia</span>
                        <FaRegHeart/>
                </div>
                <div 
                    onClick={handleButton}
                    data-option="save"
                    ref={saveRef}
                    className="chartButton">
                        <span>Zapisania</span>
                        <MdBookmarkBorder />
                </div>
            </div>
            <div className="chart">
                <header>{headerText}</header>
                {component}
            </div>
        </div>
    )
}
export default Home;