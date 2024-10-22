import { useState, useEffect} from 'react';
import "@/styles/mapPage/interface/panels/discover.scss"
import { HiMagnifyingGlass } from "react-icons/hi2";

import Event from "./Event";

const Discover = ()=>{

    const [eventList,setEventList] = useState([]);

    const fetchData = async () =>{
        const result = await fetch("http://localhost:5000/api")
        .then(response => response.json())
        .then(data=>setEventList(data));
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const elements = eventList.map((one,index)=>{
        return <Event
                author={one.author_id}
                name={one.nazwa}
                />
    })

    return(
        <div className="discover">
            <div className="search">
                <div className='input'>
                    <input type="text"></input>
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