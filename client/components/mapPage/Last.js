import "@/styles/mapPage/interface/panels/last.scss"
import { useSession } from 'next-auth/react'

const Login = ()=> <div className="Login">zaloguj</div>

const Last = ()=>{

    const {data:session} = useSession({
        required: false,
    })
    
    {
        if(session) return <div>Last</div>
        else return <Login/>
    }
}
export default Last;