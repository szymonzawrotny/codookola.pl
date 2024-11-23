import "@/styles/mapPage/interface/panels/last.scss"
import { useSession } from 'next-auth/react'
import { HiMagnifyingGlass } from "react-icons/hi2";

const Login = ()=> <div className="Login">zaloguj</div>

const LastPanel = ()=>{

    const elements = [];

    return(
        <div className="lastPanel">
            <div className="search">
                <div className='input'>
                    <input 
                        type="text" 
                        placeholder='Wpisz wydarzenie...' ></input>
                    <HiMagnifyingGlass />
                </div>
                <div className="sectionName">
                    <span>ostatnio przeglądane</span>
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

const Last = ()=>{

    const {data:session} = useSession({
        required: false,
    })
    
    {
        if(session) return <LastPanel/>
        else return <Login/>
    }
}
export default Last;