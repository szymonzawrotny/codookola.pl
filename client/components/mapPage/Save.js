import "@/styles/mapPage/interface/panels/save.scss"
import { useState, useEffect, useRef} from 'react';
import { useSession } from 'next-auth/react'
import { HiMagnifyingGlass } from "react-icons/hi2";

const Login = ()=> <div className="Login">zaloguj</div>

const SavePanel = ()=>{
    return(
        <div className="savePanel">
            <div className="search">
                <div className='input'>
                    <input 
                        type="text" 
                        placeholder='Wpisz wydarzenie...' ></input>
                    <HiMagnifyingGlass />
                </div>
                <div className='sort'>
                    <select className='type'>
                        <option value="wszystkie">Wszystkie</option>
                        <option value="kultura">Kultura</option>
                        <option value="sport">Sport</option>
                        <option value="koncert">Koncert</option>
                        <option value="festiwal">Festiwal</option>
                        <option value="naukowe">Naukowe</option>
                        <option value="imprezka">Imprezka</option>
                    </select>
                    <select className='date'>
                        <option>Popularne</option>
                        <option>Już zaraz!</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

const Save = ()=>{

    const {data:session} = useSession({
        required: false,
    })
    
    {
        if(session) return <SavePanel/>
        else return <Login/>
    }
}
export default Save;