import "@/styles/mapPage/interface/panels/add.scss"
import { useSession } from 'next-auth/react'

const Login = ()=> <div className="Login">zaloguj</div>

const Add = ()=>{

    const {data:session} = useSession({
        required: false,
    })
    
    if(session){
        return(
            <div className="add">
                <h1>Dodaj wydarzenie!</h1>
            </div>
        )
    } else {
        return <Login/>
    }
}
export default Add;