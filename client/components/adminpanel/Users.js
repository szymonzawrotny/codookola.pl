"use client"
import { useState,useEffect } from 'react'
import User from './listElements/User'
import EditUser from './editPanels/EditUser'

const Users = ()=>{

    const [list,setList] = useState([])
    const [isActive, setIsActive] = useState(false);
    const [data,setData] = useState(null);

    const fetchData = async ()=>{
        const response = await fetch("http://localhost:5000/usersapi")
        .then(response => response.json())
        .then(data=>setList(data))
    }

    useEffect(()=>{
        fetchData();
    },[])

    const elements = list.map((one,index)=>{
        return <User 
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
                <h2>Użytkownicy</h2>
                <div className="postsToAccept">
                    {
                        elements.length >0 ? elements : <div className="empty">brak użytkowników </div>
                    }
                </div>
            </div>
            <div className="editPost">
                {
                    isActive ? <EditUser data={data}/> : "Wybierz wydarzenie..."
                }
            </div>
        </section>
    )
}
export default Users