'use client'
import { useRef, useState, useEffect } from 'react';
import { useSpring } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import SidePanel from '@/layout/mapPage/interface/SidePanel';
import SearchBar from "@/layout/mapPage/interface/SearchBar"
import Burger from '@/layout/mapPage/interface/Burger';
import Menu from './interface/Menu';
import EventPanel from './interface/EventPanel';

import Discover from '@/components/mapPage/Discover';
import Save from '@/components/mapPage/Save';
import Last from '@/components/mapPage/Last';
import Add from '@/components/mapPage/Add';
import Details from '@/components/mapPage/Details';

const InterFace = ({posState, setPosState,pos,handleButton,component,setComponent}) => {

    const burgerRef = useRef();
    const menuRef = useRef();
    const [isMobile, setIsMobile] = useState(false);

    const handleBurger = () => {
        burgerRef.current.classList.toggle("active");
        menuRef.current.classList.toggle("active");
    }

    const handleIconAnimation = (e) => {
        [...document.querySelectorAll(".icon")].forEach(one => {
            one.classList.remove("active");
        })

        let id = "";

        if (e.target.tagName == "svg") {
            e.target.parentNode.classList.add("active");
            id = e.target.parentNode.id;
        } else if (e.target.tagName == "path") {
            e.target.parentNode.parentNode.classList.add("active");
            id = e.target.parentNode.parentNode.id;
        } else {
            e.target.classList.add("active");
            id = e.target.id;
        }
        

        switch (id) {
            case "discover": setComponent(<Discover handleButton={handleButton}/>);
                break;
            case "save": setComponent(<Save/>);
                break;
            case "last": setComponent(<Last/>);
                break;
            case "add": setComponent(<Add/>);
                break;
        }

        if(isMobile){
            setPosState({ x: 0, y: -530 });
        } else {
            setPosState({ x: 500, y: 0 });
        }
    }

    const bindPos = useDrag(params => {

        let value;

        if (params._dragTarget.tagName == "DIV" && params._dragTarget.classList == "line") {
            if (isMobile) {
                value = params.offset[1];

                if(params.dragging){
                    if (value < -530) value = -530;
                    if (value > 0) value = 0;

                    pos.y.start(value);
                    setPosState((prev) => ({ ...prev, y: value }));
                    params.offset[1] = value;
                } else {
                    if(value < -250){
                        pos.y.start(-530);
                        setPosState((prev) => ({ ...prev, y: -530 }));
                        params.offset[1] = -530;  // usuwa różnicę pomiędzy stanem przeciągania a stanem upuszczenia 
                    } else {
                        pos.y.start(0);
                        setPosState((prev) => ({ ...prev, y: 0 }));
                        params.offset[1] = 0;
                    }
                }
            } else {
                value = params.offset[0];

                if (value < 0) value = 0;
                if (value > 430) value = 430;

                pos.x.start(value);
                setPosState((prev) => ({ ...prev, x: value }));
            }
        }
    })

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 850);
            pos.x.set(0);
            pos.y.set(0);
            setPosState({ x: 0, y: 0 });
        }

        handleResize();
        window.addEventListener("resize", handleResize);
    }, [])

    return (
        <>
            <Burger burgerRef={burgerRef} handleBurger={handleBurger} />
            <SearchBar />
            <SidePanel handleIconAnimation={handleIconAnimation}/>
            <Menu menuRef={menuRef} />
            <EventPanel
                pos={pos}
                bindPos={bindPos}
                isMobile={isMobile}
                setPosState={setPosState}
                component={component} />
        </>
    )
}
export default InterFace