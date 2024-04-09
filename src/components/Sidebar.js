import React, { useState } from 'react';
import { GoStar } from "react-icons/go";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { HiUserCircle } from "react-icons/hi2";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { SiMaplibre } from "react-icons/si";
import { Scrollbars } from 'react-custom-scrollbars';
import MapSearch from './MapSearch';
import MemoryChange from './MemoryChange';

export default function Sidebar({ isMobile }) {

    const [activeMenu, setActiveMenu] = useState('mapSearch');
    const [showMapSearch, setShowMapSearch] = useState(false);


    // 임시 데이터
    const [datas, setDatas] = useState([

        {
            id: 1,
            location_nm: '가산디지털단지역 7호선',
            address: '서울 금천구 벚꽃로 309 (가산동)'
        },
        {
            id: 2,
            location_nm: '스타벅스 가산디지털단지역점',
            address: '서울 금천구 벚꽃로 298 (가산동)'
        },
        {
            id: 3,
            location_nm: '노브랜드버거 가산디지털단지점',
            address: '서울 금천구 벚꽃로 286 삼성리더스타워 1층 109호'
        },
        {
            id: 4,
            location_nm: '할리스 가산디지털단지점',
            address: '서울 금천구 가산디지털 1로 186 제이플라츠 1층'
        },
        {
            id: 5,
            location_nm: '한솥 가산디지털단지점',
            address: '서울 금천구 가산디지털2로 108 (가산동)'
        },
        {
            id: 6,
            location_nm: '한솥 가산디지털단지점',
            address: '서울 금천구 가산디지털2로 108 (가산동)'
        },
        {
            id: 7,
            location_nm: '한솥 가산디지털단지점',
            address: '서울 금천구 가산디지털2로 108 (가산동)'
        }
    ]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 기본값은 사이드바가 열린 상태로 설정

    const [isOpen, setIsOpen] = useState(false);

    // 사이드바 펼침/접힘 함수
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // 클릭 시에 MapSearch 컴포넌트를 보이도록 상태 업데이트
    const handleSearchClick = () => {
        setShowMapSearch(true);
    };

    const handleMenuClick = (target) => {
        setShowMapSearch(false);    // 모바일일때 지도 검색 안보이도록
        setIsOpen(false);
        setActiveMenu(target);
    };

    return (

        <>
            {/* PC 환경 - 사이드바와 지도 */}
            <div>
                <div className='map-sidebar-box'>
                    <div className='map-sidebar-item-box flex border-r top-0 left-0 h-full bg-white w-20 z-20 gap-3 flex-col pt-4 items-center'>

                        <img src="/images/chalkak_logo.png" alt="Chalkak Logo" width="200px" />

                        <div className={`map-sidebar-item ${activeMenu === 'mapSearch' ? 'map-sidebar-item-active' : ''}  flex flex-col cursor-pointer size-20 items-center justify-center`}
                            onClick={() => handleMenuClick('mapSearch')}>
                            <button>
                                <FiMapPin className='size-6' />
                            </button>
                            지도
                        </div>

                        <div className={`map-sidebar-item ${activeMenu === 'mapSave' ? 'map-sidebar-item-active' : ''}  flex flex-col cursor-pointer size-20 items-center justify-center`}
                            onClick={() => handleMenuClick('mapSave')}>
                            <button>
                                <GoStar className='size-7' />
                            </button>
                            저장
                        </div>

                        <div className={`map-sidebar-item ${activeMenu === 'memoryInfo' ? 'map-sidebar-item-active' : ''}  flex flex-col cursor-pointer size-20 items-center justify-center`}
                            onClick={() => handleMenuClick('memoryInfo')}>
                            <button>
                                <IoInformationCircleOutline className='size-7' />
                            </button>
                            추억 정보
                        </div>

                        <div className={`map-sidebar-item ${activeMenu === 'memoryChange' ? 'map-sidebar-item-active' : ''}  flex flex-col cursor-pointer size-20 items-center justify-center`}
                        onClick={() => handleMenuClick('memoryChange')}>
                            <button>
                                <CiSettings className='size-7' />
                            </button>
                            추억 변경
                        </div>

                        <div className='map-sidebar-item-bottom absolute bottom-0 '>
                            <button>
                                <HiUserCircle className='size-16 p-2 text-gray-300' />
                            </button>
                        </div>

                    </div>


                    <div className={`map-sidebar-content ${!isSidebarOpen ? 'hidden' : ''}`}>
                        {activeMenu === 'mapSearch' && <MapSearch datas={datas} />}
                        {activeMenu === 'mapSave' && <div>추억저장</div>}
                        {activeMenu === 'memoryInfo' && <div>추억정보</div>}
                        {activeMenu === 'memoryChange' && <MemoryChange/>}
                    </div>
                    <button className={`map-sidebar-content-toggle ${isSidebarOpen ? 'left-[460px]' : 'left-20'}`} onClick={toggleSidebar}>
                        {isSidebarOpen ? '<' : '>'}
                    </button>

                </div>

                <div role="presentation" className='map-mobile-search-box'>
                    <button className="map-mobile-menu-btn " onClick={() => setIsOpen((val) => !val)}>
                        <BiMenu />
                    </button>

                    <input type="text" placeholder="장소 검색" className="map-mobile-menu-input " onClick={handleSearchClick} />
                </div>

                {isMobile && activeMenu != "mapSearch" && 
                <div>
                    {/* {activeMenu === 'mapSearch' && <MapSearch datas={datas} setActiveMenu={setActiveMenu}/>} */}
                    {activeMenu === 'mapSave' && <div>추억 저장</div>}
                    {activeMenu === 'memoryInfo' && <div>추억 정보</div>}
                    {activeMenu === 'memoryChange' && <MemoryChange closeEvent={handleMenuClick}/>}
                </div>
                }

                {isMobile && showMapSearch &&
                    <MapSearch datas={datas} setShowMapSearch={setShowMapSearch} />
                }

            </div>

            {/* mobile 메뉴바 */}
            {isOpen && (
                <>
                    <div className="map-mobile-menu-box">
                        <button className='float-right' onClick={() => setIsOpen((val) => !val)}>
                            <AiOutlineClose className='size-5' />
                        </button>

                        <div className='flex border-b-gray-300 pb-5 border-b mb-8'>

                            <HiUserCircle className='size-[50%] p-2 text-gray-300' />

                            <div className='flex flex-col justify-center'>
                                <b>이유진</b>
                                <p>강릉여행</p>
                            </div>

                        </div>

                        <div className="map-mobile-menu-list">

                            <button className="map-mobile-menu-item" onClick={() => setIsOpen(false)}>
                                <FiMapPin />
                                지도
                            </button>
                            <button className="map-mobile-menu-item" onClick={() => handleMenuClick('mapSave')}>
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
                        </div>
                    </div>
                    <div className="map-mobile-menu-box-bg" onClick={() => setIsOpen((val) => !val)}>

                    </div>
                </>

            )}

        </>


    )
}