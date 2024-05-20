import { Scrollbars } from 'react-custom-scrollbars-2';
import { SiMaplibre } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
import { RiRoadMapFill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";

import React, { useState } from 'react';
import PlaceSave from './PlaceSave';
export default function MapSearch({ closeEvent, showMobileMapSearch, setShowMobileMapSearch}) {

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

    const [selectedData, setSelectedData] = useState(null);
    const [showMobileMapList, setShowMobileMapList] = useState(false);      // 검색 목록 여부
    // const [showMobileMapSearch, setShowMobileMapSearch] = useState(false);  // 검색창 여부

    const [showPlaceSave, setShowPlaceSave] = useState(false);  // 저장

    const handlePlaceDataClick = (data) => {
        setSelectedData(data);
        setShowMobileMapList(false);
        alert(data.location_nm)
    };

    return (
        <>
            {/* PC */}
            <div className='sidebar-content-box'>
                <input type="text" placeholder="장소 검색" className="map-search-input" />

                <div className='place-search-box'>
                    <Scrollbars thumbSize={85}>

                        {datas.map(data => (
                            <div key={data.id} className='border-b-gray-200 py-5 border-b '>
                                <div className='place-search-item'  onClick={() => handlePlaceDataClick(data)}>
                                    <SiMaplibre className='size-10 text-slate-300' />
                                    <div className='flex-1'>
                                        <p>{data.location_nm}</p>
                                        <p>{data.address}</p>
                                    </div>
                                </div>

                                <button className='flex items-center gap-1 ml-12 mt-2' onClick={()=>setShowPlaceSave(true)}>
                                    <FaRegStar/>저장
                                </button>
                            </div>
                        ))}
                    </Scrollbars>
                </div>
            </div>

            {/* Mobile */}
            {/* 검색창 */}
            <div role="presentation" className={`map-mobile-search-box ${showMobileMapSearch ? 'bg-white' : ''}`}>
                {showMobileMapSearch &&
                    <button>
                        {showMobileMapList ? 
                            <RiRoadMapFill className='size-7 text-[#96DBF4]' onClick={()=> setShowMobileMapList((val) => !val)}/> 
                            :
                            <FaListUl className='size-7 text-[#96DBF4]' onClick={()=> setShowMobileMapList((val) => !val)}/> 
                        }
                    </button>
                }

                <input type="text" placeholder="장소 검색" className="map-mobile-search-input h-full " onClick={() => { setShowMobileMapList(true); setShowMobileMapSearch(true); }} />
                
                {showMobileMapSearch &&
                    <button onClick={() => {setShowMobileMapSearch(false); setShowMobileMapList(false); closeEvent('mapSearch');}}>
                        <AiOutlineClose className='size-5' />
                    </button>
                }
            </div>
            
            {/* 검색 목록 */}
            {showMobileMapList &&
                <div className='map-search-mobile-content-box'>
                    <div className='mobile-place-box'>
                        <Scrollbars thumbSize={85}>

                            {datas.map(data => (

                                <div key={data.id} className='border-b-gray-200 py-5 border-b '>
                                <div className='place-search-item' onClick={() => handlePlaceDataClick(data)}>
                                    <SiMaplibre className='size-10 text-slate-300' />
                                    <div className='flex-1'>
                                        <p>{data.location_nm}</p>
                                        <p>{data.address}</p>
                                    </div>
                                </div>
                                <button className='flex items-center gap-1 ml-12 mt-2 ' onClick={()=>setShowPlaceSave(true)}>
                                    <FaRegStar/>저장
                                    </button>
                                </div>

                            ))}
                        </Scrollbars>
                    </div>
                </div>
            }


            { showPlaceSave && <PlaceSave onClose={()=>setShowPlaceSave(false)}/>}

        </>

    )
}