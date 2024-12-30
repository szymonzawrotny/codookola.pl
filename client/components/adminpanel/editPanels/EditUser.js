"use client"
import { useState } from 'react';

const EditUser = ({data})=>{

    const deleteUser = async ()=>{
        console.log(data);
    }

    return(
        <div className="postData">
            <h3>{data.email}</h3>
            <p>{data.name==""? "brak" : data.name}</p>
            <p>{data.lastname==""? "brak" : data.lastname}</p>
            <p>{ data.city=="" || data.street=="" ? "brak" : `${data.city}. ${data.street}`}</p>
            <p>{data.age==0 ? "brak" : data.age}</p>
            <p>{data.role}</p>

            <button onClick={deleteUser}>usuń</button>
        </div>
    )
}
export default EditUser