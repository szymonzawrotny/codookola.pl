import { MdPlace, MdEventNote } from "react-icons/md";
import { AiFillPushpin } from "react-icons/ai";
import { PiCityBold } from "react-icons/pi";
import { HiMagnifyingGlass } from "react-icons/hi2";

const General = ({desc,address,city,date,eventType})=>{
    return(
         <>
            <p className="description">{desc}</p>
            <div className="detailInfoPanel"><MdPlace /> {address}</div>
            <div className="detailInfoPanel"><PiCityBold /> {city}</div>
            <div className="detailInfoPanel"><MdEventNote /> {date}</div>
            <div className="detailInfoPanel"><AiFillPushpin /> {eventType}</div>
         </>
    )
}
const Opinions = ()=>{
    return(
         <>
            opiniee
         </>
    )
}

const Chatbot = ()=>{
    return(
         <>
            <div className="chat">
                <div className="userQuestion">siema jaki mamy klimat</div>
                <div className="chatResponse">umiarkowany chyba</div>
            </div>
            <div className="askQuestion">
                <input type="text" placeholder="zadaj pytanie..."/>
                <HiMagnifyingGlass/>
            </div>
         </>
    )
}

export {General,Opinions,Chatbot};