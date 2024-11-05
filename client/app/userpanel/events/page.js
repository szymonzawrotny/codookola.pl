"use client"
import { useState, useEffect, useRef} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import "@/styles/userpanel/events.scss"
import { IoIosArrowDown } from "react-icons/io";

import EventListElement from '@/components/userpanel/EventListElement';

const Home = ()=>{

    const [eventList,setEventList] = useState([]);
    const router = useRouter();

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }

    })

    const fetchData = async () =>{
        const result = await fetch("http://localhost:5000/api")
        .then(response => response.json())
        .then(data=>{
            setEventList(data);
        });
    }

    useEffect(()=>{
        [...document.querySelectorAll(".option")].forEach((one,index)=>{
            if(index == 3) one.classList.add("active");
            else one.classList.remove("active");
        })

        fetchData();
    },[])

    const handleEventElement = (e)=>{
        [...document.querySelectorAll(".event")].forEach((one,index)=>{
            one.classList.remove("active");
        })
        e.target.classList.add("active")
    }

    const elements = eventList
    .filter(one => one.author_id === session?.user?.email?.id)
    .map((one, index) => (
        <EventListElement name={one.nazwa} key={index} number={index} handleEventElement={handleEventElement} />
    ));

    return(
        <div className='events'>
            <div className="eventsOption">siema</div>
            <div className="eventsList">
                <h1>Twoje wydarzenia</h1>
                <div className="eventsContainer">
                    {elements.length > 0 ? elements : <div className="empty">brak wydarzeń</div> }
                </div>
            </div>
        </div>
    )
}
export default Home;