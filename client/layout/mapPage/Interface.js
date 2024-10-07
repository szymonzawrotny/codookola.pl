'use client'
import { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring'
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

const InterFace = () => {

    const burgerRef = useRef();
    const menuRef = useRef();
    const [component, setComponent] = useState(<Save />);

    const pos = useSpring({ x: 0, y: 0 });
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
            case "discover": setComponent(<Discover />);
                break;
            case "save": setComponent(<Save />);
                break;
            case "last": setComponent(<Last />);
                break;
            case "add": setComponent(<Add />);
                break;
        }
    }

    const bindPos = useDrag(params => {

        let value;

        if (params._dragTarget.tagName == "DIV" && params._dragTarget.classList == "line") {
            if (isMobile) {
                value = params.offset[1];

                if (value < -400) value = -400;
                if (value > 0) value = 0;
                console.log(value);

                pos.y.start(value);
            } else {
                value = params.offset[0];

                if (value < 0) value = 0;
                if (value > 400) value = 400;

                pos.x.start(value);
            }
        }
    })

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 850);
            pos.x.set(0);
            pos.y.set(0);
        }

        handleResize();
        window.addEventListener("resize", handleResize);
    }, [])

    return (
        <>
            <Burger burgerRef={burgerRef} handleBurger={handleBurger} />
            <SearchBar />
            <SidePanel handleIconAnimation={handleIconAnimation} pos={pos} />
            <Menu menuRef={menuRef} />
            <EventPanel
                pos={pos}
                bindPos={bindPos}
                isMobile={isMobile}
                component={component} />
        </>
    )
}
export default InterFace