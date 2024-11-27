"use client"
import { useState,useEffect } from 'react'
import Post from "./Post"

const Users = ()=>{

    const [list,setList] = useState([])

    const fetchData = async ()=>{
        const response = await fetch("http://localhost:5000/eventsToAccept")
        .then(response => response.json())
        .then(data=>setList(data))
    }

    useEffect(()=>{
        fetchData();
    },[])

    const elements = list.map((one,index)=>{
        return <Post one={one}/>
    })

    return(
        <section className="ToAccept">
            <div className="table">
                <h2>Użytkownicy</h2>
                <div className="postsToAccept">
                    {
                        elements.length >0 ? elements : <div className="empty">brak użytkowników</div>
                    }
                </div>
            </div>
            <div className="editPost">tutaj edycja</div>
        </section>
    )
}
export default Users