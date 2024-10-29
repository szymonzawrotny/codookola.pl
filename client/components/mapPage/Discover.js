import { useState, useEffect} from 'react';
import "@/styles/mapPage/interface/panels/discover.scss"
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSession } from 'next-auth/react'

import Event from "./Event";

const Discover = ({handleButton})=>{

    const {data:session} = useSession({
        required: false,
    })

    const [eventList,setEventList] = useState([]);
    const [likeList,setLikeList] = useState([]);
    const [saveList,setSaveList] = useState([]);

    const fetchData = async () =>{
        const result = await fetch("http://localhost:5000/api")
        .then(response => response.json())
        .then(data=>setEventList(data));
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
            userId: session.user.email.id,
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
            userId: session.user.email.id,
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

    useEffect(()=>{
        fetchData();
        fetchLikeList();
        fetchSaveList();
    },[]);

    const elements = eventList.map((one,index)=>{

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
                author={one.author_email}
                desc={one.opis}
                handleButton={handleButton}
                name={one.nazwa}
                handleLike={handleLike}
                isLike={isLike}
                handleSave={handleSave}
                save={isSave}
                id={one.event_id}
                />
    })

    return(
        <div className="discover">
            <div className="search">
                <div className='input'>
                    <input type="text" placeholder='Wpisz wydarzenie...'></input>
                    <HiMagnifyingGlass />
                </div>
                <div className='sort'>
                    <select className='type'>
                        <option>Wszystkie</option>
                        <option>Kultura</option>
                        <option>Sport</option>
                        <option>Koncert</option>
                        <option>Festiwal</option>
                    </select>
                    <select className='date'>
                        <option>Popularne</option>
                        <option>Już zaraz!</option>
                    </select>
                </div>
            </div>
            <div className="eventList">
                {elements}
            </div>
        </div>
    )
}
export default Discover;