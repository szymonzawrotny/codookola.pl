"use client"
import "@/styles/policyPage/policy.scss";
import Chapter from "@/components/policyPage/Chapter";

const Policy = ()=>{

    const chapterData = [
        {
            tittle: "Polityka prywatności:",
            text: "Niniejsza polityka prywatności i plików cookies określa zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies i innych technologii w serwisie internetowym szymonzawrotny.pl . Administratorem strony jest Szymon Zawrotny. Kontakt z administratorem możliwy jest pod adresem: szymonzawrotny@gmail.com."
        },
        {
            tittle: "Dane osobowe, które zbieramy:",
            text: `Podczas rejestracji na naszym portalu zbieramy następujące dane: adres e-mail oraz hasło. Po zalogowaniu gromadzimy również dane dotyczące lokalizacji, które są niezbędne do prawidłowego działania interaktywnej mapy wyświetlającej wydarzenia w pobliżu użytkownika. Użytkownicy mogą także dodawać wydarzenia, podając lokalizację, datę i godzinę wydarzenia.`
        },
        {
            tittle: "Cele przetwarzania danych:",
            text: `Gromadzimy i przetwarzamy Twoje dane w następujących celach: Umożliwienie rejestracji i logowania do portalu, wyświetlanie wydarzeń na interaktywnej mapie na podstawie lokalizacji użytkownika, przechowywanie i zarządzanie dodanymi wydarzeniami, optymalizacja działania serwisu oraz analiza ruchu za pomocą Google Analytics, umożliwienie użytkownikom edycji swoich danych, usunięcia konta oraz dodanych wydarzeń.`
        },
        {
            tittle: "Udostępnianie danych:",
            text: "Twoje dane osobowe nie są udostępniane podmiotom trzecim, chyba że wymagają tego przepisy prawa lub jest to niezbędne do realizacji celów opisanych powyżej. W celu analizy ruchu na stronie korzystamy z Google Analytics, który może przetwarzać zanonimizowane dane użytkowników."
        },
        {
            tittle: "Technologie śledzenia:",
            text: "Na naszej stronie używamy plików cookies i podobnych technologii, aby zbierać informacje o aktywności użytkowników i optymalizować funkcjonowanie serwisu. Preferencje dotyczące cookies można zarządzać w ustawieniach przeglądarki."
        },
        {
            tittle: "Prawa użytkowników:",
            text: `Każdy użytkownik ma prawo do: Dostępu do swoich danych osobowych, edycji swoich danych osobowych, usunięcia konta, usunięcia dodanych wydarzeń, wycofania zgody na przetwarzanie danych w dowolnym momencie (dotyczy danych lokalizacyjnych). Aby skorzystać z tych praw, prosimy o kontakt pod adresem: szymonzawrotny@gmail.com.`
        },
        {
            tittle: "Bezpieczeństwo danych:",
            text: "Administrator wdraża odpowiednie środki techniczne i organizacyjne w celu zapewnienia ochrony danych osobowych użytkowników. Dane są przechowywane w systemie baz danych, który spełnia standardy bezpieczeństwa i ochrony informacji, minimalizując ryzyko nieautoryzowanego dostępu, utraty lub zniszczenia danych."
        },
        {
            tittle: "Zmiany w polityce prywatności:",
            text: "Zastrzegamy sobie prawo do aktualizacji niniejszej polityki prywatności. Wszelkie zmiany będą publikowane na tej stronie, a o istotnych zmianach poinformujemy użytkowników za pomocą powiadomienia."
        },
        {
            tittle: "Kontakt:",
            text: "Jeśli masz jakiekolwiek pytania dotyczące naszej polityki prywatności, skontaktuj się z nami pod adresem: szymonzawrotny@gmail.com."
        },
    ]

    const elements = chapterData.map(one=>{
        return <Chapter tittle={one.tittle} text={one.text} key={one.tittle}/>
    })

    return(
        <div className="policyPage">
            <header>
                <span className="title">
                    polityka prywatności
                </span>
                <span className="subTitle">
                    oświadczenie dotyczące danych osobowych, pliki cookies, podmioty trzecie
                </span>
            </header>
            <main>
                <div className="policyWave1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#FFE97F" fillOpacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,176C560,149,640,75,720,90.7C800,107,880,213,960,240C1040,267,1120,213,1200,197.3C1280,181,1360,203,1400,213.3L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
                    </svg>
                </div>
                <div className="policyContent">
                    {elements}
                </div>
                <div className="policyWave2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#FFE97F" fillOpacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,176C560,149,640,75,720,90.7C800,107,880,213,960,240C1040,267,1120,213,1200,197.3C1280,181,1360,203,1400,213.3L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
                    </svg>
                </div>
            </main>
            <footer></footer>
        </div>
    )
}
export default Policy;