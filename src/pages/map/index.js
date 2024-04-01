import Map from 'components/Map';
import React, { useEffect, useState } from 'react';

export default function MapHome() {

  const [map, setMap] = useState(null);

  return (
    <div>
      <Map setMap={setMap}/>
    </div>
  );
}