import { useRouter } from "next/navigation";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaUnlockAlt } from "react-icons/fa";
import { TiArrowRepeat } from "react-icons/ti";

const REgisterForm = ()=>{

    const router = useRouter();

    const handleFormSend = (e)=>{
        e.preventDefault();
        router.push("/map");
    }

    return(
        <form onSubmit={handleFormSend} className="register">
            <div className="input">
                <IoPersonCircleOutline size={42} style={{color:"#222"}}/>
                <input type="text" placeholder="Email" />
            </div>
            <div className="input">
                <FaUnlockAlt size={34} style={{color:"#222",marginLeft: "4px"}}/>
                <input type="password" placeholder="Password"/>
            </div>
            <div className="input">
                <TiArrowRepeat size={34} style={{color:"#222",marginLeft: "4px"}}/>
                <input type="password" placeholder="Repeat Password"/>
            </div>
            <div className="down">
                <span></span>
                <input type="submit" value="NEXT" />
            </div>
        </form>
    )
}
export default REgisterForm;