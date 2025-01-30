"use client"
import { useState,useEffect } from "react";
import SwiperBox from "../mapPage/SwiperBox";

const EditAcceptPanel = ({data})=>{

    const [path,setPath] = useState("http://localhost:5000/uploads/default.jpg");
    const [path2,setPath2] = useState("http://localhost:5000/uploads/default.jpg");
    const [path3,setPath3] = useState("http://localhost:5000/uploads/default.jpg");

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

            document.querySelector(".adminAlert").textContent = data.message;
            document.querySelector(".adminAlert").classList.add("active");

            setTimeout(()=>{
                document.querySelector(".adminAlert").classList.remove("active");
            },5000)
            console.log(data)
        }
    }

    const deleteEvent = async ()=>{

        const response = await fetch("http://localhost:5000/dontacceptevent",{
            method: "POST",
            body: JSON.stringify({
                user_id: data.author_id,
                event_id: data.event_id
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            console.log("coś się popsuło");
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
                        <button onClick={addEventToMap}>akceptuj Wydarzenie</button>
                        <button onClick={deleteEvent} style={{marginTop:"15px"}}>odrzuć Wydarzenie</button>    
                    </div>
            </div>
        </div>
    )
}
export default EditAcceptPanel;