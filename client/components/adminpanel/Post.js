const Post = ({one,index})=>{
    return(
        <div className="postToAccept">{index+1}. {one.nazwa} <button>sprawdź</button> </div>
    )
}
export default Post;