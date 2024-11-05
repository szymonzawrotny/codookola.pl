'use client'
import { useState } from 'react';
import Calendar from 'react-calendar';
import "@/styles/userPanel/home.scss";
import 'react-calendar/dist/Calendar.css';

import InfoChart from '@/components/userpanel/InfoChart';

const Home = ()=>{

    const [value, onChange] = useState(new Date());

    return(
        <div className="homeContent">
            <div className="hello">
                <h2>Witaj w Panelu Użytkownika!</h2>
                <p>Tutaj możesz zarządzać wszystkimi aspektami swojego konta i wydarzeń promowanych na naszej interaktywnej mapie. Sprawdzaj statystyki, analizuj popularność swoich wydarzeń i obserwuj, jak angażują się w nie użytkownicy. Panel pozwala Ci na bieżąco aktualizować informacje o wydarzeniach, dostosowywać je do oczekiwań odbiorców, a także zapewnia pełną kontrolę nad ustawieniami konta, co pozwala Ci zadbać o ich bezpieczeństwo i aktualność. Jeśli napotkasz jakiekolwiek trudności, szybko zgłosisz je bezpośrednio z panelu, a my zajmiemy się ich rozwiązaniem, aby Twoje doświadczenia z naszą platformą były jak najlepsze. <span>Cieszymy się, że jesteś z nami!</span> </p>
            </div>
            <div className="homeOptions">
                <div className="calendar">
                    <Calendar value={value}/>
                </div>
                <div className="homeChart">
                    <InfoChart/>
                </div>
                <button className="goToMap">sprawdź mapy!</button>
            </div>
        </div>
    )
}
export default Home;