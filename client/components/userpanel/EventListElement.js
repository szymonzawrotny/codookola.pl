"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IoIosArrowDown } from "react-icons/io";

const EventListElement = ({handleEventElement,eventInfo,number,showEvent, editEvent})=>{

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }
    })


    const deleteEvent = async ()=>{

        const response = await fetch("http://localhost:5000/deleteevent",{
            method: "POST",
            body: JSON.stringify({
                id: session?.user?.email?.id,
                eventId: eventInfo.event_id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.ok){
            console.log("usunięto")
        } else {
            console.log("coś nie poszło")
        }
    }

    return(
        <div className="event" onClick={handleEventElement}>
            <span>{`${number+1}. ${eventInfo.nazwa.toUpperCase()}`}<IoIosArrowDown /></span>
            <div className="eventButtons">
                <div className="show" onClick={()=>showEvent(eventInfo)}>pokaż</div>
                <div className="edit" onClick={()=>{editEvent(eventInfo)}}>edytuj</div>
                <div className="delete" onClick={deleteEvent}>usuń</div>
            </div>
        </div>
    )
}
export default EventListElement