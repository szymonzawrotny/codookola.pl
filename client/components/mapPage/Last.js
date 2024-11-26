"use client"
import { useState, useEffect } from 'react';
import "@/styles/mapPage/interface/panels/last.scss"
import { useSession } from 'next-auth/react'
import { HiMagnifyingGlass } from "react-icons/hi2";
import Event from './Event';
import "@/styles/mapPage/interface/panels/event.scss";

const Login = ()=> <div className="Login">zaloguj</div>

const LastPanel = ({session,handleButton})=>{

    const [list,setList] = useState([]);
    const [tab,setTab] = useState([]);
    
    const [likeList,setLikeList] = useState([]);
    const [saveList,setSaveList] = useState([]);

    const fetchLastEvents = async ()=>{
        const response = await fetch("http://localhost:5000/views",{
            method: "POST",
            body: JSON.stringify({
                id: session?.user?.email?.id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.ok){
            const data = await response.json();
            setList(data.answer)
            setTab(data.answer)
        } else {
            console.log("coś nie poszło")
        }
    }

    const fetchLikeList = async ()=>{
        const result = await fetch("http://localhost:5000/likes")
        .then(response => response.json())
        .then(data=>setLikeList(data));
    }
    
    const fetchSaveList = async ()=>{
        const result = await fetch("http://localhost:5000/save")
        .then(response => response.json())
        .then(data=>setSaveList(data));
    }

    useEffect(()=>{
        fetchSaveList()
        fetchLikeList()
        fetchLastEvents();
    },[])

    const handleLike = async (e)=>{

        let eventId;
        if(e.target.tagName == "svg"){
            eventId = e.target.parentNode.id;
        } else if(e.target.tagName == "path"){
            eventId = e.target.parentNode.parentNode.id;
        }else {
            eventId = e.target.id;
        }

        const response = await fetch("http://localhost:5000/addlike",{
        method: "POST",
        body:JSON.stringify({
            userId: session?.user?.email?.id,
            eventId
        }),
        headers: {
            "Content-Type": "application/json"
        }
        })

        if(response.ok){
            const data = await response.json();
            fetchLikeList();
        }
    }

    const handleSave = async (e)=>{

        let eventId;
        if(e.target.tagName == "svg"){
            eventId = e.target.parentNode.id;
        } else if(e.target.tagName == "path"){
            eventId = e.target.parentNode.parentNode.id;
        }else {
            eventId = e.target.id;
        }

        const response = await fetch("http://localhost:5000/addSave",{
        method: "POST",
        body:JSON.stringify({
            userId: session?.user?.email?.id,
            eventId
        }),
        headers: {
            "Content-Type": "application/json"
        }
        })

        if(response.ok){
            const data = await response.json();
            fetchSaveList();
        }
    }

    const handleSort = (e)=>{
        const value = e.target.value;

        const newTab = list.filter(one=>{
            return one.nazwa.toLowerCase().includes(value)
        })

        setTab(newTab)
    }

    const elements = tab.map((one,index)=>{

        let isLike = false;
        let isSave = false;

        likeList.forEach(like=>{
            if(session?.user?.email?.id === like.user_id){
                if(one.event_id === like.event_id){
                    isLike = true;
                }
            }
        })

        saveList.forEach(save=>{
            if(session?.user?.email?.id === save.user_id){
                if(one.event_id === save.event_id){
                    isSave = true;
                }
            }
        })

        return <Event
                key={index}
                handleButton={handleButton}
                eventInfo={one}
                handleLike={handleLike}
                isLike={isLike}
                handleSave={handleSave}
                save={isSave}
                />
    });

    return(
        <div className="lastPanel">
            <div className="search">
                <div className='input'>
                    <input 
                        type="text" 
                        onChange={handleSort}
                        placeholder='Wpisz wydarzenie...' ></input>
                    <HiMagnifyingGlass />
                </div>
                <div className="sectionName">
                    <span>ostatnio przeglądane</span>
                </div>
            </div>
            <div className="eventList">
                {
                    elements.length >0 ? elements : <div className="empty">brak postów</div>
                }
            </div>
        </div>
    )
}

const Last = ({handleButton})=>{

    const {data:session} = useSession({
        required: false,
    })
    
    {
        if(session) return <LastPanel session={session} handleButton={handleButton}/>
        else return <Login/>
    }
}
export default Last;