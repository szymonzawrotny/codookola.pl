"use client"
import { useState,useEffect } from 'react'
import Post from "./listElements/Post"

const Posts = ()=>{

    const [list,setList] = useState([])

    const fetchData = async ()=>{
        const response = await fetch("http://localhost:5000/api")
        .then(response => response.json())
        .then(data=>setList(data))
    }

    useEffect(()=>{
        fetchData();
    },[])

    const elements = list.map((one,index)=>{
        return <Post one={one} key={index} index={index}/>
    })

    return(
        <section className="ToAccept">
            <div className="table">
                <h2>Wydarzenia</h2>
                <div className="postsToAccept">
                    {
                        elements.length >0 ? elements : <div className="empty">brak postów</div>
                    }
                </div>
            </div>
            <div className="editPost">tutaj edycjaaaaa</div>
        </section>
    )
}
export default Posts