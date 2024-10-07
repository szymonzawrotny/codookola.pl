import "@/styles/mapPage/interface/eventPanel.scss";
import { animated } from 'react-spring'
import { IoClose } from "react-icons/io5";

const EventPanel = ({ component, pos, bindPos, isMobile}) => {

    return (
        <animated.div
            className="eventPanel"
            {...bindPos()}
            style={isMobile ? { y: pos.y } : { x: pos.x }}>

            <div className="line"></div>
            {/* {component} */}

        </animated.div>
    )
}
export default EventPanel;
