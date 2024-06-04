import Map from 'components/Map';
import Sidebar from 'components/Sidebar';
import React, { useEffect, useState, useContext } from 'react';
import { TfiPencilAlt } from "react-icons/tfi";
import useMobile from 'components/UseMobile.js';
import { loginCheck } from 'utils/commonFunctionsReact';
import { MapContext } from 'context/MapContext';
import { TbCurrentLocation } from "react-icons/tb";

export default function MapHome() {
  const isMobile = useMobile();

  const { showMobileMapSearch, currentPosition, map } = useContext(MapContext);

  // ## 페이지 제한
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  useEffect(() => {
    loginCheck().then(() => setIsLoading(false)); // 로그인 체크 후 로딩 상태 변경
  }, [])
  if (isLoading) {
    return null; // 로딩 중에는 아무것도 렌더링하지 않음
  }
  // 페이지 제한 ##

  const moveCurrentLocation = () => {
    const moveLatLon = new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng);
    map.setLevel(3);
    map.panTo(moveLatLon);

  }

  return (
    <div className="map-container">

      {/* 지도서비스 기능 버튼 */}
      {!showMobileMapSearch &&
        <div className={`absolute right-4 ${isMobile ? 'top-24' : 'top-4'} z-10 flex flex-col gap-4`}>
          <button className='map-func-btn'>
            <TfiPencilAlt />
          </button>
          <button className='map-func-btn' onClick={moveCurrentLocation}>
            <TbCurrentLocation />
          </button>
        </div>
      }
      {/* 사이드바 및 메뉴바 */}
      <Sidebar />

      {/* 지도 */}
      <Map />
    </div >
  );
}