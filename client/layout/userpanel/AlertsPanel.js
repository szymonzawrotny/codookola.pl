import {useState,useEffect} from 'react';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import "@/styles/userpanel/alertsPanel.scss"
import Alert from '@/components/userpanel/Alert';

const AlertsPanel = ({alertPanelRef})=>{

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }
    })

    const [list,setList] = useState([]);
    const [content,setContent] = useState("");

    const fetchData = async ()=>{
        const response = await fetch("http://localhost:5000/getalerts",{
            method: "POST",
            body: JSON.stringify({
                id: session?.user?.email?.id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.ok){
            const data = await response.json();
            setList(data.answer)
        } else {
            console.log("coś nie poszło")
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    const elements = list.map((one,index)=>{
        return <Alert content={one.content}/>
    })

    return(
        <div className="alertsPanel" ref={alertPanelRef}>
            <h2>powiadomienia</h2>
            {
                    elements.length >0 ? elements : <div className="empty">brak powiadomień</div>
            }
        </div>
    )
}
export default AlertsPanel;