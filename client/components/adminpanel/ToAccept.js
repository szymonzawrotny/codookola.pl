"use client"
import { useState,useEffect } from 'react'
import PostToAccept from "./listElements/PostToAccept.js"
import Edit from './editPanels/EditAccept.js'

const ToAccept = ()=>{

    const [list,setList] = useState([])
    const [isActive, setIsActive] = useState(false);
    const [data,setData] = useState(null);

    const fetchData = async ()=>{
        const response = await fetch("http://localhost:5000/eventsToAccept")
        .then(response => response.json())
        .then(data=>setList(data))
    }

    useEffect(()=>{
        fetchData();
    },[])

    const elements = list.map((one,index)=>{
        return <PostToAccept 
                    one={one} 
                    index={index} 
                    key={index}
                    setData={setData}
                    isActive={isActive} 
                    setIsActive={setIsActive}/>
    })

    return(
        <section className="ToAccept">
            <div className="table">
                <h2>Akceptuj</h2>
                <div className="postsToAccept">
                    { 
                        elements.length >0 ? elements : <div className="empty">brak postów</div>
                    }
                </div>
            </div>
            <div className="editPost">
                {
                    isActive ? <Edit data={data}/> : "Wybierz wydarzenie..."
                }
            </div>
        </section>
    )
}
export default ToAccept