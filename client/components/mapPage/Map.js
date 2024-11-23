'use client';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import CustomMarker from '@/components/mapPage/CustomMarker';
import dark from '@/components/mapPage/mapStyles';
import Details from '@/components/mapPage/Details';

const Map = React.memo(({setPosState,setComponent,mapRef,selectedId,setSelectedId}) => {
    const [lat, setLat] = useState(53.56317881922556);
    const [lng, setLng] = useState(20.99479282831869);
    const [locations, setLocations] = useState([]);
    const [zoom, setZoom] = useState(14);

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

    useEffect(() => {
        if (selectedId !== null) {
            const selectedLocation = locations.find(location => location.event_id === selectedId);
            if (selectedLocation && mapRef.current) {
                mapRef.current.panTo({
                    lat: Number(selectedLocation.lat),
                    lng: Number(selectedLocation.lng)
                });

                if (mapRef.current.getZoom() <= 13) {
                    mapRef.current.setZoom(15);
                }
            }
        }
    }, [selectedId, locations]);


    const mapOptions = useMemo(
        ()=>({
        styles: dark,
        fullscreenControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        minZoom: 4,
        maxZoom: 25, 
        })
    )

    const onLoad = useCallback((map) => mapRef.current = map);

    const points = useMemo(() => {
        return locations.map((one, index) => {
            const handleClick = () => {
                setSelectedId(one.event_id);
                setPosState({ x: 500, y: 0 });
                setComponent(<Details title={one.nazwa} author={one.author_email} desc={one.opis} id={one.event_id}/>)
            };

            return (
                <CustomMarker
                    position={{ lat: Number(one.lat), lng: Number(one.lng) }}
                    key={index}
                    handleClick={handleClick}
                    event_id={one.event_id}
                    selectedId={selectedId}
                />
            );
        });
    }, [locations, selectedId]); 

    return (
        <LoadScript 
            //googleMapsApiKey={process.env.NEXT_PUBLIC_KEY}
            googleMapsApiKey=""
        >
            <GoogleMap
                mapContainerStyle={{ height: "100vh", width: "100%" }}
                center={{ lat: lat, lng: lng }}
                zoom={zoom}
                options={mapOptions}
                onClick={()=>setPosState({ x: 0, y: 0 })}
                onLoad={onLoad}
            >
                {points}
            </GoogleMap>
        </LoadScript>
    );
})

export default Map;
