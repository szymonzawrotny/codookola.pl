'use client'
import "./style.scss"

import LeftPanel from "@/layout/homePage/LeftPanel";
import RightPanel from "@/layout/homePage/RightPanel";

const Home = ()=>{
    return(
        <div className="home">
            <LeftPanel/>
            <RightPanel/>
        </div>
    )
}
export default Home;