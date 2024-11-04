"use client"
import { useState, useEffect, useRef} from 'react';
import "@/styles/userpanel/support.scss"

const Home = ()=>{

    useEffect(()=>{
        [...document.querySelectorAll(".option")].forEach((one,index)=>{
            if(index == 4) one.classList.add("active");
            else one.classList.remove("active");
        })
    },[])

    return(
        <div className='support'>
            <div className="supportForm">
                <form action="">
                    <input type="text" placeholder='Tytuł...'/>
                    <select>
                        <option value="pierwsze">pierwsze</option>
                        <option value="drugie">drugie</option>
                        <option value="trzecie">trzecie</option>
                        <option value="czwarte">czwarte</option>
                    </select>
                    <textarea name="" id=""placeholder='Treść wiadomości...'></textarea>
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