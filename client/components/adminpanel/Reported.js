"use client"
import { useState,useEffect } from 'react'
import PostReported from "./listElements/PostReported"

const Reported = ()=>{

    const [list,setList] = useState([])

    const fetchData = async ()=>{
        const response = await fetch("http://localhost:5000/eventsReported")
        .then(response => response.json())
        .then(data=>setList(data))
    }

    useEffect(()=>{
        fetchData();
    },[])

    const elements = list.map((one,index)=>{
        return <PostReported one={one} key={index} index={index}/>
    })

    return(
        <section className="Reported">
            <div className="table">
                <h2>Zgłoszone</h2>
                <div className="postsReported">
                    {
                        elements.length >0 ? elements : <div className="empty">brak zgłoszeń</div>
                    }
                </div>
            </div>
            <div className="editPost">tutaj edycja</div>
        </section>
    )
}
export default Reported