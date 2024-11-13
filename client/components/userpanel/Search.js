import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import "@/styles/userpanel/search.scss"

const Search = ({searchInputRef,handleSearch,searchRef})=>{
    return(
        <div className="search" ref={searchInputRef}>
            <input type="text" placeholder="szukaj..." onClick={handleSearch}/>
            <HiOutlineMagnifyingGlass/>
            <div className="searchPanel" ref={searchRef}>
                <div className="searchPanelOption">siema</div>
                <div className="searchPanelOption">siema</div>
                <div className="searchPanelOption">siema</div>
            </div>
        </div>
    )
}
export default Search;