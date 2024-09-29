'use client'
import "@/styles/userPanel/userPanel.scss";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Panel from "@/layout/userpanel/Panel";

const Home = ()=>{

    const router = useRouter();

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }

    })

    const isLogged = session ? (
        <Panel/>
    ) : (
        <div className="noLoggedError">
            zaloguj po więcej...
        </div>
    );

    return(
        <div className="userPanel">
            { isLogged }
        </div>
    )
}
export default Home;