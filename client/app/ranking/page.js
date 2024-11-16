"use client"
import {useState, useEffect, useRef} from 'react';
import { IoMdArrowDropup } from "react-icons/io";
import "@/styles/rankingPage/rankingPage.scss"
import { FaRegEye, FaRegHeart, FaRegBookmark } from "react-icons/fa";

const Home = ()=>{

    const topRef = useRef();
    const [users,setUsers] = useState([
        "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
    ])

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

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const elements = users.map((one,index)=>{
        return(
            <div className="user" key={index}>
                <span>{index+4}.</span>
                siemano
                <div className="space"></div>
                <div className="views">26</div>
                <div className="likes">26</div>
                <div className="saves">37</div>
            </div>
        )
    })

    return(
        <div className="rankingPage">
            <div className="title">ranking</div>
            <div className="title2">top 50</div>
            <div className="top" ref={topRef}>
                <div className="top2 bar">2</div>
                <div className="top1 bar">1</div>
                <div className="top3 bar">3</div>
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