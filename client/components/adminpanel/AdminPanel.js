"use client"

import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlineReportProblem } from "react-icons/md";
import { FaRegCalendarAlt, FaUsers,FaMapMarkerAlt  } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";

const AdminPanel = ({children})=>{

    const router = useRouter();
    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }
    })

    const logout = ()=>{
        signOut({ callbackUrl: "/" })
    }

    return (
        <div className="adminpanel">
            <nav>
                <Link href="/adminpanel" className="navOption">
                    <AiOutlineCheck />
                    akceptuj
                </Link>
                <Link href="/adminpanel/reports" className="navOption">
                    <MdOutlineReportProblem />
                    zgłoszone
                </Link>
                <Link href="/adminpanel/events" className="navOption">
                    <FaRegCalendarAlt />
                    wydarzenia
                </Link>
                <Link href="/adminpanel/users" className="navOption">
                    <FaUsers />
                    użytkownicy
                </Link>
                <Link href="/map" className="navOption">
                    <FaMapMarkerAlt/>
                    mapy
                </Link>
                <div className="navOption" onClick={logout}>
                    <BiLogOutCircle />
                    wyloguj
                </div>
            </nav>
            <main>{children}</main>
            <div className="adminWindow">{session?.user?.email?.email}</div>
            <div className="adminAlert"></div>
        </div>
    )
}
export default AdminPanel