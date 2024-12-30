"use client"
import { useState, useEffect, useRef} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import "@/styles/userpanel/events.scss"

import EventListElement from '@/components/userpanel/EventListElement';
import EditPanel from '@/components/userpanel/EditPanel';

const Home = ()=>{

    const [eventList,setEventList] = useState([]);
    const [edit,setEdit] = useState(false)
    const router = useRouter();

    const [eventName,setEventName] = useState("");
    const [eventInfo,setEventInfo] = useState(null);

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

        if(e.target.className == "edit" || e.target.className == "show" || e.target.className == "delete")
            return
        
        [...document.querySelectorAll(".event")].forEach((one,index)=>{
            one.classList.remove("active");
        })


        if (e.target.tagName == "SPAN") {
            e.target.parentNode.classList.add("active");
        } else if (e.target.tagName == "path") {
            e.target.parentNode.parentNode.parentNode.classList.add("active");
        } else if (e.target.tagName == "svg"){
            e.target.parentNode.parentNode.classList.add("active");
        } else {
            e.target.classList.add("active");
        }
    }

    const showEvent = async (obiekt)=>{
        setEventInfo(obiekt);
        setEdit(false)
        setEventName(obiekt.nazwa)
    }

    const editEvent = async (obiekt)=>{
        showEvent(obiekt);
        setEdit(true)
        console.log(edit);
    }

    const elements = eventList.filter(one => one.author_id === session?.user?.email?.id).map((one, index) => (
        <EventListElement 
            eventInfo={one} 
            key={index} 
            number={index} 
            handleEventElement={handleEventElement} 
            editEvent={editEvent}
            showEvent={showEvent}/>
    ));

    return(
        <div className='events'>
            <div className="eventsOption">
                <div className="optionContainer">
                    {!eventName==""? <EditPanel 
                        eventInfo={eventInfo}
                        edit={edit} />: <div className="empty">Wybierz swoje wydarzenie!</div> }
                </div>
            </div>
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