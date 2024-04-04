import Map from 'components/Map';
import Sidebar from 'components/Sidebar';
import React, { useEffect, useState } from 'react';
import { GoStar } from "react-icons/go";
import { TfiPencilAlt } from "react-icons/tfi";


export default function MapHome() {
  const [map, setMap] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <div className="map-container">


      {/* 사이드바 및 메뉴바 */}
      <Sidebar isMobile={isMobile} />

      {/* 지도서비스 기능 버튼 */}
      <div className={`absolute right-4 ${isMobile ? 'top-24' : 'top-4'} z-10 flex flex-col gap-4`}>
        <button className='rounded-full bg-white text-black cursor-pointer p-2 z-20 shadow-lg text-3xl font-bold size-14 flex items-center justify-center'>
          <GoStar />
        </button>
        <button className='rounded-full bg-white text-black cursor-pointer p-4 z-20 shadow-lg text-3xl  size-14 flex items-center justify-center'>
          <TfiPencilAlt />
        </button>
      </div>

      {/* 지도 */}
      <Map setMap={setMap} />
    </div>
  );
}