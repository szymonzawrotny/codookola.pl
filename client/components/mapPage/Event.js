import { SlOptions } from "react-icons/sl";
import { FaRegUserCircle,FaRegHeart, FaRegBookmark } from "react-icons/fa";
import SwiperBox from "./SwiperBox";

const Event = ({author,name})=>{
    return(
        <div className="event">
            <div className="options"><SlOptions size={28}/></div>
            <div className="userData">
                <div className="icon"><FaRegUserCircle/></div>
                <div className="name">{author}</div>
            </div>
            <div className="photos">
                <SwiperBox/>
            </div>
            <div className="title">
                <span>{name}</span>
            </div>
            <div className="buttons">
                <div className="like">
                    <FaRegHeart/>
                </div>
                <div className="save">
                    <FaRegBookmark/>
                </div>
                <button className="check">sprawdź</button>
            </div>
        </div>
    )
}
export default Event;