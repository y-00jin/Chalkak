import React, { useState } from 'react';
import { GoStar } from "react-icons/go";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { HiUserCircle } from "react-icons/hi2";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
// import { SiMaplibre } from "react-icons/si";
// import { Scrollbars } from 'react-custom-scrollbars-2';
import MapSearch from './MapSearch';
import MemoryChange from './MemoryChange';
import MemoryInfo from './MemoryInfo';
import PlaceStorage from './PlaceStorage';
import useMobile from 'components/UseMobile';
import { IoExitOutline } from "react-icons/io5";
import { handleLogout } from 'utils/commonFunctionsReact';

export default function Sidebar() {

    const isMobile = useMobile();

    const [activeMenu, setActiveMenu] = useState('mapSearch');  // 활성화 메뉴
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);   // pc 사이드바 펼침 상태

    const [isMobileMenubarOpen, setIsMobileMenubarOpen] = useState(false);  // 모바일 메뉴바 펼침 상태

    // 메뉴 클릭 이벤트
    const handleMenuClick = (target) => {
        setIsMobileMenubarOpen(false);   // 모바일 메뉴 바 상태 false
        setActiveMenu(target);          // 클릭한 메뉴로 설정
    };

    // 로그아웃 이벤트
    // const handleLogout = async () => {

    //     const logoutErrorMsg = '로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.';
    //     try {
    //         const response = await axios.get('/api/users/logout', { withCredentials: true });
    //         if (response.status === 200) {
    //             navigate(`/`);
    //         } else {
    //             alert(logoutErrorMsg);
    //         }
    //     } catch (error) {
    //         alert(logoutErrorMsg);
    //     }
    // };


    return (

        <>
            {/* PC 환경 - 사이드바와 지도 */}
            <div>
                <div className='map-sidebar-box'>

                    {/* 사이드바 열림/닫힘 버튼 */}
                    <button className={`map-sidebar-content-toggle ${isSidebarOpen ? 'left-[460px]' : 'left-20'}`} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? '<' : '>'}
                    </button>

                    <div className='map-menu-box'>

                        <div>
                            <img src="/images/chalkak_logo.png" alt="Chalkak Logo" width="200px" />
                        </div>


                        <div className={`map-menu-item ${activeMenu === 'mapSearch' ? 'map-menu-item-active' : ''}  `}
                            onClick={() => handleMenuClick('mapSearch')}>
                            <button>
                                <FiMapPin className='size-6' />
                            </button>
                            지도
                        </div>

                        <div className={`map-menu-item ${activeMenu === 'placeStorage' ? 'map-menu-item-active' : ''}  `}
                            onClick={() => handleMenuClick('placeStorage')}>
                            <button>
                                <GoStar className='size-7' />
                            </button>
                            저장
                        </div>

                        <div className={`map-menu-item ${activeMenu === 'memoryInfo' ? 'map-menu-item-active' : ''}  `}
                            onClick={() => handleMenuClick('memoryInfo')}>
                            <button>
                                <IoInformationCircleOutline className='size-7' />
                            </button>
                            추억 정보
                        </div>

                        <div className={`map-menu-item ${activeMenu === 'memoryChange' ? 'map-menu-item-active' : ''}  `}
                            onClick={() => handleMenuClick('memoryChange')}>
                            <button>
                                <CiSettings className='size-7' />
                            </button>
                            추억 변경
                        </div>

                        <div className='map-menu-item' onClick={handleLogout}>
                            <button>
                                <IoExitOutline className='size-7' />
                            </button>
                            로그아웃
                        </div>
                    </div>


                    {/* 사이드바 내용 */}
                    {!isMobile &&
                        <div className={`map-sidebar-content ${!isSidebarOpen ? 'hidden' : ''}`}>
                            {activeMenu === 'mapSearch' && <MapSearch />}
                            {activeMenu === 'placeStorage' && <PlaceStorage closeEvent={handleMenuClick} />}
                            {activeMenu === 'memoryInfo' && <MemoryInfo closeEvent={handleMenuClick} />}
                            {activeMenu === 'memoryChange' && <MemoryChange closeEvent={handleMenuClick} />}
                        </div>
                    }


                </div>

                { /** 모바일 메뉴바 */
                    isMobile && <div className='absolute z-10 right-4 bottom-4'>
                        <button className="map-mobile-menu-btn " onClick={() => setIsMobileMenubarOpen((val) => !val)}>
                            <BiMenu />
                        </button>
                    </div>
                }

                {/* 모바일 메뉴 내용 */}
                {isMobile && activeMenu !== "mapSearch" &&
                    <div>
                        {activeMenu === 'placeStorage' && <PlaceStorage closeEvent={handleMenuClick} />}
                        {activeMenu === 'memoryInfo' && <MemoryInfo closeEvent={handleMenuClick} />}
                        {activeMenu === 'memoryChange' && <MemoryChange closeEvent={handleMenuClick} />}
                    </div>
                }

                {/* 장소 검색 */}
                {isMobile &&
                    <MapSearch closeEvent={handleMenuClick} />
                }

            </div>

            {/* mobile 메뉴바 */}
            {isMobileMenubarOpen && (
                <>
                    <div className="map-mobile-menu-box">
                        <button className='float-right' onClick={() => setIsMobileMenubarOpen((val) => !val)}>
                            <AiOutlineClose className='size-5' />
                        </button>

                        <div className='map-mobile-profile-box'>

                            <HiUserCircle className='size-[50%] p-2 text-gray-300' />

                            <div className='flex flex-col justify-center'>
                                <b>이유진</b>
                                <p>강릉여행</p>
                            </div>
                        </div>

                        <div className="map-mobile-menu-list">

                            <button className="map-mobile-menu-item" onClick={() => setIsMobileMenubarOpen(false)}>
                                <FiMapPin />
                                지도
                            </button>
                            <button className="map-mobile-menu-item" onClick={() => handleMenuClick('placeStorage')}>
                                <GoStar />
                                저장
                            </button>
                            <button className="map-mobile-menu-item" onClick={() => handleMenuClick('memoryInfo')}>
                                <IoInformationCircleOutline />
                                추억 정보
                            </button>
                            <button className="map-mobile-menu-item" onClick={() => handleMenuClick('memoryChange')}>
                                <CiSettings />
                                추억 변경
                            </button>
                            <button className="map-mobile-menu-item" onClick={handleLogout}>
                                로그아웃
                            </button>
                        </div>
                    </div>
                    <div className="map-mobile-menu-box-bg" onClick={() => setIsMobileMenubarOpen((val) => !val)}>
                    </div>
                </>

            )}
        </>
    )
}