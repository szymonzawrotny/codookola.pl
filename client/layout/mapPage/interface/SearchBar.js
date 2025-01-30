import "@/styles/mapPage/interface/searchBar.scss"
import { useRef, useState, useEffect } from 'react';
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchBar = ({handleButton})=>{

    const ref = useRef();
    const [eventList,setEventList] = useState([]);
    const [tab,setTab] = useState([]);

    const handleInputShow = (e)=>{
        ref.current.classList.toggle("active");
    }

    const handleInput = (e)=>{
        const value = e.target.value;

        const newTab = eventList.filter(one=>{
            return one.nazwa.toLowerCase().includes(value)
        })

        setTab(newTab)
    }

    const fetchData = async () =>{
        const result = await fetch("http://localhost:5000/api")
        .then(response => response.json())
        .then(data=>{
            setEventList(data) 
            setTab(data)
        });
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const elements = tab.map((one,index)=>{
        if(index >= 4) return
        return (
            <div 
                key={index} 
                className="element" 
                onClick={()=>{
                    [...document.querySelectorAll(".sidePanel>.icon")].forEach((one,index)=>{
                        if(!index==0) one.classList.remove("active");
                        else one.classList.add("active");
                    })
                    handleButton(one.nazwa,one.author_email,one.opis,one.event_id,one);
                }}>
                    {one.nazwa}, {one.adres}, {one.data}
            </div>
        )
    })

    return(
        <div className="searchBar">
            <div className="search" ref={ref}>
                <div className="logo"></div>
                <input 
                    type="text"
                    onClick={handleInputShow} 
                    onChange={handleInput}
                    placeholder="Szukaj wydarzeń..."/>
                <HiOutlineMagnifyingGlass size={32}/>
                <div className="list">
                    <div className="elements">
                        {elements.length > 0 ? elements : <div className="empty">brak wydarzeń</div> }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchBar;