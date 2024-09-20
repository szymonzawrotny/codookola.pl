'use client'
import { useState, useEffect } from 'react';

import InterFace from '@/layout/mapPage/Interface';
import GoogleMapReact from 'google-map-react';
import dark from '@/components/mapPage/mapStyles';
import { PiMapPinFill } from "react-icons/pi";
import "@/styles/mapPage/map.scss";

const Home = ()=>{

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [locations, setLocations] = useState([""]);
  const [selectedId, setSelectedId] = useState(null);
  const [eventOver,setEventOver] = useState("");

  const fetchUserData = async ()=>{
    const token = localStorage.getItem('token');

    if(token){

      const response = await fetch("http://localhost:5000/protected", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
          const data = await response.json();
          console.log(data);
      } else {
          console.log("brak dostępu do danych")
      }

    } else {
      console.log("brak tokena")
    }
  }

  useEffect(()=>{
    fetch("http://localhost:5000/api")
    .then(response=>response.json())
    .then(data=>setLocations(data))
    
    navigator.geolocation.getCurrentPosition((position)=>{
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
    },(error)=>{
        console.log("error getting location " + error.message);
        setLat(53.56317881922556)
        setLng(20.99479282831869)  //usuń stąd i daj po prostu do state te wartości
    });

    fetchUserData();
  },[])

  const mapOptions = {
    styles:dark,
    fullscreenControl: false, 
    zoomControl: false, 
  };

  return(
    <div className="mapPage">
      <InterFace/>
      <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_KEY }}
          // bootstrapURLKeys={{ key: "" }}
          center={{
                  lat: lat,
                  lng: lng
              }}
          defaultZoom={13}
          className="halo"
          options={mapOptions}>
      </GoogleMapReact>
    </div>
)
}
export default Home;