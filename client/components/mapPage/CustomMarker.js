import { MarkerF } from '@react-google-maps/api';
import { useState } from 'react';

const CustomMarker = ({ key, position, handleClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const icon = {
    url: isHovered? '/images/pinIconGreen.png':'/images/pinIcon.png',
    scaledSize: isHovered 
      ? new window.google.maps.Size(35, 35) 
      : new window.google.maps.Size(30, 30),
    anchor: isHovered
    ? new window.google.maps.Point(17.5, 35)
    : new window.google.maps.Point(15, 30)
  };

  return (
    <MarkerF
      key={key}
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
