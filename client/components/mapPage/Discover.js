import { useState, useEffect, useRef} from 'react';
import "@/styles/mapPage/interface/panels/discover.scss"
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSession } from 'next-auth/react'

import Event from "./Event";

const Discover = ({handleButton,})=>{

    const {data:session} = useSession({
        required: false,
    })

    const [eventList,setEventList] = useState([]);
    const [likeList,setLikeList] = useState([]);
    const [saveList,setSaveList] = useState([]);
    const [lat, setLat] = useState(53.56317881922556);
    const [lng, setLng] = useState(20.99479282831869);

    const [tab,setTab] = useState([]);
    const [eventType,setEventType] = useState("wszystkie")
    const inputRef = useRef();

    const fetchData = async () =>{
        try {
            const response = await fetch("http://localhost:5000/api");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setEventList(data);
            setTab(data);
        } catch (error) {
            console.error("Error fetching data:", error);
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

    const handleDistance = async (e) => {
        const value = e.target.value;

        let maxDistance;
        if (value === "<50") {
            maxDistance = 50;
        } else if (value === "<100") {
            maxDistance = 100;
        } else if (value === "<150") {
            maxDistance = 150;
        } else if (value === ">150") {
            maxDistance = Infinity;
        }

        const filteredEvents = eventList.filter(event => {
            const distance = getDistanceFromCords(lat, lng, event.lat, event.lng);
            return distance <= maxDistance;
        });

        setTab(filteredEvents);
    };

    const getDistanceFromCords = (lat1,lng1,lat2,lng2) =>{
        const deg2rad = (deg)=> deg*(Math.PI/180);

        let R = 6371 //promień ziemi w km
        let dLat = deg2rad(lat2-lat1);
        let dLng = deg2rad(lng2-lng1);

        let a = Math.sin(dLat/2) * Math.sin(dLat) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng/2) * Math.sin(dLng/2)

        let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
        let d = R * c; //dystans w km

        return d;
    }

    const handleSort = async (e) => {
        const value = e?.target?.value?.toLowerCase()?.trim() || "";

        const newTab = eventList.filter(one => 
            one.nazwa.toLowerCase().includes(value) &&
            (eventType === "wszystkie" || one.rodzaj === eventType)
        );

        setTab(newTab.length > 0 ? newTab : []);
    };

    useEffect(()=>{
        fetchData();
        fetchLikeList();
        fetchSaveList();

        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        }, (error) => {
            console.log("error getting location " + error.message);
            setLat(53.56317881922556);
            setLng(20.99479282831869);
        });
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
                    <select className='date' onChange={handleDistance}>
                        <option value=">150">powyżej 150km</option>
                        <option value="<150">100-150km</option>
                        <option value="<100">50-100km</option>
                        <option value="<50">poniżej 50km</option>
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