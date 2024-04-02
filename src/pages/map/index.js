import Map from 'components/Map';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import { IoIosMenu } from "react-icons/io";



export default function MapHome() {
  const navigate = useNavigate();
  
  const [map, setMap] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 기본값은 사이드바가 열린 상태로 설정

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  // 사이드바 펼침/접힘 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="map-container">

      {/* PC 환경 - 사이드바와 지도 */}
      {!isMobile && (
        <>
          <div className={`map-sidebar ${!isSidebarOpen ? 'hidden' : ''}`}>
            <h2>Sidebar</h2>
          </div>
          <button className={`map-sidebar-toggle ${isSidebarOpen ? 'left-[380px]' : 'left-0'}`} onClick={toggleSidebar}>
            {isSidebarOpen ? '<' : '>'}
          </button>
        </>
      )}

      {/* 모바일 환경 - 버튼을 클릭하면 사이드바가 전체 화면에 나타남 */}
      {isMobile && (
        <div className='map-mobile-box'>
          {/* <button className="mobile-sidebar-toggle " onClick={toggleSidebar}>
            {isSidebarOpen ? <IoIosMenu/> : 'close'}
          </button> */}

          <button className="map-mobile-menu-btn " onClick={() => navigate(`/mypage`)}>
            <IoIosMenu />
          </button>

          <input type="text" placeholder="장소 검색" className="map-mobile-menu-input " />
          
        </div>
      )}

      <Map setMap={setMap} />
    </div>
  );
}