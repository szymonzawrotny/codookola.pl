const User = ({one,index,isActive,setIsActive,setData})=>{

    const showUser = ()=>{
        setIsActive(!isActive) 
        setData(one)
    }

    return(
        <div className="user" key={index }>
            {index+1}. {one.email} 
            <button
                onClick={showUser}>
                    {isActive? "ukryj" : "pokaż"}</button>
        </div>
    )
}
export default User;