import Map from 'components/Map';
import Sidebar from 'components/Sidebar';
import React, { useEffect, useState, useRef } from 'react';
import { GoStar } from "react-icons/go";
import { TfiPencilAlt } from "react-icons/tfi";
import useMobile from 'components/UseMobile.js';
import { loginCheck } from 'utils/commonFunctionsReact';


export default function MapHome() {
  const [map, setMap] = useState(null);
  const isMobile = useMobile();

  const [showMobileMapSearch, setShowMobileMapSearch] = useState(false);  // 검색창 여부

  const psRef = useRef(null); // psRef 생성

  // ## 페이지 제한
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  useEffect(() => {
    loginCheck().then(() => setIsLoading(false)); // 로그인 체크 후 로딩 상태 변경
  }, [])
  if (isLoading) {
    return null; // 로딩 중에는 아무것도 렌더링하지 않음
  }
  // 페이지 제한 ##


  return (
    <div className="map-container">

      {/* 지도서비스 기능 버튼 */}
      {!showMobileMapSearch &&
        <div className={`absolute right-4 ${isMobile ? 'top-24' : 'top-4'} z-10 flex flex-col gap-4`}>
          <button className='map-func-btn'>
            <GoStar />
          </button>
          <button className='map-func-btn'>
            <TfiPencilAlt />
          </button>
        </div>
      }
      {/* 사이드바 및 메뉴바 */}
      <Sidebar setShowMobileMapSearch={setShowMobileMapSearch} showMobileMapSearch={showMobileMapSearch} map={map} setMap={setMap} />

      {/* 지도 */}
      <Map setMap={setMap} psRef={psRef}/>
    </div >
  );
}