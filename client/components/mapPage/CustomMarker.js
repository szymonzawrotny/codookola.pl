import { MarkerF } from '@react-google-maps/api';
import { useState } from 'react'

const CustomMarker = ({ position, handleClick, event_id, selectedId}) => {
  const [isHovered, setIsHovered] = useState(false);

  let state = event_id === selectedId

  const icon = {
    url: state? '/images/pinIconGreen.png':'/images/pinIcon.png',
    scaledSize: state || isHovered
      ? new window.google.maps.Size(30, 35) 
      : new window.google.maps.Size(25, 30),
    anchor: state || isHovered
    ? new window.google.maps.Point(15, 35)
    : new window.google.maps.Point(12.5, 30)
  };

  return (
    <MarkerF
      position={position}
      icon={icon}
      onClick={handleClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      animation={2} //1 skacze //dwa wskakuje
    />
  );
};

export default CustomMarker;
