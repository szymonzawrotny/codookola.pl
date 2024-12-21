import { useState, useEffect } from 'react';
import { FaRegUserCircle} from "react-icons/fa";
import Image from 'next/image';

const Comment = ({value,username,icon})=>{

    const [iconPath,setIconPath] = useState(false)
    useEffect(()=>{
        if(icon!="brak")
            setIconPath(`http://localhost:5000${icon}`)
    },[])

    return(
        <div className="comment">
            <header>
                 <div className="icon">
                    {iconPath ? <div className="userIcon"><Image
                            src={iconPath} 
                            alt="siema"
                            width="1920" 
                            height="1080"/></div> : <FaRegUserCircle />}
                </div>
                <div className="name">{username}</div>
            </header>
            <main>
                {value}
            </main>
        </div>
    )
}
export default Comment;