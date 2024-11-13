'use client';

import { useState, useRef } from 'react';
import { useSpring } from 'react-spring'

import Map from '@/components/mapPage/Map';
import InterFace from '@/layout/mapPage/Interface';
import Details from '@/components/mapPage/Details';
import Discover from '@/components/mapPage/Discover';

import "@/styles/mapPage/map.scss";

const Home = () => {

  const [posState, setPosState] = useState({ x: 0, y: 0 });
  const pos = useSpring({ x: posState.x, y: posState.y });

  const mapRef = useRef();

  const [component, setComponent] = useState(<Discover/>);
  const [selectedId, setSelectedId] = useState(null);

  const handleButton = (title,author,desc,id,isLike,save,handleLike,handleSave)=>{
        setComponent(
          <Details 
            title={title} 
            author={author} 
            desc={desc} id={id} 
            isLike={isLike} 
            isSave={save} 
            handleLike={handleLike} 
            handleSave={handleSave}/>
        )
        setSelectedId(id);
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