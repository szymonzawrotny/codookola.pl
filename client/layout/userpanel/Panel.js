import "@/styles/userpanel/panel.scss"
import { BiLogOutCircle } from "react-icons/bi";
import { BsChatText } from "react-icons/bs";
import { MdEventNote } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { FaRegUserCircle, FaHome, FaRegBell } from "react-icons/fa";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";


const Panel = ()=>{

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
                    logo
                </div>
                <div className="option  active" onClick={handleOption}>
                    <FaHome />
                    home
                </div>
                <div className="option" onClick={handleOption}>
                    <FaRegUserCircle />
                    info
                </div>
                <div className="option" onClick={handleOption}>
                    <IoStatsChart size={24}/>
                    stats
                </div>
                <div className="option" onClick={handleOption}>
                    <MdEventNote/>
                    events
                </div>
                <div className="option" onClick={handleOption}>
                    <BsChatText size={22} style={{marginLeft:"22px"}}/>
                    support
                </div>
                <div className="option" onClick={handleOption}>
                    <BiLogOutCircle/>
                    log out
                </div>
                <div className="add">
                    tutaj jakiś tekst fajny
                </div>
            </nav>
            <main>
                <header>
                    <div className="userInfo">
                        <FaRegUserCircle />
                        szymonzawrotny@gmail.com
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
                    siema
                </div>
            </main>
        </div>
    )
}
export default Panel;