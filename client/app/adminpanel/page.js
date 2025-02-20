"use client"
import { useState,useEffect } from 'react'
import EditAcceptPanel from '@/components/adminpanel/EditAcceptPanel'

const Home = ()=>{

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

        const handleClick = ()=>{
            setData(one)
        }

        return (
            <div className="listElement" key={index}>
                <div className="info">
                    {`${index+1}. ${one.nazwa}`}
                </div>
                <button onClick={handleClick}>pokaż</button>
            </div>
        )
    })

    return(
        <div className="edit">
            <div className="editPanel">
                <div className="editContainer">
                    {
                        data ? <EditAcceptPanel data={data}/> : <div className="contentEmpty">Wybierz wydarzenie...</div>
                    }
                </div>
            </div>
            <div className="list">
                { 
                    elements.length >0 ? elements : <div className="empty">brak postów</div>
                }
            </div>
        </div>
    )
}
export default Home;