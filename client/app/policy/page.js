"use client"
import "@/styles/policyPage/policy.scss";
import Chapter from "@/components/policyPage/Chapter";

const Policy = ()=>{

    const chapterData = [
        {
            tittle: "Privacy Policy:",
            text: "This privacy policy and cookies policy outlines the principles of processing personal data and the use of cookies and other technologies on the website szymonzawrotny.pl . The administrator of the site is Szymon Zawrotny. You can contact the administrator at: szymonzawrotny@gmail.com."
        },
        {
            tittle: "Personal Data We Collect:",
            text: `When registering on our portal, we collect the following data: Email address and password. After logging in, we also collect location data, which is necessary for the proper functioning of the interactive map displaying events in the user's vicinity.

            Users can also add events by providing the location, date, and time of the event.`
        },
        {
            tittle: "Purposes of Data Processing:",
            text: `We collect and process your data for the following purposes: Enabling registration and login to the portal, displaying events on the interactive map based on the user's location, storing and managing added events, optimizing website performance and analyzing traffic through Google Analyticss, allowing users to edit their data, delete their account, and remove added events.`
        },
        {
            tittle: "Data Sharing:",
            text: "Your personal data is not shared with third parties unless required by law or necessary to fulfill the purposes described above. For website traffic analysis, we use Google Analytics, which may process anonymized user data."
        },
        {
            tittle: "Tracking Technologies:",
            text: "We use cookies and similar technologies on our website to collect information about user activity and optimize the website's functionality. You can manage your cookie preferences in your browser settings."
        },
        {
            tittle: "User Rights:",
            text: `Every user has the right to:
            Access their personal data, edit their personal data, delete their account, delete events they have added, withdraw consent for data processing at any time (applies to location data).
            To exercise your rights, please contact us at szymonzawrotny@gmail.com.`
        },
        {
            tittle: "Data Security:",
            text: "The administrator implements appropriate technical and organizational measures to ensure the protection of users' personal data. Data is stored in a database system that meets security and information protection standards, minimizing the risk of unauthorized access, loss, or destruction of data."
        },
        {
            tittle: "Changes to the Privacy Policy:",
            text: "We reserve the right to update this privacy policy. Any changes will be published on this page, and we will inform users of significant changes through a notification."
        },
        {
            tittle: "Contact:",
            text: "If you have any questions regarding our privacy policy, please contact us at: szymonzawrotny@gmail.com."
        },
    ]

    const elements = chapterData.map(one=>{
        return <Chapter tittle={one.tittle} text={one.text} key={one.tittle}/>
    })

    return(
        <div className="policyPage">
            <header>
                <span className="title">
                    privacy policy
                </span>
                <span className="subTitle">
                    our personal statement, cookies, third-parties
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