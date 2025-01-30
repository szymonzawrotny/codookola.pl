"use client"
import { useState, useEffect, useRef} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import "@/styles/userpanel/info.scss"
import Image from 'next/image';


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

    const editData = async (e)=>{
        e.preventDefault();

        const type = e.target.getAttribute("data-type");
        const value = e.target.children[0].value;


        const response = await fetch("http://localhost:5000/edituserdata",{
            method: "POST",
            body: JSON.stringify({
                id: session?.user?.email?.id,
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
            console.log(data.message);
        }

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
                    <form onSubmit={editData} data-type="name">
                        <input 
                            type="text" 
                            placeholder='Podaj imię...' />
                        <input 
                            type="submit" 
                            value="edytuj" />
                    </form>
                    <form onSubmit={editData} data-type="lastname">
                        <input type="text" placeholder='Podaj nazwisko...'/>
                        <input 
                            type="submit" 
                            value="edytuj" />
                    </form>
                </div>
                <div className="userAddress">
                    <span>Adres</span>
                    <form onSubmit={editData} data-type="city">
                        <input 
                            type="text" 
                            placeholder='Podaj miasto...' />
                        <input 
                            type="submit" 
                            value="edytuj" />
                    </form>
                    <form onSubmit={editData} data-type="street">
                        <input 
                            type="text" 
                            placeholder='Podaj ulicę...' />
                        <input 
                            type="submit" 
                            value="edytuj" />
                    </form>
                    <form onSubmit={editData} data-type="age">
                        <input 
                            type="text" 
                            placeholder='Podaj wiek...' />
                        <input 
                            type="submit" 
                            value="edytuj" />
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