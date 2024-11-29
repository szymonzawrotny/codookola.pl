"use client"; 
import { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Link from "next/link";
import "@/styles/userpanel/search.scss"

const Search = ({searchInputRef,handleSearch,searchRef})=>{

    const [list,setList] = useState([
        {
            nazwa: "edytuj imię",
            link: "/userpanel/info"
        },
        {
            nazwa: "zarządzaj wydarzeniami",
            link: "/userpanel/events"
        },
        {
            nazwa: "sprawdź statystyki",
            link: "/userpanel/stats"
        },
        {
            nazwa: "kontakt z administracją",
            link: "/userpanel/support"
        },
        {
            nazwa: "edytuj awatar",
            link: "/userpanel/info"
        },
        {
            nazwa: "edytuj adres",
            link: "/userpanel/info"
        },
        {
            nazwa: "strona główna",
            link: "/userpanel"
        },

    ])
    const [tab,setTab] = useState(list);

    const handleInput = (e)=>{
        const value = e.target.value;

        const newTab = list.filter(one=>{
            return one.nazwa.toLowerCase().includes(value)
        })

        console.log(newTab)

        setTab(newTab)
    }

    const elements = tab.map((one,index)=>{
        if(index >= 4) return
        return <Link key={index} href={one.link} className="searchPanelOption">{one.nazwa}</Link>
    })

    return(
        <div className="search" ref={searchInputRef}>
            <input type="text" placeholder="szukaj..." onClick={handleSearch} onChange={handleInput}/>
            <HiOutlineMagnifyingGlass/>
            <div className="searchPanel" ref={searchRef}>
                <div className="elements">
                    {elements.length > 0 ? elements : <div className="empty">brak</div> }
                </div>
            </div>
        </div>
    )
}
export default Search;