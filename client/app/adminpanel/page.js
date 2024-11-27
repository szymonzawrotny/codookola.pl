"use client"
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RxHamburgerMenu } from "react-icons/rx";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineManageAccounts,  MdOutlinePrivacyTip } from "react-icons/md";
import "@/styles/adminpanel/style.scss"

import ToAccept from '@/components/adminpanel/ToAccept';
import Posts from '@/components/adminpanel/Posts';
import Reported from '@/components/adminpanel/Reported';
import Users from '@/components/adminpanel/Users';

const Home = ()=>{

    const router = useRouter();
    const [component,setComponent] = useState(<ToAccept/>)

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }
    })

    const burgerRef = useRef();

    const handleOption = (e)=>{
        [...document.querySelectorAll(".adminOption")].forEach(one => {
            one.classList.remove("active");
        })
        e.target.classList.add("active");

        const type = e.target.getAttribute("data-component")
        switch(type){
            case "ToAccept":{
                setComponent(<ToAccept/>)
            } break;
            case "Reported":{
                setComponent(<Reported/>)
            } break;
            case "Users":{
                setComponent(<Users/>)
            } break;
            case "Posts":{
                setComponent(<Posts/>)
            } break;
        }
    }

    const handleBurger = ()=>{
        burgerRef.current.classList.toggle("active")
    }

    useEffect(()=>{
        if(session)
            if(session?.user?.email?.id != 2167)
                router.push("/")
    })

    const isLogged = (session && session?.user?.email?.id == 2167) ? (
        <div className="adminpanel">
            <div className="adminInfo">
                <Link href="/map">
                    <FiMapPin />
                </Link>
                <Link href="/userpanel">
                    <MdOutlineManageAccounts />
                </Link>
                <Link href="/policy">
                    <MdOutlinePrivacyTip />
                </Link>
                <span>
                    {session?.user?.email?.email}
                </span>
            </div>
            <aside ref={burgerRef}>
                <div 
                    className="adminOption active"
                    data-component="ToAccept" 
                    onClick={handleOption}>akceptuj</div>
                <div 
                    className="adminOption" 
                    data-component="Reported"
                    onClick={handleOption}>zgłoszenia</div>
                <div 
                    className="adminOption" 
                    data-component="Users"
                    onClick={handleOption}>użytkownicy</div>
                <div 
                    className="adminOption" 
                    data-component="Posts"
                    onClick={handleOption}>posty</div>
            </aside>
            <div className="burger" onClick={handleBurger}>
                <RxHamburgerMenu />
            </div>
            <main>
                {component}
            </main>
        </div>
    ) : (
        <div className="noLoggedError">
            zaloguj po więcej...
        </div>
    );

    return (
        <>
            {isLogged}
        </>
    )
}
export default Home;