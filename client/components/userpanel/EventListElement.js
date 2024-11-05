import { IoIosArrowDown } from "react-icons/io";

const EventListElement = ({handleEventElement,name,number})=>{
    return(
        <div className="event" onClick={handleEventElement}>
            <span>{`${number+1}. ${name.toUpperCase()}`}<IoIosArrowDown /></span>
            <div className="eventButtons">
                <div className="show">show</div>
                <div className="edit">edit</div>
                <div className="delete">delete</div>
            </div>
        </div>
    )
}
export default EventListElement