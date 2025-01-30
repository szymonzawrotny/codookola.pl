"use client"
import { useState,useEffect } from "react";
import SwiperBox from "../mapPage/SwiperBox";

const EditReportedPanel = ({data})=>{

    const [value,setValue] = useState("");

    const [path,setPath] = useState("http://localhost:5000/uploads/default.jpg");
    const [path2,setPath2] = useState("http://localhost:5000/uploads/default.jpg");
    const [path3,setPath3] = useState("http://localhost:5000/uploads/default.jpg");

    const sendAlert = async e =>{
        e.preventDefault();

        const response = await fetch("http://localhost:5000/sendalert",{
            method: "POST",
            body: JSON.stringify({
                id: data.eventDetails.author_id,
                value
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

            console.log(data.message)
        }
    }

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
        setPath(`http://localhost:5000${data?.eventDetails?.photo_path}`)
        setPath2(`http://localhost:5000${data?.eventDetails?.photo_path2}`)
        setPath3(`http://localhost:5000${data?.eventDetails?.photo_path3}`)
    },[data])

    return(
        <div className="content">
            <h2>{data?.eventDetails?.nazwa}</h2>
            <p>{`Opis: ${data?.eventDetails?.opis}`}</p>
            <p>{`Rodzaj: ${data?.eventDetails?.rodzaj}`}</p>
            <p>{`Twórca: ${data?.eventDetails?.author_email}`}</p> 
            <p>{`Adres: ${data?.eventDetails?.kod_pocztowy}, ${data?.eventDetails?.miasto}, ${data?.eventDetails?.adres}`}</p>
            <div className="grant">
                <div className="changePrivilage">
                    <SwiperBox path={path} path2={path2} path3={path3}/>
                </div>
                    <div className="delete">
                        <form onSubmit={sendAlert}>
                            <textarea
                                placeholder="Wyślij wiadomość użytkownikowi..."
                                onChange={e=>setValue(e.target.value)}
                                value={value}></textarea>
                            <input type="submit" value="wyślij"/>
                        </form>
                        <button onClick={deleteEvent} style={{marginTop:"15px"}}>usuń Wydarzenie</button>    
                    </div>
            </div>
        </div>
    )
}
export default EditReportedPanel;