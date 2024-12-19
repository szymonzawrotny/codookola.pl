import { FaRegUserCircle} from "react-icons/fa";

const Comment = ({value,username})=>{
    return(
        <div className="comment">
            <header>
                 <div className="icon">
                    <FaRegUserCircle />
                </div>
                <div className="name">{username}</div>
            </header>
            <main>
                {value}
            </main>
        </div>
    )
}
export default Comment;