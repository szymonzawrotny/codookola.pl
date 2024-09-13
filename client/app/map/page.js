'use client'
import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import dark from '@/components/mapPage/mapStyles';
import "@/styles/mapPage/map.scss";

const Home = ()=>{

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [locations, setLocations] = useState([""]);
  const [selectedId, setSelectedId] = useState(null);
  const [eventOver,setEventOver] = useState("");

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
        setLng(20.99479282831869)
    });
  },[])

  const mapOptions = {
    styles:dark,
    fullscreenControl: false, 
    zoomControl: false, 
  };

  return(
    <div className="homePage">
        <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_KEY }}
                // bootstrapURLKeys={{ key: "" }}
                center={{
                        lat: lat,
                        lng: lng
                    }}
                defaultZoom={13}
                options={mapOptions}
            >
                
        </GoogleMapReact>
    </div>
)
}
export default Home;