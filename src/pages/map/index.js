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
          <div className={`sidebar ${!isSidebarOpen ? 'hidden' : ''}`}>
            <h2>Sidebar</h2>
          </div>
          <button className={`sidebar-toggle ${isSidebarOpen ? 'left-[380px]' : 'left-0'}`} onClick={toggleSidebar}>
            {isSidebarOpen ? '<' : '>'}
          </button>
        </>
      )}

      {/* 모바일 환경 - 버튼을 클릭하면 사이드바가 전체 화면에 나타남 */}
      {isMobile && (
        <div className='absolute top-0 left-0 z-10 flex w-full p-4'>
          {/* <button className="mobile-sidebar-toggle " onClick={toggleSidebar}>
            {isSidebarOpen ? <IoIosMenu/> : 'close'}
          </button> */}

          <button className="mobile-menu-btn " onClick={() => navigate(`/mypage`)}>
            <IoIosMenu />
          </button>

          <input type="text" placeholder="장소 검색" className="flex-grow ml-2 rounded-full px-5 py-1 border border-gray-300 focus:outline-none focus:border-[#96DBF4] shadow-lg" />
          
        </div>
      )}

      <Map setMap={setMap} />
    </div>
  );
}