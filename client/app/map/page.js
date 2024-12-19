'use client';

import { useState, useRef } from 'react';
import { useSpring } from 'react-spring'
import { useSession } from 'next-auth/react'

import Map from '@/components/mapPage/Map';
import InterFace from '@/layout/mapPage/Interface';
import Details from '@/components/mapPage/Details';
import Discover from '@/components/mapPage/Discover';

import "@/styles/mapPage/map.scss";

const Home = () => {

  const {data:session} = useSession({
        required: false,
  })

  const [posState, setPosState] = useState({ x: 0, y: 0 });
  const pos = useSpring({ x: posState.x, y: posState.y });

  const mapRef = useRef();

  const [component, setComponent] = useState(<Discover/>);
  const [selectedId, setSelectedId] = useState(null);

  const addView = async (eventId)=>{

    if(session){
        const response = await fetch("http://localhost:5000/addView",{
          method: "POST",
          body: JSON.stringify({
              id: session?.user?.email?.id,
              eventId: eventId
          }),
          headers: {
              "Content-Type": "application/json"
          }
      })

      if(response.ok){
          console.log("dodano")
      } else {
          console.log("coś nie poszło")
      }
    } else {
      console.log("musisz się zalogować")
    }
  }

  const handleButton = (title,author,desc,id,eventInfo)=>{
        setComponent(
          <Details 
            eventInfo={eventInfo}
            title={title} 
            author={author} 
            desc={desc} id={id}/>
        )
        setSelectedId(id);
        addView(id)
  }

  return (
    <div className="mapPage">
      <InterFace 
        handleButton={handleButton}
        component={component}
        setComponent={setComponent}
        posState={posState} 
        setPosState={setPosState}
        pos={pos}/>
      <Map 
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        mapRef={mapRef}
        setComponent={setComponent}
        setPosState={setPosState}/>
    </div>
  );
};
export default Home;