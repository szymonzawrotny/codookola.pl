import "@/styles/mapPage/interface/eventPanel.scss";
import { IoClose } from "react-icons/io5";

const EventPanel = ({eventPanelRef, component})=>{

    const closePanel = ()=>{
        eventPanelRef.current.classList.remove("active");

        [...document.querySelectorAll(".icon")].forEach(one=>{
            one.classList.remove("active");
        })
    }

    return(
        <div className="eventPanel" ref={eventPanelRef}>
            <div className="close" onClick={closePanel}>
                <IoClose />
            </div>
            {component}
        </div>
    )
}
export default EventPanel;