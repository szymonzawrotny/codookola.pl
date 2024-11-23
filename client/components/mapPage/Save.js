import "@/styles/mapPage/interface/panels/save.scss"
import { useState, useEffect, useRef} from 'react';
import { useSession } from 'next-auth/react'
import { HiMagnifyingGlass } from "react-icons/hi2";

const Login = ()=> <div className="Login">zaloguj</div>

const SavePanel = ({session})=>{


    const [list,setList] = useState([]);

    const fetchSavedEvents = async ()=>{
        const response = await fetch("http://localhost:5000/getsavedevents",{
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
            console.log(data.answer)
        } else {
            console.log("coś nie poszło")
        }
    }

    useEffect(()=>{
        fetchSavedEvents();
    },[])

    const elements = list.map((one,index)=>{
        return (
            <div className="event">siema</div>
        )
    });

    return(
        <div className="savePanel">
            <div className="search">
                <div className='input'>
                    <input 
                        type="text" 
                        placeholder='Wpisz wydarzenie...' ></input>
                    <HiMagnifyingGlass />
                </div>
                <div className="sectionName">
                    <span>zapisane</span>
                </div>
            </div>
            <div className="eventList">
                {
                    elements.length >0 ? elements : <div className="empty">brak postów</div>
                }
            </div>
        </div>
    )
}

const Save = ()=>{

    const {data:session} = useSession({
        required: false,
    })
    
    {
        if(session) return <SavePanel session={session}/>
        else return <Login/>
    }
}
export default Save;