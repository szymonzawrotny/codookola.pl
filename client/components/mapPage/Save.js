import "@/styles/mapPage/interface/panels/save.scss"
import { useSession } from 'next-auth/react'

const Login = ()=> <div className="Login">zaloguj</div>

const Save = ()=>{

    const {data:session} = useSession({
        required: false,
    })
    
    {
        if(session) return <div>Save</div>
        else return <Login/>
    }
}
export default Save;