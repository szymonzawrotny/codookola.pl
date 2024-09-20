import "@/styles/mapPage/interface/menu.scss"
import { MdOutlineManageAccounts,  MdOutlinePrivacyTip } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { RiMapPinUserFill } from "react-icons/ri";

const Menu = ({menuRef})=>{
    return(
        <aside className="menu" ref={menuRef}>
            <div className="element">
                cod<span style={{color:"#FFE97F"}}>oo</span>kola.pl
            </div>
            <div className="element">
                <MdOutlineManageAccounts />
                Twój profil
            </div>
            <div className="element">
                <RiMapPinUserFill/>
                Twoje wydarzenia
            </div>
            <div className="element">
                <MdOutlinePrivacyTip/>
                Polityka prywatności
            </div>
            <div className="element">
                <BiLogOutCircle />
                Wyloguj
            </div>
        </aside>
    )
}
export default Menu;