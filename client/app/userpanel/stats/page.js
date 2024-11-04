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
                        <div className="buttonWave">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#4169e1" fill-opacity="1" d="M0,32L24,42.7C48,53,96,75,144,101.3C192,128,240,160,288,186.7C336,213,384,235,432,224C480,213,528,171,576,170.7C624,171,672,213,720,208C768,203,816,149,864,122.7C912,96,960,96,1008,96C1056,96,1104,96,1152,85.3C1200,75,1248,53,1296,48C1344,43,1392,53,1416,58.7L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
                        </div>
                </div>
                <div 
                    onClick={handleButton}
                    data-option="like"
                    ref={likeRef}
                    className="chartButton">
                        <span className='title'>Polubienia</span>
                        <span className='number'>128</span>
                        <FaRegHeart/>
                        <div className="buttonWave">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#4169e1" fill-opacity="1" d="M0,32L24,42.7C48,53,96,75,144,101.3C192,128,240,160,288,186.7C336,213,384,235,432,224C480,213,528,171,576,170.7C624,171,672,213,720,208C768,203,816,149,864,122.7C912,96,960,96,1008,96C1056,96,1104,96,1152,85.3C1200,75,1248,53,1296,48C1344,43,1392,53,1416,58.7L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
                        </div>
                </div>
                <div 
                    onClick={handleButton}
                    data-option="save"
                    ref={saveRef}
                    className="chartButton">
                        <span className='title'>Zapisania</span>
                        <span className='number'>37</span>
                        <MdBookmarkBorder />
                        <div className="buttonWave">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#4169e1" fill-opacity="1" d="M0,32L24,42.7C48,53,96,75,144,101.3C192,128,240,160,288,186.7C336,213,384,235,432,224C480,213,528,171,576,170.7C624,171,672,213,720,208C768,203,816,149,864,122.7C912,96,960,96,1008,96C1056,96,1104,96,1152,85.3C1200,75,1248,53,1296,48C1344,43,1392,53,1416,58.7L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
                        </div>
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