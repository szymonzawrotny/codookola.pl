"use client"
import { useState,useEffect } from "react";
import SwiperBox from "../mapPage/SwiperBox";

const EditEventPanel = ({data})=>{

    const [path,setPath] = useState("http://localhost:5000/uploads/default.jpg");
    const [path2,setPath2] = useState("http://localhost:5000/uploads/default.jpg");
    const [path3,setPath3] = useState("http://localhost:5000/uploads/default.jpg");

    const deleteEvent = async ()=>{
        const response = await fetch("http://localhost:5000/deleteevent",{
            method: "POST",
            body: JSON.stringify({
                id: data.author_id,
                eventId: data.event_id
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            console.log("coś nie poszło")
        } else { 
            const data = await response.json();

            document.querySelector(".adminAlert").textContent = data.message;
            document.querySelector(".adminAlert").classList.add("active");

            setTimeout(()=>{
                document.querySelector(".adminAlert").classList.remove("active");
            },5000)
            console.log(data)
        }
    }

    useEffect(()=>{
        setPath(`http://localhost:5000${data.photo_path}`)
        setPath2(`http://localhost:5000${data.photo_path2}`)
        setPath3(`http://localhost:5000${data.photo_path3}`)
    },[data])

    return(
        <div className="content">
            <h2>{data.nazwa}</h2>
            <p>{`Opis: ${data.opis}`}</p>
            <p>{`Rodzaj: ${data.rodzaj}`}</p>
            <p>{`Twórca: ${data.author_email}`}</p> 
            <p>{`Adres: ${data.kod_pocztowy}, ${data.miasto}, ${data.adres}`}</p>
            <div className="grant">
                <div className="changePrivilage">
                    <SwiperBox path={path} path2={path2} path3={path3}/>
                </div>
                    <div className="delete">
                        <button onClick={deleteEvent}>usuń Wydarzenie</button>
                    </div>
            </div>
        </div>
    )
}
export default EditEventPanel;