"use client"
import {useState, useEffect, useRef} from 'react';
import { IoMdArrowDropup } from "react-icons/io";
import "@/styles/rankingPage/rankingPage.scss"
import { FaRegEye, FaRegHeart, FaRegBookmark,FaRegUserCircle } from "react-icons/fa";
import Image from 'next/image';

const Home = ()=>{

    const topRef = useRef();
    const [users,setUsers] = useState([])
    const [iconPath,setIconPath] = useState(false)
    const [iconPath2,setIconPath2] = useState(false)
    const [iconPath3,setIconPath3] = useState(false)

     const handleScroll = () => {
        const value = window.scrollY;
        const title = document.querySelector(".title");
        const box = document.querySelector(".toUp");
        const users = [...document.querySelectorAll(".user")];
        
        let scrollStep = 75;

        const rotateValue = value / 15;
        title.style.transform = `rotate(${rotateValue}deg)`;

        users.forEach((user, index) => {
            if (value > (index * scrollStep) + 50) {
                if (!user.classList.contains("active")) {
                    user.classList.add("active");
                }
            }
        });

        const docHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        if (value + windowHeight >= docHeight) {
            users.forEach(user => {
                if (!user.classList.contains("active")) {
                    user.classList.add("active");
                }
            });
        }
        
        if (value > 500) box.classList.add("active");
        else box.classList.remove("active");
    };

    const handleToUp = ()=>{
        window.scrollTo(0,0);
    }

    const fetchData = async () => {
        const result = await fetch("http://localhost:5000/rankingList")
            .then(response => response.json())
            .then(data => {
                setUsers(data);

                for (let index = 0; index < data.length && index < 3; index++) {
                    const one = data[index];

                    if (one.path === "brak") 
                        continue; 
        
                    if (index === 0) setIconPath2(`http://localhost:5000${one.path}`);
                    else if (index === 1) setIconPath(`http://localhost:5000${one.path}`);
                    else if (index === 2) setIconPath3(`http://localhost:5000${one.path}`);
                }
            });
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        fetchData();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const elements = users.map((one,index)=>{
        if(index>2){
            return(
                <div className="user" key={index}>
                    <span>{index+4}.</span>
                    {one.email}
                    <div className="space"></div>
                    <div className="views">{one.views}</div>
                    <div className="likes">{one.likes}</div>
                    <div className="saves">{one.save}</div>
                </div>
            )
        }
    })

    return(
        <div className="rankingPage">
            <div className="title">ranking</div>
            <div className="title2">top 25</div>
            <div className="top" ref={topRef}>
                <div className="top2 bar" data-email={users[1]?.email}>
                    <div className="icon">
                        {iconPath ? <div className="userIcon"><Image
                            src={iconPath} 
                            alt="siema"
                            width="1920" 
                            height="1080"/></div> : <FaRegUserCircle />}
                    </div>
                    2
                </div>
                <div className="top1 bar" data-email={users[0]?.email}>
                    <div className="icon">
                        {iconPath2 ? <div className="userIcon"><Image
                            src={iconPath2} 
                            alt="siema"
                            width="1920" 
                            height="1080"/></div> : <FaRegUserCircle />}
                    </div>
                    1
                </div>
                <div className="top3 bar" data-email={users[2]?.email}>
                    <div className="icon">
                        {iconPath3 ? <div className="userIcon"><Image
                            src={iconPath3} 
                            alt="siema"
                            width="1920" 
                            height="1080"/></div> : <FaRegUserCircle />}
                    </div>
                    3
                </div>
            </div>
            <div className="ranking">
                <div className="legend">
                    <div className="userLegend">Nazwa użytkownika:</div>
                    <div className="space"></div>
                    <div className="viewsLegend"><FaRegEye /></div>
                    <div className="likeLegend"><FaRegHeart /></div>
                    <div className="saveLegend"><FaRegBookmark /></div>
                </div>
                <div className="container">
                    {elements}
                    <div className="toUp" onClick={handleToUp}> <IoMdArrowDropup/> </div>
                </div>
            </div>
        </div>
    )
}
export default Home;