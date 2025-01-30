'use client'
import Link from 'next/link';
import LoginForm from '@/components/homePage/LoginForm.js';
import RegisterForm from '@/components/homePage/RegisterForm';

import { FaArrowRight } from "react-icons/fa";
import "@/styles/homePage/rightPanel.scss";

const RightPanel = ({headerText})=>{

    const form = headerText=="zaloguj"?<LoginForm/>:<RegisterForm/>;

    return(
        <div className="rightPanel">
            <div className="wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
                    <path fill="#FFE97F" fillOpacity="1" d="M0,96L60,117.3C120,139,240,181,360,170.7C480,160,600,96,720,96C840,96,960,160,1080,197.3C1200,235,1320,245,1380,250.7L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>
            </div>
            <div className="logo"></div>
            <div className="title">{headerText}</div>
            {form}
            <footer>
                <Link href="/policy" className="policy">
                    polityka prywatności <FaArrowRight/>
                </Link>
            </footer>
        </div>
    )
}
export default RightPanel;