"use client"
import "@/styles/mapPage/interface/panels/add.scss"
import { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { useSession } from 'next-auth/react'

const Login = ()=> <div className="Login">zaloguj</div>

const Add = ()=>{

    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [country,setCountry] = useState("");
    const [city,setCity] = useState("");
    const [street,setStreet] = useState();
    const [number,setNumber] = useState("");
    const [type,setType] = useState("");
    const [date,setDate] = useState("");
    const [hour,setHour] = useState("");
    const [photos,setPhotos] = useState([]);

    const {data:session} = useSession({
        required: false,
    })

    const showElement = (e)=>{
        [...document.querySelectorAll("div.showIcon")].forEach((one,index)=>{
            one.classList.remove("active");
            one.parentNode.parentNode.classList.remove("active");
        })

        if (e.target.tagName == "svg") {
            e.target.parentNode.classList.toggle("active");
            e.target.parentNode.parentNode.parentNode.classList.toggle("active");
        } else if (e.target.tagName == "path") {
            e.target.parentNode.parentNode.classList.toggle("active");
            e.target.parentNode.parentNode.parentNode.parentNode.classList.toggle("active");
        } else {
            e.target.classList.toggle("active");
            e.target.parentNode.parentNode.classList.toggle("active");
        }
    }

    const addEvent = ()=>{
        if(title != "" && desc!= "" && country != "" && city != "" && street != "" && number != "" && type != "" && date != "" && hour!=""){
            console.log("siema dodano")
            //tutaj fetch post
        } else {
            console.log("poprawnie uzupełnij dane")
        }
    }

    if(session){
        return(
            <div className="add">
                <h1>Dodaj wydarzenie!</h1>
                <div className="addContainer">
                    <div className="addElement">
                        <header>
                            1. Podaj tytuł <div className="space"></div>
                            <div className="showIcon" onClick={showElement}>
                                <IoIosArrowDown/>
                            </div>
                        </header>
                        <form className="addName">
                            <p>Tytuł to jeden z najważniejszych elementów naszego wydarzenia! Przyciąga ochotników więc powinien być chwytliwy i nie za długi.</p>
                            <textarea 
                                placeholder="Jak się nazywa Twoje wydarzenie..." 
                                value={title} 
                                onChange={(e)=>setTitle(e.target.value)}></textarea>
                        </form>
                    </div>
                    <div className="addElement">
                        <header>
                            2. Uzupełnij opis <div className="space"></div>
                            <div className="showIcon" onClick={showElement}>
                                <IoIosArrowDown/>
                            </div>
                        </header>
                        <form className="addDesc">
                            <p>Poinformuj użytkownika czego dotyczy Twoje wydarzenie. Opowiedz co sie będzie dziać i dlaczego powinien na nie wpaść!</p>
                            <textarea 
                                placeholder="Opisz swoje wydarzenie..."
                                value={desc} 
                                onChange={(e)=>setDesc(e.target.value)}></textarea>
                        </form>
                    </div>
                    <div className="addElement">
                        <header>
                            3. Dodaj adres <div className="space"></div>
                            <div className="showIcon" onClick={showElement}>
                                <IoIosArrowDown/>
                            </div>
                        </header>
                        <form className="addAddress">
                            <p>Dodaj mniejsce wydarzenia, najważniejsze aby użytkownik bez problemu do nas trafił!</p>
                            <input 
                            type="text" 
                            placeholder="Kraj..."
                            value={country} 
                            onChange={(e)=>setCountry(e.target.value)}/>
                            <input type="text" placeholder="Miasto..."/>
                            <input type="text" placeholder="Ulica..."/>
                            <input type="text" placeholder="Numer domu..."/>
                        </form>
                    </div>
                    <div className="addElement">
                        <header>
                            4. Rodzaj i data <div className="space"></div>
                            <div className="showIcon" onClick={showElement}>
                                <IoIosArrowDown/>
                            </div>
                        </header>
                        <form className="addType">
                            <p>Co? Gdzie? I najważniejsze kiedy? Podaj datę wydarzenia oraz jego rodzaj</p>
                            <select>
                                <option value="wszystkie">Wszystkie</option>
                                <option value="kultura">Kultura</option>
                                <option value="sport">Sport</option>
                                <option value="koncert">Koncert</option>
                                <option value="festiwal">Festiwal</option>
                                <option value="naukowe">Naukowe</option>
                                <option value="imprezka">Imprezka</option>
                            </select>
                            <input type="date"/>
                            <input type="text" placeholder="O której..."/>
                        </form>
                    </div>
                    <div className="addElement">
                        <header>
                            5. Prześlij zdjęcia <div className="space"></div>
                            <div className="showIcon" onClick={showElement}>
                                <IoIosArrowDown/>
                            </div>
                        </header>

                        <form className="addPhoto">
                            <p>Dodaj jakieś ładne fotki!</p>
                            <input type="file" onChange={e=>setFile(e.target.files[0])} className='fileInput'/>
                            <input type="file" onChange={e=>setFile(e.target.files[0])} className='fileInput'/>
                            <input type="file" onChange={e=>setFile(e.target.files[0])} className='fileInput'/>
                        </form>
                    </div>
                    <button onClick={addEvent}>dodaj</button>
                </div>
            </div>
        )
    } else {
        return <Login/>
    }
}
export default Add;