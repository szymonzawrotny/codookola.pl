import "@/styles/mapPage/interface/searchBar.scss"
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchBar = ()=>{

    return(
        <div className="searchBar">
            <div className="search">
                <div className="logo"></div>
                <input type="text" placeholder="Search location"/>
                <HiOutlineMagnifyingGlass size={32}/>
            </div>
        </div>
    )
}
export default SearchBar;