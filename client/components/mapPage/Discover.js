import "@/styles/mapPage/interface/panels/discover.scss"
import { SlOptions } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";

const Discover = ()=>{
    return(
        <div className="discover">
            <div className="search">
                search
            </div>
            <div className="eventList">
                <div className="event">
                    <div className="options"><SlOptions size={28}/></div>
                    <div className="userData">
                        <div className="icon"><FaRegUserCircle/></div>
                        <div className="name">szymonzawrotny@gmail.com</div>
                    </div>
                    <div className="photos">2</div>
                    <div className="title">3</div>
                </div>
                <div className="event">dwa</div>
                <div className="event">trzy</div>
                <div className="event">cztery</div>
            </div>
        </div>
    )
}
export default Discover;