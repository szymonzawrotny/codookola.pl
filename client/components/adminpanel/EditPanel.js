"use client"
import {useState,useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const EditPanel = ({data})=>{

    const router = useRouter();

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }
    })

    const [value,setValue] = useState("user")

    const handleChange = async e =>{

        const type = e.target.getAttribute("data-type");

        const response = await fetch("http://localhost:5000/edituserdata",{
            method: "POST",
            body: JSON.stringify({
                id: data.user_id,
                type,
                value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            console.log("coś nie poszło")
        } else {
            const data = await response.json();
            document.querySelector(".adminAlert").textContent = data.message;
            document.querySelector(".adminAlert").classList.add("active");

            setTimeout(()=>{
                document.querySelector(".adminAlert").classList.remove("active");
            },5000)
            
            console.log(data.message);
        }
    }

    const deleteUser = async ()=>{
        const response = await fetch("http://localhost:5000/deleteuser",{
            method: "POST",
            body: JSON.stringify({
                id: data.user_id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            console.log("coś nie poszło")
        } else {
            const data = await response.json();

            document.querySelector(".adminAlert").textContent = data.message;
            document.querySelector(".adminAlert").classList.add("active");

            setTimeout(()=>{
                document.querySelector(".adminAlert").classList.remove("active");
            },5000)
            console.log(data.message);
        }
    }

    return(
        <div className="content">
            <h2>{data.email}</h2>
            <p>{`Rola użytkownika: ${data.role}`}</p>
            <p>{`Pozostała liczba zapytań do chatbota: ${data.chat_number}`}</p>
            <p>{`Imię: ${data.name && data.name.trim() ? data.name : "brak"}`}</p>
            <p>{`Nazwisko: ${data.lastname && data.lastname.trim() ? data.lastname : "brak"}`}</p>
            <p>{`Wiek: ${data.age ? data.age : "brak"}`}</p>
            <p>{`Miasto: ${data.city && data.city.trim() ? data.city : "brak"}`}</p>
            <div className="grant">
                <div className="changePrivilage">
                    <select onChange={(e)=>setValue(e.target.value)}>
                        <option value="user">user</option>
                        <option value="moderator">moderator</option>
                        <option value="admin">admin</option>
                    </select>
                    <button onClick={handleChange} data-type="role">zmień</button>
                </div>
                {
                    data.role!=="admin" && (<div className="delete">
                        <button onClick={deleteUser}>usuń użytkownika</button>
                    </div>)
                }
            </div>
        </div>
    )
}
export default EditPanel;