const Post = ({one,index})=>{

    const showEvent = ()=>{
        console.log("siema pokaż event")
    }

    return(
        <div className="postToAccept">
            {index+1}. {one.nazwa} 
            <button
                onClick={showEvent}>
                    sprawdź</button>
        </div>
    )
}
export default Post;