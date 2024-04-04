import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import { GoStar } from "react-icons/go";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { HiUserCircle } from "react-icons/hi2";
export default function Sidebar({ isMobile }) {

    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 기본값은 사이드바가 열린 상태로 설정

    // 사이드바 펼침/접힘 함수
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (

        <>
            {/* PC 환경 - 사이드바와 지도 */}
            {!isMobile && (
                <>
                    <div className='flex border-r top-0 left-0 h-full bg-white w-20 z-20 gap-3 flex-col pt-4 items-center'>

                        <img src="/images/chalkak_logo.png" alt="Chalkak Logo" width="200px" />

                        <div className='flex flex-col bg-[#96DBF4] text-white size-20 items-center justify-center'>
                            <button>
                                <GoStar className='size-6'/>
                            </button>
                            저장
                        </div>

                        <div className='flex flex-col size-20 items-center justify-center'>
                            <button>
                                <IoInformationCircleOutline className='size-7'/>
                            </button>
                            추억 정보
                        </div>

                        <div className='flex flex-col size-20 items-center justify-center'>
                            <button>
                                <CiSettings className='size-7'/>
                            </button>
                            추억 변경
                        </div>

                        <div className='absolute bottom-0 '>
                            <button>
                                <HiUserCircle className='size-16 p-2 text-gray-300'/>
                            </button>
                        </div>

                    </div>


                    <div className={`map-sidebar ${!isSidebarOpen ? 'hidden' : ''}`}>
                        
                        <h2>Sidebar</h2>
                    </div>
                    <button className={`map-sidebar-toggle ${isSidebarOpen ? 'left-[460px]' : 'left-20'}`} onClick={toggleSidebar}>
                        {isSidebarOpen ? '<' : '>'}
                    </button>
                </>
            )}

            {/* 모바일 환경 - 버튼을 클릭하면 사이드바가 전체 화면에 나타남 */}
            {isMobile && (
                <div className='map-mobile-box'>
                    <button className="map-mobile-menu-btn " onClick={() => navigate(`/mypage`)}>
                        <IoIosMenu />
                    </button>

                    <input type="text" placeholder="장소 검색" className="map-mobile-menu-input " />

                </div>
            )}
        </>


    )
}