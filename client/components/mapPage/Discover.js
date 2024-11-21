import { useState, useEffect, useRef} from 'react';
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

    const [tab,setTab] = useState([]);
    const [eventType,setEventType] = useState("wszystkie")
    const inputRef = useRef();

    const fetchData = async () =>{
        const result = await fetch("http://localhost:5000/api")
        .then(response => response.json())
        .then(data=>{
            setEventList(data) 
            setTab(data)
        });
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

    const handleEventType = async (e)=>{
        const value = e.target.value;
        setEventType(value)

        inputRef.current.value = ""

        if(value=="wszystkie"){
            setTab(eventList)
        } else {
            const newTab = eventList.filter(one=>{
                return (one.rodzaj == value )
            })

            setTab(newTab)
        }
    }

    const handleSort = async (e)=>{

        const value = e.target.value.toLowerCase();

        if(value === "" || value === " " || value == null){
            if(eventType=="wszystkie"){
                setTab(eventList)
            } else {
                const newTab = eventList.filter(one=>{
                    return (one.rodzaj == eventType )
                })

                setTab(newTab)
            }
        } else {
            if(eventType=="wszystkie"){
                const newTab = eventList.filter(one=>{
                    return one.nazwa.toLowerCase().includes(value)
                })

                setTab(newTab)
            } else {
                const newTab = eventList.filter(one=>{
                    return one.nazwa.toLowerCase().includes(value) && (one.rodzaj == eventType)
                })

                setTab(newTab)
            }
        }

    }

    useEffect(()=>{
        fetchData();
        fetchLikeList();
        fetchSaveList();
    },[]);

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
    })

    return(
        <div className="discover">
            <div className="search">
                <div className='input'>
                    <input 
                        type="text" 
                        placeholder='Wpisz wydarzenie...' 
                        ref={inputRef}
                        onChange={handleSort}></input>
                    <HiMagnifyingGlass />
                </div>
                <div className='sort'>
                    <select className='type' onChange={handleEventType}>
                        <option value="wszystkie">Wszystkie</option>
                        <option value="kultura">Kultura</option>
                        <option value="sport">Sport</option>
                        <option value="koncert">Koncert</option>
                        <option value="festiwal">Festiwal</option>
                        <option value="naukowe">Naukowe</option>
                        <option value="imprezka">Imprezka</option>
                    </select>
                    <select className='date'>
                        <option>Popularne</option>
                        <option>Już zaraz!</option>
                    </select>
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
export default Discover;