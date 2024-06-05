import Map from 'components/Map';
import Sidebar from 'components/Sidebar';
import React, { useEffect, useState, useContext, useRef } from 'react';
import useMobile from 'components/UseMobile.js';
import { loginCheck } from 'utils/commonFunctionsReact';
import { MapContext } from 'context/MapContext';
import MapFunction from 'components/MapFunction';

export default function MapHome() {
  const { showMobileMapSearch } = useContext(MapContext);

  // ## 페이지 제한
  // const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  // useEffect(() => {
  //   loginCheck().then(() => setIsLoading(false)); // 로그인 체크 후 로딩 상태 변경
  // }, [])
  // if (isLoading) {
  //   return null; // 로딩 중에는 아무것도 렌더링하지 않음
  // }


  return (
    <div className="map-container">

      {/* 지도서비스 기능 버튼 */}
      {/* {!showMobileMapSearch && */}
        <MapFunction />
      {/* } */}

      {/* 사이드바 및 메뉴바 */}
      <Sidebar />

      {/* 지도 */}
      <Map />


    </div >
  );
}