'use client'
import "@/styles/mapPage/interface/sidePanel.scss";
import { FaRegBookmark } from "react-icons/fa";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";

const SidePanel = ({handleIconAnimation})=>{

    return(
        <div className="sidePanel">
            <div 
                className="icon" 
                id="discover"
                onClick={handleIconAnimation}>
                    <FiMapPin size={26}/>
                    odkrywaj
            </div>
            <div 
                className="icon" 
                id="save"
                onClick={handleIconAnimation}>
                    <FaRegBookmark size={26}/>
                    zapisane
            </div>
            <div 
                className="icon"
                id="last" 
                onClick={handleIconAnimation}>
                    <RxCounterClockwiseClock size={26}/>
                    ostatnie
            </div>
            <div 
                className="icon"
                id="add" 
                onClick={handleIconAnimation}>
                    <IoAddCircleOutline size={26}/>
                    dodaj
            </div>
        </div>
    )
}
export default SidePanel;