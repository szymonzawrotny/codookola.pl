"use client"
import "@/styles/mapPage/interface/panels/add.scss"
import { IoIosArrowDown } from "react-icons/io";
import { useSession } from 'next-auth/react'

const Login = ()=> <div className="Login">zaloguj</div>

const Add = ()=>{

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
                            <textarea placeholder="Jak się nazywa Twoje wydarzenie..."></textarea>
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
                            <textarea placeholder="Opisz swoje wydarzenie..."></textarea>
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
                            <input type="text" placeholder="Kraj..."/>
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
                            <input type="file" onChange={e=>setFile(e.target.files[0])} className='fileInput'/>
                            <input type="file" onChange={e=>setFile(e.target.files[0])} className='fileInput'/>
                            <input type="file" onChange={e=>setFile(e.target.files[0])} className='fileInput'/>
                        </form>
                    </div>
                    <button>dodaj</button>
                </div>
            </div>
        )
    } else {
        return <Login/>
    }
}
export default Add;