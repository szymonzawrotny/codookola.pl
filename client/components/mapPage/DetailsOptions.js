"use client";
import { useState, useRef, useEffect } from "react";
import { MdPlace, MdEventNote } from "react-icons/md";
import { AiFillPushpin } from "react-icons/ai";
import { PiCityBold } from "react-icons/pi";
import { HiMagnifyingGlass } from "react-icons/hi2";

const General = ({desc,address,city,date,eventType})=>{

    useEffect(()=>{
        [...document.querySelectorAll("nav.detailsNav>.option")].forEach((one,index)=>{
            one.classList.remove("active");
            if(index==0) one.classList.add("active");
        })
    },[])

    return(
         <>
            <p className="description">{desc}</p>
            <div className="detailInfoPanel"><MdPlace /> {address}</div>
            <div className="detailInfoPanel"><PiCityBold /> {city}</div>
            <div className="detailInfoPanel"><MdEventNote /> {date}</div>
            <div className="detailInfoPanel"><AiFillPushpin /> {eventType}</div>
         </>
    )
}
const Opinions = ()=>{

    useEffect(()=>{
        [...document.querySelectorAll("nav.detailsNav>.option")].forEach((one,index)=>{
            one.classList.remove("active");
            if(index==2) one.classList.add("active");
        })
    },[])

    return(
         <>
            <div className="opinions">
                siema
            </div>
         </>
    )
}

const Chatbot = ()=>{

    const [text,setText] = useState("");
    const [question,setQuestion] = useState("Zadaj pytanie...")
    const [answer, setAnswer] = useState(null)

    const inputRef = useRef()

    const handleSend = async ()=>{

        let value;

        setQuestion(text)
        inputRef.current.disabled = true;

        value = inputRef.current.value;

        const response = await fetch("http://localhost:5000/askbot",{
            method:"POST",
            body: JSON.stringify({
                value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.ok){
            const data = await response.json();
            setAnswer(data.answer);
            console.log(data.question)
        } else {
            setAnswer("coś średnio poszło")
        }

        setText("spróbuj ponownie później...")
    }

    useEffect(()=>{
        [...document.querySelectorAll("nav.detailsNav>.option")].forEach((one,index)=>{
            one.classList.remove("active");
            if(index==1) one.classList.add("active");
        })
    },[])

    return(
         <>
            <div className="chat">
                <div className="userQuestion">{question}</div>
                {answer && <div className="chatResponse">{answer}</div>}
            </div>
            <div className="askQuestion">
                <input 
                    type="text" 
                    placeholder="zadaj pytanie..." 
                    ref={inputRef}
                    onChange={(e)=>setText(e.target.value)} 
                    value={text} disabled={false}/>
                        <HiMagnifyingGlass onClick={handleSend}/>
            </div>
         </>
    )
}

export {General,Opinions,Chatbot};