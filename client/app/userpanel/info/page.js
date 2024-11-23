"use client"
import { useState, useEffect, useRef} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import "@/styles/userpanel/info.scss"
import Image from 'next/image';

import InfoChart from '@/components/userpanel/InfoChart';

const Home = ()=>{

    const router = useRouter();

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }

    })

    const [file, setFile] = useState(null);
    const [iconPath,setIconPath] = useState(`/images/dog.jpg`)

    const handleForm = async e =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file); // tutaj przesyłasz plik
        formData.append('id', session?.user?.email?.id);

        const response = await fetch("http://localhost:5000/addIcon",{
        method: "POST",
        body: formData,
        })

        if(!response.ok){
        const data = await response.json();
        console.log(data.message);
        } else {
        const data = await response.json();
        console.log(data.message);
        console.log(data.path);
        }

        fetchIcon();
    }

    const fetchIcon = async ()=>{
        const response = await fetch("http://localhost:5000/icons")
        .then(response=>response.json())
        .then(data=>{
            data.forEach(one=>{
                if(one.user_id === session?.user?.email?.id){
                    setIconPath(`http://localhost:5000${one.path}`)
                }
            })
        })
    }

    useEffect(()=>{
        [...document.querySelectorAll(".option")].forEach((one,index)=>{
            if(index == 1) one.classList.add("active");
            else one.classList.remove("active");
        })

        fetchIcon();
    },[])

    return(
        <div className="info">
            <div className="leftInfo">
                <div className="userData">
                    <span>Dane</span>
                    <form action="">
                        <input type="text" placeholder='Podaj imię...' />
                        <input type="submit" value="edytuj" />
                    </form>
                    <form action="">
                        <input type="text" placeholder='Podaj nazwisko...'/>
                        <input type="submit" value="edytuj" />
                    </form>
                </div>
                <div className="userAddress">
                    <span>Adres</span>
                    <form action="">
                        <input type="text" placeholder='Podaj imię...' />
                        <input type="submit" value="edytuj" />
                    </form>
                    <form action="">
                        <input type="text" placeholder='Podaj imię...' />
                        <input type="submit" value="edytuj" />
                    </form>
                    <form action="">
                        <input type="text" placeholder='Podaj imię...' />
                        <input type="submit" value="edytuj" />
                    </form>
                </div>
            </div>
            <div className="rightInfo">
                <div className="userAvatar">
                    <span>Awatar</span>
                    <div className="avatar">
                        <Image
                            src={iconPath} 
                            alt="siema"
                            width="1920" 
                            height="1080"/>
                    </div>
                    <form onSubmit={handleForm}>
                        <input type="file" onChange={e=>setFile(e.target.files[0])} className='fileInput'/>
                        <input type="submit" value="dodaj" />
                    </form>
                </div>
                <div className="userAccess">
                    <span>Zgody</span>
                </div>
            </div>
        </div>
    )
}
export default Home;