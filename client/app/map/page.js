'use client';
import CustomMarker from '@/components/mapPage/CustomMarker';
import { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import dark from '@/components/mapPage/mapStyles';
import InterFace from '@/layout/mapPage/Interface';

import "@/styles/mapPage/map.scss";

const Home = () => {
  const [lat, setLat] = useState(53.56317881922556);
  const [lng, setLng] = useState(20.99479282831869);
  const [locations, setLocations] = useState([]);
  const [zoom, setZoom] = useState(14);

  const mapRef= useRef();

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

  const handleMapClick = (e) => {
    console.log("cotam")
  };

  const onLoad = useCallback((map)=> mapRef.current = map)

  const points = locations.map((one, index) => {

    const handleClick = () => {
      mapRef?.current.panTo({ lat: Number(one.lat), lng: Number(one.lng) })
      if(mapRef?.current.getZoom() <=13) mapRef?.current.setZoom(15)
    };

    return (
      <CustomMarker
        position={{ lat: Number(one.lat), lng: Number(one.lng) }}
        key={index}
        handleClick={handleClick}
      />
    );
  });

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
          zoom={zoom}
          options={mapOptions}
          onClick={handleMapClick}
          onLoad={onLoad}
        >
          {points}

        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Home;