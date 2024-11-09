"use client"
import { useState, useEffect, useRef} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import "@/styles/userpanel/support.scss"

const Home = ()=>{

    const router = useRouter();

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }
    })

    const [title,setTitle] = useState("")
    const [email,setEmail] = useState(String(session?.user?.email?.email));
    const [message,setMessage] = useState("");
    const [formText,setFormText] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if(email !== "" && message !== ""){
            setMessage("");
            setTitle("");
            setFormText("Wysłano!");

            fetch("http://localhost:5000/send",{
                method:"POST",
                body: JSON.stringify({
                    email,
                    message,
                    title,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } else{
            setFormText("Hej, zanim wyślesz: wpisz swój email i napisz wiadomość")
        }
    }

    useEffect(()=>{
        [...document.querySelectorAll(".option")].forEach((one,index)=>{
            if(index == 4) one.classList.add("active");
            else one.classList.remove("active");
        })

        console.log(session?.user?.email?.email)
    },[])

    return(
        <div className='support'>
            <div className="supportForm">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Tytuł...' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    <select>
                        <option value="pierwsze">pierwsze</option>
                        <option value="drugie">drugie</option>
                        <option value="trzecie">trzecie</option>
                        <option value="czwarte">czwarte</option>
                    </select>
                    <textarea value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Treść wiadomości...'></textarea>
                    <input type="submit" value="wyślij!" />
                </form>
            </div>
            <div className="supportText">
                <h1>Masz jakiś problem?</h1>
                <h2>lub chcesz podzielić się opinią?</h2>
                <p className='up'>Jesteśmy tutaj, aby pomóc! Jeśli napotkałeś problem, masz pytanie, albo chcesz podzielić się swoim doświadczeniem, po prostu wypełnij formularz kontaktowy poniżej. Nasz zespół wsparcia skontaktuje się z Tobą najszybciej, jak to możliwe.</p>
                <p className="bottom">Twoje sugestie i uwagi są dla nas bardzo cenne – dzięki nim możemy stale ulepszać naszą stronę i lepiej spełniać Twoje oczekiwania.</p>
            </div>
        </div>
    )
}
export default Home;