import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import { GoStar } from "react-icons/go";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { HiUserCircle } from "react-icons/hi2";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";


export default function Sidebar({ isMobile }) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 기본값은 사이드바가 열린 상태로 설정

    const [isOpen, setIsOpen] = useState(false);

    // 사이드바 펼침/접힘 함수
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (

        <>
            {/* PC 환경 - 사이드바와 지도 */}
            <div>
                <div className='map-sidebar-box'>
                    <div className='map-sidebar-item-box flex border-r top-0 left-0 h-full bg-white w-20 z-20 gap-3 flex-col pt-4 items-center'>

                        <img src="/images/chalkak_logo.png" alt="Chalkak Logo" width="200px" />

                        <div className='map-sidebar-item map-sidebar-item-active flex flex-col bg-[#96DBF4]  cursor-pointer text-white size-20 items-center justify-center'>
                            <button>
                                <FiMapPin className='size-6' />
                            </button>
                            지도
                        </div>

                        <div className='map-sidebar-item flex flex-col size-20 items-center cursor-pointer justify-center' >
                            <button>
                                <GoStar className='size-7' />
                            </button>
                            저장
                        </div>

                        <div className='map-sidebar-item flex flex-col size-20 items-center cursor-pointer justify-center' >
                            <button>
                                <IoInformationCircleOutline className='size-7' />
                            </button>
                            추억 정보
                        </div>

                        <div className='map-sidebar-item flex flex-col size-20 items-center cursor-pointer justify-center'>
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

                        <input type="text" placeholder="장소 검색" className="flex-grow rounded-full px-5 py-3 w-full border border-gray-300 focus:outline-none focus:border-[#96DBF4] shadow-lg" />
                        
                        <div>
                            <p className='text-gray-400 my-5 px-3'>검색된 장소 정보가 없습니다.</p>
                        </div>
                        
                    </div>
                    <button className={`map-sidebar-content-toggle ${isSidebarOpen ? 'left-[460px]' : 'left-20'}`} onClick={toggleSidebar}>
                        {isSidebarOpen ? '<' : '>'}
                    </button>

                </div>

                <div role="presentation" className='map-mobile-box'>
                    <button className="map-mobile-menu-btn " onClick={() => setIsOpen((val) => !val)}>
                    <BiMenu />
                    </button>

                    <input type="text" placeholder="장소 검색" className="map-mobile-menu-input " />

                </div>
            </div>

            {/* mobile 메뉴바 */}
            {isOpen && (
                <>
                <div className="map-mobile-menu-box">
                    <button className='float-right' onClick={() => setIsOpen((val) => !val)}>
                        <AiOutlineClose className='size-5'/>
                    </button>

                    <div className='flex border-b-gray-300 pb-5 border-b mb-8'>

                        <HiUserCircle className='size-[50%] p-2 text-gray-300' />

                        <div className='flex flex-col justify-center'>
                            <b>이유진</b>
                            <p>강릉여행</p>
                        </div>

                    </div>



                    <div className="map-mobile-menu-list">
                        <Link to="/" className="map-mobile-menu-item  ">
                            <FiMapPin />
                            지도
                        </Link>
                        <Link to="/" className="map-mobile-menu-item  ">
                            <GoStar />
                            저장
                        </Link>
                        <Link to="/" className="map-mobile-menu-item  ">
                            <IoInformationCircleOutline />
                            추억 정보
                        </Link>
                        <Link to="/" className="map-mobile-menu-item  ">
                            <CiSettings />
                            추억 변경
                        </Link>
                    </div>
                </div>
                <div className="map-mobile-menu-box-bg" onClick={() => setIsOpen((val) => !val)}>
                    
                </div>
</>
                
            )}

        </>


    )
}