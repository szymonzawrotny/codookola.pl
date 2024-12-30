const PostToAccept = ({one,index,isActive, setIsActive,setData})=>{

    const showEvent = ()=>{
        setIsActive(!isActive) 
        setData(one)
    }

    return(
        <div className="postToAccept">
            {index+1}. {one.nazwa} 
            <button
                onClick={showEvent}>
                    {isActive? "ukryj" : "pokaż"}</button>
        </div>
    )
}
export default PostToAccept;