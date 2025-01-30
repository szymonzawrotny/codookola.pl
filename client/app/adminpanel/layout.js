"use client"
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RxHamburgerMenu } from "react-icons/rx";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineManageAccounts,  MdOutlinePrivacyTip } from "react-icons/md";
import "@/styles/adminpanel/style.scss"
import AdminPanel from "@/components/adminpanel/AdminPanel";


export default function RootLayout({ children }) {
    const router = useRouter();
    
    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }
    })

    useEffect(()=>{
        if(session)
            if(session?.user?.email?.role != "admin")
                router.push("/")
    })

    return(
        (session && session?.user?.email?.role == "admin") ? (
            <AdminPanel children={children}/>
        ) : (<div className="noLoggedError">zaloguj po więcej...</div>)
    )
}