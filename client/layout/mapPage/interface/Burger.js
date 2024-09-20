import "@/styles/mapPage/interface/burger.scss";

const Burger = ({handleBurger, burgerRef})=>{
    return(
        <div className="burgerBox">
            <div className="burger" ref={burgerRef} onClick={handleBurger}>
                <span></span>
            </div>
        </div>
    )
}
export default Burger;