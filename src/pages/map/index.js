import Map from 'components/Map';
import Sidebar from 'components/Sidebar';
import React, { useEffect, useState } from 'react';
import { GoStar } from "react-icons/go";
import { TfiPencilAlt } from "react-icons/tfi";
import useMobile from 'components/UseMobile.js';

export default function MapHome() {
  const [map, setMap] = useState(null);
  const isMobile = useMobile();

  return (
    <div className="map-container">


      {/* 사이드바 및 메뉴바 */}
      <Sidebar/>

      {/* 지도서비스 기능 버튼 */}
      <div className={`absolute right-4 ${isMobile ? 'top-24' : 'top-4'} z-10 flex flex-col gap-4`}>
        <button className='map-func-btn'>
          <GoStar />
        </button>
        <button className='map-func-btn'>
          <TfiPencilAlt />
        </button>
      </div>

      {/* 지도 */}
      <Map setMap={setMap} />
    </div>
  );
}