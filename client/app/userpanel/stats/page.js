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
            likeRef.current.classList.add("active")
        } break;
        case "save": {
            setComponent(<SaveChart/>)
            saveRef.current.classList.add("active")
        } break;
        case "view":{
            setComponent(<ViewChart/>)
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
                        <span className='title'>Wyświetlenia</span>
                        <span className='number'>256</span>
                        <TbView360 />
                </div>
                <div 
                    onClick={handleButton}
                    data-option="like"
                    ref={likeRef}
                    className="chartButton">
                        <span className='title'>Polubienia</span>
                        <span className='number'>128</span>
                        <FaRegHeart/>
                </div>
                <div 
                    onClick={handleButton}
                    data-option="save"
                    ref={saveRef}
                    className="chartButton">
                        <span className='title'>Zapisania</span>
                        <span className='number'>37</span>
                        <MdBookmarkBorder />
                </div>
            </div>
            <div className="chart">
                <div className="containerChart">
                    {component}
                </div>
            </div>
        </div>
    )
}
export default Home;