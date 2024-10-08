import "@/styles/mapPage/interface/eventPanel.scss";
import { animated } from 'react-spring'
import { IoClose } from "react-icons/io5";

const EventPanel = ({ component, pos, bindPos, isMobile}) => {

    const closePanel = ()=>{
        [...document.querySelectorAll(".icon")].forEach(one=>{
            one.classList.remove("active");
        })

        if(isMobile){
            pos.y.start(0);
        } else {
            pos.x.start(0);
        }
    }

    return (
        <animated.div
            className="eventPanel"
            {...bindPos()}
            style={isMobile ? { y: pos.y } : { x: pos.x }}>

            <div className="line"></div>
            <div className="close" onClick={closePanel}>
                <IoClose/>
            </div>
            {component}

        </animated.div>
    )
}
export default EventPanel;
