"use client "
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SwiperBox from "../mapPage/SwiperBox"

const EditPanel = ({edit,eventInfo})=>{

    const router = useRouter();
    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }
    })

    const [editName,setEditName] = useState("");
    const [editDesc,setEditDesc] = useState("");
    const [editAddress,setEditAddress] = useState("");
    
    const [path,setPath] = useState("http://localhost:5000/uploads/default.jpg");
    const [path2,setPath2] = useState("http://localhost:5000/uploads/default.jpg");
    const [path3,setPath3] = useState("http://localhost:5000/uploads/default.jpg");

    const [edit_path,setEdit_path] = useState(null);
    const [edit_path2,setEdit_path2] = useState(null);
    const [edit_path3,setEdit_path3] = useState(null);


    const handleSend = async (e)=>{
        e.preventDefault();
        
        const type = e.target.getAttribute("data-type");
        const value = e.target.children[0].value;
        
        const response = await fetch("http://localhost:5000/editeventdata",{
            method: "POST",
            body: JSON.stringify({
                id:eventInfo.event_id,
                type,
                value,
                userId: session?.user?.email?.id
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            console.log("coś nie poszło")
        } else {
            const data = await response.json();
            console.log(data.message)
        }
    }

    const editPhotos = async (e)=>{
        e.preventDefault()
        const formData = new FormData();

        if (edit_path) formData.append('photos', edit_path);
        if (edit_path2) formData.append('photos', edit_path2);
        if (edit_path3) formData.append('photos', edit_path3);

        formData.append('id', eventInfo.event_id);

        const response = await fetch("http://localhost:5000/editphotos", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message)
        } else {
            console.log("Błąd przy dodawaniu wydarzenia");
        }
    }

    useEffect(()=>{
        setPath(`http://localhost:5000${eventInfo.photo_path}`)
        setPath2(`http://localhost:5000${eventInfo.photo_path2}`)
        setPath3(`http://localhost:5000${eventInfo.photo_path3}`)
    },[eventInfo])

    return(
        <>
            <p className="eventAuthor">
                {eventInfo.author_email}
            </p>
            <p>
                <span>
                    {eventInfo.nazwa}
                </span> 
                {edit && 
                    <>
                        <div className="space"></div>
                        <form onSubmit={handleSend} data-type="name">
                            <textarea 
                                value={editName}
                                onChange={e=>setEditName(e.target.value)}
                                placeholder="Edytuj nazwę swojego wydarzenia..."></textarea>
                            <input type="submit" value="dodaj" />
                        </form> 
                    </>
                }
            </p>
            <p>
                <span>
                    {eventInfo.opis}
                </span>
                {edit && 
                    <>
                        <div className="space"></div>
                        <form onSubmit={handleSend} data-type="desc">
                            <textarea 
                                value={editDesc}
                                onChange={e=>setEditDesc(e.target.value)}
                                placeholder="Edytuj opis swojego wydarzenia..."></textarea>
                            <input type="submit" value="dodaj" />
                        </form> 
                    </>
                }
            </p>
            <p>
                <span>
                    {`${eventInfo.miasto}, ${eventInfo.kod_pocztowy}, ${eventInfo.adres}`}
                </span>
                {edit && 
                    <>
                        <div className="space"></div>
                        <form onSubmit={handleSend} data-type="address">
                            <textarea 
                                value={editAddress}
                                onChange={e=>setEditAddress(e.target.value)}
                                placeholder="Wpisz adres (miasto,kod-pocztowy, ulica i numer)..."></textarea>
                            <input type="submit" value="dodaj" />
                        </form> 
                    </>
                }
            </p>
            <div className="swiperContainer">
                <SwiperBox path={path} path2={path2} path3={path3}/>
                {edit && 
                    <>
                        <div className="space"></div>
                        <form onSubmit={editPhotos}>
                            <input type="file" onChange={e=>setEdit_path(e.target.files[0])} className='fileInput'/>
                            <input type="file" onChange={e=>setEdit_path2(e.target.files[0])} className='fileInput'/>
                            <input type="file" onChange={e=>setEdit_path3(e.target.files[0])} className='fileInput'/>
                            <input type="submit" value="dodaj" />
                        </form> 
                    </>
                }
            </div>
        </>
    )
}
export default EditPanel