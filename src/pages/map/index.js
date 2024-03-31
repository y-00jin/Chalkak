// mapTest.js

import React, { useEffect } from 'react';

function MapHome() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };

        new window.kakao.maps.Map(container, options);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100vw', height: '400vh' }}></div>
    </div>
  );
}

export default MapHome;





// import React from 'react';
// import { Map, MapMarker } from "react-kakao-maps-sdk";
// export default function MapHome() {
//   return (
// <div>
//       <Map
//         center={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
//         style={{
//           width: '100vw',
//           height: '100vh',
//           borderRadius: '20px',
//         }}
//       >

// <MapMarker
//           position={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
//         />
        
//       </Map>
//     </div>
//   );
// }
