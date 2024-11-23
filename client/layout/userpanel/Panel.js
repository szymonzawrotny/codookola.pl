import "@/styles/userpanel/panel.scss"

import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { BiLogOutCircle } from "react-icons/bi";
import { BsChatText } from "react-icons/bs";
import { MdEventNote } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { FaRegUserCircle, FaHome, FaBell, FaRegBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

import Search from "@/components/userpanel/Search";
import AlertsPanel from "./AlertsPanel";


const Panel = ({children})=>{

    const router = useRouter();
    const alertRef = useRef();
    const alertPanelRef = useRef();
    const searchRef= useRef();
    const searchInputRef = useRef();

    const [bellIcon,setBellIcon] = useState(true);

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }
    })

    const [iconPath,setIconPath] = useState(false)
    const fetchIcon = async ()=>{
        const response = await fetch("http://localhost:5000/icons")
        .then(response=>response.json())
        .then(data=>{
            data.forEach(one=>{
                if(one.user_id === session?.user?.email?.id){
                    setIconPath(`http://localhost:5000${one.path}`)
                }
            })
        })
    }

    const logout = ()=>{
        signOut({ callbackUrl: "/" })
    }

    const handleOption = (e)=>{

        [...document.querySelectorAll(".option")].forEach(one=>{
            one.classList.remove("active");
        })

        if(e.target.tagName == "svg"){
            e.target.parentNode.classList.add("active");
        } else if(e.target.tagName == "path"){
            e.target.parentNode.parentNode.classList.add("active");
        }else {
            e.target.classList.add("active");
        }

    }

    const handleAlertsButton = ()=>{
        alertRef.current.classList.toggle("active")
        alertPanelRef.current.classList.toggle("active")

        searchRef.current.classList.remove("active")
        searchInputRef.current.classList.remove("active")

        setBellIcon(!bellIcon)
    }

    const handleSearch = ()=>{
        console.log("szukam różnych rzeczy")
        searchRef.current.classList.toggle("active")
        searchInputRef.current.classList.toggle("active")

        alertRef.current.classList.remove("active")
        alertPanelRef.current.classList.remove("active")

        setBellIcon(true)
    }

    useEffect(()=>{
        fetchIcon();
    },[])

    return(
        <div className="logged">
            <nav>
                <div className="logo">
                    <div className="userIcon">
                        <FaUserCircle />
                    </div>
                    <div className="userData">
                        <span className="userName">Szymon Zawrotny</span>
                        <span className="userEmail">{session?.user?.email?.email}</span>
                    </div>
                    <div className="space"></div>
                    <div className="alerts">
                        <FaBell/>
                    </div>
                </div>
                <Link href="/userpanel" className="option active" onClick={handleOption}>
                    <FaHome />
                    home
                </Link>
                <Link href="/userpanel/info" className="option" onClick={handleOption}>
                    <FaRegUserCircle />
                    info
                </Link>
                <Link href="/userpanel/stats" className="option" onClick={handleOption}>
                    <IoStatsChart/>
                    stats
                </Link>
                <Link href="/userpanel/events" className="option" onClick={handleOption}>
                    <MdEventNote/>
                    events
                </Link>
                <Link href="/userpanel/support" className="option" onClick={handleOption}>
                    <BsChatText/>
                    support
                </Link>
                <div className="option" onClick={logout}>
                    <BiLogOutCircle/>
                    log out
                </div>
                <div className="add">
                    odkrywaj wydarzenia!
                    <button>
                        <Link href="/map" className="mapLink">sprawdź</Link>
                    </button>
                </div>
                <div className="line"></div>
            </nav>
            <main>
                <AlertsPanel alertPanelRef={alertPanelRef}/>
                <header>
                    <Search searchInputRef={searchInputRef} handleSearch={handleSearch} searchRef={searchRef}/>
                    <div className="space"></div>
                    <div className="userInfo">
                        {iconPath ? <div className="userIcon"><Image
                            src={iconPath} 
                            alt="siema"
                            width="1920" 
                            height="1080"/></div> : <FaRegUserCircle />}
                        {session?.user?.email?.email}
                    </div>
                    <div className="alerts" onClick={handleAlertsButton} ref={alertRef}>
                        {bellIcon ? <FaRegBell/>: <FaBell/>}
                    </div>
                </header>
                <div className="content">
                    {children}
                </div>
            </main>
        </div>
    )
}
export default Panel;