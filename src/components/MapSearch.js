import { Scrollbars } from 'react-custom-scrollbars';
import { SiMaplibre } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
import React, { useState } from 'react';
export default function MapSearch({ setShowMobileMapSearch }) {

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

    const handlePlaceDataClick = (data) => {
        setSelectedData(data);

        setShowMobileMapSearch((val) => !val);

        console.log(data);
    };

    return (
        <>
            <div className='sidebar-content-box'>
                <input type="text" placeholder="장소 검색" className="map-search-input" />

                <div className='place-search-box'>
                    <Scrollbars thumbSize={85}>

                        {datas.map(data => (
                            <div key={data.id} className='place-search-item' onClick={() => handlePlaceDataClick(data)}>
                                <SiMaplibre className='size-10 text-slate-300' />
                                <div>
                                    <p>{data.location_nm}</p>
                                    <p>{data.address}</p>
                                </div>
                            </div>
                        ))}
                    </Scrollbars>
                </div>
            </div>


            <div className='menu-mobile-content-box'>
                <div className='place-search-mobile-header-box'>
                    <input type="text" placeholder="장소 검색" className="map-search-input" />
                    <button className='menu-mobile-close-btn' onClick={() => setShowMobileMapSearch((val) => !val)}>
                        <AiOutlineClose className='size-5' />
                    </button>

                </div>

                <div className='mobile-place-box'>
                    <Scrollbars thumbSize={85}>

                        {datas.map(data => (
                            <div key={data.id} className='place-search-item' onClick={() => handlePlaceDataClick(data)}>
                                <SiMaplibre className='size-10 text-slate-300' />
                                <div>
                                    <p>{data.location_nm}</p>
                                    <p>{data.address}</p>
                                </div>
                            </div>
                        ))}
                    </Scrollbars>
                </div>
            </div>




        </>

    )
}