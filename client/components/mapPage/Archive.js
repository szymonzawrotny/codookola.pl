"use client"
import { useState, useEffect } from 'react';
import "@/styles/mapPage/interface/panels/archive.scss"
import { HiMagnifyingGlass } from "react-icons/hi2";
import EventCompleted from './EventCompleted';

const Archive = ({handleButton})=>{

    const [list,setList] = useState([]);
    const [tab,setTab] = useState([]);

    const handleSort = (e)=>{
        const value = e.target.value;

        const newTab = list.filter(one=>{
            return one.nazwa.toLowerCase().includes(value)
        })

        setTab(newTab)
    }

    const fetchEventsCompleted = async ()=>{
        const response = await fetch("http://localhost:5000/geteventscompleted")
        const data = await response.json();
        setList(data)
        setTab(data)
    }

    useEffect(()=>{
            fetchEventsCompleted();
        },[])

    const elements = tab.map((one,index)=>{
        return <EventCompleted eventInfo={one} key={index}/>
    });

    return(
        <div className="Archive">
            <div className="search">
                <div className='input'>
                    <input 
                        type="text" 
                        //onChange={handleSort}
                        placeholder='Wpisz wydarzenie...' ></input>
                    <HiMagnifyingGlass />
                </div>
                <div className="sectionName">
                    <span>archiwum</span>
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
export default Archive;