const User = ({one,index})=>{

    const showUser = ()=>{
        console.log("siema pokaż użytkownika")
    }

    return(
        <div className="user" key={index}>
            {index+1}. {one.email} 
            <button
                onClick={showUser}
                    >sprawdź</button>
        </div>
    )
}
export default User;