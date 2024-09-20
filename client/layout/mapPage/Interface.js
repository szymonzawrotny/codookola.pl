'use client'
import { useRef, useState } from 'react';

import SidePanel from '@/layout/mapPage/interface/SidePanel';
import SearchBar from "@/layout/mapPage/interface/SearchBar"
import Burger from '@/layout/mapPage/interface/Burger';
import Menu from './interface/Menu';
import EventPanel from './interface/EventPanel';

import Discover from '@/components/mapPage/Discover';
import Save from '@/components/mapPage/Save';
import Last from '@/components/mapPage/Last';
import Add from '@/components/mapPage/Add';

const InterFace = ()=>{

    const burgerRef = useRef();
    const menuRef = useRef();
    const eventPanelRef = useRef();
    const [component, setComponent] = useState(<Save/>);

    const handleBurger = ()=>{
      burgerRef.current.classList.toggle("active");
      menuRef.current.classList.toggle("active");
    } 


    const handleIconAnimation = (e)=>{
        [...document.querySelectorAll(".icon")].forEach(one=>{
            one.classList.remove("active");
        })

        let id = "";

        if(e.target.tagName == "svg"){
            e.target.parentNode.classList.add("active");
            id = e.target.parentNode.id;
        } else if(e.target.tagName == "path"){
            e.target.parentNode.parentNode.classList.add("active");
            id = e.target.parentNode.parentNode.id;
        }else {
            e.target.classList.add("active");
            id = e.target.id;
        }

        switch(id){
            case "discover": setComponent(<Discover/>);
            break;
            case "save": setComponent(<Save/>);
            break;
            case "last": setComponent(<Last/>);
            break;
            case "add": setComponent(<Add/>);
            break;
        }

        eventPanelRef.current.classList.add("active");
    }

    return(
        <>
            <Burger burgerRef={burgerRef} handleBurger={handleBurger}/>
            <SearchBar/>
            <SidePanel handleIconAnimation={handleIconAnimation}/>
            <Menu menuRef={menuRef} />
            <EventPanel 
                eventPanelRef={eventPanelRef} 
                component={component}/>
        </>
    )
}
export default InterFace