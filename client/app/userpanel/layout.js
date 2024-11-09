'use client'
import "@/styles/userPanel/userPanel.scss";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Panel from "@/layout/userpanel/Panel";
import AuthProvider from "../context/AuthProvider";

export default function RootLayout({ children }) {
    const router = useRouter();

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }

    })

    const isLogged = session ? (
        <Panel children={children}/>
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