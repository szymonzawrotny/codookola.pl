import "@/styles/userpanel/panel.scss"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { BiLogOutCircle } from "react-icons/bi";
import { BsChatText } from "react-icons/bs";
import { MdEventNote } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { FaRegUserCircle, FaHome, FaRegBell } from "react-icons/fa";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";


const Panel = ({children})=>{

    const router = useRouter();

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }
    })

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

    return(
        <div className="logged">
            <nav>
                <div className="logo">
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
                <div className="option" onClick={handleOption}>
                    <BiLogOutCircle/>
                    log out
                </div>
                <div className="add">
                    zapraszam na nasz serwer discord?
                    <button>dołącz</button>
                </div>
            </nav>
            <main>
                <header>
                    <div className="userInfo">
                        <FaRegUserCircle />
                        {session?.user?.email?.email}
                    </div>
                    <div className="space"></div>
                    <div className="search">
                        <input type="text" placeholder="search"/>
                        <HiOutlineMagnifyingGlass/>
                    </div>
                    <div className="alerts">
                        <FaRegBell/>
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