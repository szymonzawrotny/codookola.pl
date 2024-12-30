"use client"
import { useState } from 'react';

const Edit = ({data})=>{

    const addEventToMap = async ()=>{
        const response = await fetch("http://localhost:5000/addeventtomap",{
            method: "POST",
            body: JSON.stringify({
                data
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            console.log("coś nie poszło")
        } else { 
            const data = await response.json();
            console.log(data)
        }
    }

    const deleteEvent = async ()=>{

        const response = await fetch("http://localhost:5000/dontacceptevent",{
            method: "POST",
            body: JSON.stringify({
                user_id: userId,
                event_id: data.author_id
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            console.log("coś się popsuło");
        } else {
            const data = await response.json();
            console.log(data.message)
        }
    }

    return(
        <div className="postData">
            <h3>{data.nazwa}</h3>
            <p>{data.opis}</p>
            <p>{data.data}</p>
            <p>{`${data.miasto}. ${data.kod_pocztowy}`}</p>
            <p>{data.adres}</p>
            <p>{data.author_email}</p>

            <button onClick={deleteEvent}>usuń</button>
            <button onClick={addEventToMap}>akceptuj</button>
        </div>
    )
}
export default Edit