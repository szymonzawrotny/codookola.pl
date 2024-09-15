const Chapter = ({tittle,text})=>{
    return(
        <div className="chapter">
            <div className="tittle">
                {tittle}
            </div>
            <div className="text">
                {text}
            </div>
        </div>
    )
}
export default Chapter;