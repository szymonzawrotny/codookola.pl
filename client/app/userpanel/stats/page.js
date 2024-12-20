"use client"
import { useState, useEffect, useRef} from 'react';
import dynamic from 'next/dynamic';
import "@/styles/userpanel/stats.scss"
import { TbView360 } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { MdBookmarkBorder } from "react-icons/md";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ViewChart = dynamic(()=>import('@/components/userpanel/ViewChart'),{ssr:false})

const Home = ()=>{

    const router = useRouter();
    const [views,setViews] = useState(0);
    const [likes,setLikes] = useState(0);
    const [save,setSave] = useState(0);

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }

    })

    const fetchData = async ()=>{

        const response = await fetch("http://localhost:5000/stats",{
        method:"POST",
        body: JSON.stringify({
            id: session?.user?.email?.id
        }),
        headers:{
            "Content-Type": "application/json"
        }
        })

        if(!response.ok){
            console.log("coś nie poszło")
        } else {
            const data = await response.json();
            setViews(data.views)
            setLikes(data.likes)
            setSave(data.save)
        }
    }

    useEffect(()=>{
        [...document.querySelectorAll(".option")].forEach((one,index)=>{
            if(index == 2) one.classList.add("active");
            else one.classList.remove("active");
        })

        fetchData();
    },[])


    return(
        <div className="stats">
            <div className="chartButtons">
                <div 
                    data-option="view"
                    className="chartButton active">
                        <span className='title'>Wyświetlenia</span>
                        <span className='number'>{views}</span>
                        <TbView360 />
                        <div className="buttonWave">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#4169e1" fillOpacity="1" d="M0,32L24,42.7C48,53,96,75,144,101.3C192,128,240,160,288,186.7C336,213,384,235,432,224C480,213,528,171,576,170.7C624,171,672,213,720,208C768,203,816,149,864,122.7C912,96,960,96,1008,96C1056,96,1104,96,1152,85.3C1200,75,1248,53,1296,48C1344,43,1392,53,1416,58.7L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
                        </div>
                </div>
                <div 
                    data-option="like"
                    className="chartButton">
                        <span className='title'>Polubienia</span>
                        <span className='number'>{likes}</span>
                        <FaRegHeart/>
                        <div className="buttonWave">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#4169e1" fillOpacity="1" d="M0,32L24,42.7C48,53,96,75,144,101.3C192,128,240,160,288,186.7C336,213,384,235,432,224C480,213,528,171,576,170.7C624,171,672,213,720,208C768,203,816,149,864,122.7C912,96,960,96,1008,96C1056,96,1104,96,1152,85.3C1200,75,1248,53,1296,48C1344,43,1392,53,1416,58.7L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
                        </div>
                </div>
                <div 
                    data-option="save"
                    className="chartButton">
                        <span className='title'>Zapisania</span>
                        <span className='number'>{save}</span>
                        <MdBookmarkBorder />
                        <div className="buttonWave">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#4169e1" fillOpacity="1" d="M0,32L24,42.7C48,53,96,75,144,101.3C192,128,240,160,288,186.7C336,213,384,235,432,224C480,213,528,171,576,170.7C624,171,672,213,720,208C768,203,816,149,864,122.7C912,96,960,96,1008,96C1056,96,1104,96,1152,85.3C1200,75,1248,53,1296,48C1344,43,1392,53,1416,58.7L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
                        </div>
                </div>
            </div>
            <div className="chart">
                <div className="containerChart">
                    <ViewChart/>
                </div>
            </div>
        </div>
    )
}
export default Home;