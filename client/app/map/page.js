'use client'
import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';

import dark from '@/components/mapPage/mapStyles';
import InterFace from '@/layout/mapPage/Interface';
import { PiMapPinFill } from "react-icons/pi";
import "@/styles/mapPage/map.scss";


const Home = () => {
  const [lat, setLat] = useState(53.56317881922556);
  const [lng, setLng] = useState(20.99479282831869);
  const [locations, setLocations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [eventOver, setEventOver] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then(response => response.json())
      .then(data => setLocations(data));

    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    }, (error) => {
      console.log("error getting location " + error.message);
      setLat(53.56317881922556);
      setLng(20.99479282831869);
    });
  }, []);

  const mapOptions = {
    styles: dark,
    fullscreenControl: false,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
  };

  const points = locations.map((one,index)=>{
    return (
      <Marker 
            position={{lat: Number(one.lat),lng: Number(one.lng)}} 
            onClick={() => console.log("siema")}
            key={index}
          />
    )
  })

  return (
    <div className="mapPage">
      <InterFace />
      <LoadScript 
        //googleMapsApiKey={process.env.NEXT_PUBLIC_KEY}
        googleMapsApiKey=""
        >
        <GoogleMap
          mapContainerStyle={{ height: "100vh", width: "100%" }}
          center={{ lat: lat, lng: lng }}
          zoom={13}
          options={mapOptions}
        >
          
          {points}

        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Home;
