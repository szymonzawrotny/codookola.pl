"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MdPlace, MdEventNote } from "react-icons/md";
import { AiFillPushpin } from "react-icons/ai";
import { PiCityBold } from "react-icons/pi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoAddOutline } from "react-icons/io5";

import Comment from "./Comment";

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
const Opinions = ({id})=>{

    const {data:session} = useSession({
        required: false,
    })

    const [value,setValue] = useState("")
    const [list,setList] = useState([])

    const addComment = async ()=>{
        if(session){
            const response = await fetch("http://localhost:5000/addcomment",{
                method: "POST",
                body:JSON.stringify({
                    id,
                    userId: session?.user?.email.id,
                    value
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })


            if(!response.ok){
                console.log("coś się zepsuło")
            } else {
                const data = await response.json();
                console.log(data.message);
                setValue("")
                fetchComments();
            }
        } else {
            let mapalert = document.querySelector(".MapAlert");

            mapalert.classList.add("active")
            mapalert.textContent = "Musisz się zalogować";
            setTimeout(()=>{
                mapalert.classList.remove("active")
            },3000)

            setTimeout(()=>{
                mapalert.textContent = "Pomyślnie dodano!";
            },3500)
        }
    }

    const fetchComments = async ()=>{
        const response = await fetch("http://localhost:5000/getcomments",{
            method: "POST",
            body:JSON.stringify({
                id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })


        if(!response.ok){
            console.log("coś się zepsuło")
        } else {
            const data = await response.json();
            setList(data.answer)
        }
    }

    useEffect(()=>{
        [...document.querySelectorAll("nav.detailsNav>.option")].forEach((one,index)=>{
            one.classList.remove("active");
            if(index==2) one.classList.add("active");
        })

        fetchComments();
    },[])

    const elements = list.map((one,index)=>{
        return <Comment key={index} value={one.value} username={one.email}/>
    })

    return(
         <>
            <div className="opinions">
                <div className="addComment">
                    <input 
                        type="text" 
                        value={value}
                        onChange={e=>setValue(e.target.value)}
                        placeholder="co sądzisz o tym wydarzeniu?"/>
                    <button onClick={addComment}>
                        <IoAddOutline/>
                    </button>
                </div>
                <div className="commentsContainer">
                    {
                        elements.length >0 ? elements : <div className="empty">brak komentarzy</div>
                    }
                </div>
            </div>
         </>
    )
}

const Chatbot = ()=>{

    const {data:session} = useSession({
        required: false,
    })

    const [text,setText] = useState("");
    const [question,setQuestion] = useState("Zadaj pytanie...")
    const [answer, setAnswer] = useState(null)
    const [chatNumber,setChatNumber] = useState(0)

    const inputRef = useRef()

    const handleSend = async ()=>{

        if(chatNumber>0){
            let value;

            setQuestion(text)
            inputRef.current.disabled = true;

            value = inputRef.current.value;

            const response = await fetch("http://localhost:5000/askbot",{
                method:"POST",
                body: JSON.stringify({
                    value,
                    id: session?.user?.email?.id,
                    chatNumber
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(response.ok){
                const data = await response.json();
                setAnswer(data.answer);
            } else {
                setAnswer("coś średnio poszło")
            }

            setText("spróbuj ponownie później...")
        }
    }

    const fetchChatNumber = async ()=>{
        const response = await fetch("http://localhost:5000/checknumber",{
            method: "POST",
            body: JSON.stringify({
                id: session?.user?.email?.id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.ok){
            const data = await response.json();
            setChatNumber(data.answer[0].chat_number)
            if(data.answer[0].chat_number<=0)
                setText("Wykorzystano dzienny limit")
        } else {
            console.log("coś nie poszło")
        }
    }

    useEffect(()=>{
        [...document.querySelectorAll("nav.detailsNav>.option")].forEach((one,index)=>{
            one.classList.remove("active");
            if(index==1) one.classList.add("active");
        })

        if(session){
            fetchChatNumber();
        } else {
            setText("Musisz się zalogować...")
        }
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
                    value={text} disabled={!chatNumber}/>
                        <HiMagnifyingGlass onClick={handleSend}/>
            </div>
         </>
    )
}

export {General,Opinions,Chatbot};