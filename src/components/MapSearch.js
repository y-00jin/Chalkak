import { Scrollbars } from 'react-custom-scrollbars-2';
import { SiMaplibre } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
import { RiRoadMapFill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import React, { useState, useRef, useEffect, useContext } from 'react';
import PlaceSave from './PlaceSave';
import useMobile from 'components/UseMobile.js';
import { MapContext } from 'context/MapContext';
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";
export default function MapSearch({ closeEvent }) {

    const isMobile = useMobile();

    const { showMobileMapSearch, setShowMobileMapSearch, map, psRef, markers, setMarkers, currentPosition } = useContext(MapContext);

    // 임시 데이터
    const [datas, setDatas] = useState([]);

    const [selectedData, setSelectedData] = useState(null);
    const [showMobileMapList, setShowMobileMapList] = useState(false);      // 검색 목록 여부
    const [showPlaceSave, setShowPlaceSave] = useState(false);  // 저장

    // const [markers, setMarkers] = useState([]);
    const [keyword, setKeyword] = useState('');
    const kakao = window.kakao;

    const clearAllData = () => {
        setMarkers([]);
        setDatas([]);
        setSelectedData(null);
    }

    // 기존 마커 제거 로직
    useEffect(() => {

        // 기존의 마커들 제거
        markers.forEach(marker => marker.setMap(null));
        clearAllData();

        if (keyword.trim() !== '') {
            if (!psRef.current) {
                psRef.current = new window.kakao.maps.services.Places();    // psRef == null이면 Places 생성
            };
            handleSearch();
        }

    }, [keyword]);


    // 장소 검색
    const handleSearch = async () => {

        psRef.current.keywordSearch(keyword, (data, status) => {

            if (status === kakao.maps.services.Status.OK) {
                console.log(data);

                // 새로운 마커들 생성
                const newMarkers = data.map((place, index) => {
                    const markerPosition = new kakao.maps.LatLng(place.y, place.x);
                    const marker = new kakao.maps.Marker({
                        position: markerPosition
                    });
                    // 생성한 마커를 지도에 추가
                    marker.placeId = place.id
                    marker.setMap(map);
                    return marker;
                });
                setMarkers(newMarkers);

                // 검색 결과를 처리하는 로직 작성

                setDatas(
                    data.map((place) => (
                        {
                            placeId: place.id,
                            placeNm: place.place_name,
                            address: place.address_name,
                            placeUrl: place.place_url,
                            latitude: place.y,  // 위도
                            longitude: place.x  // 경도
                        })))

                // 검색 결과 중 첫 번째 장소의 위치를 기준으로 지도의 중심을 설정
                if (data.length > 0) {
                    const firstPlace = data[0];
                    const centerPosition = new kakao.maps.LatLng(firstPlace.y, firstPlace.x);
                    map.setCenter(centerPosition);
                }
            } else {
                clearAllData();
            }
        });

    }


    // 장소 검색
    const handleEnter = (event) => {

        if (event.key === 'Enter') {
            setKeyword(event.target.value);
        }
    };

    // 장소 정보 클릭했을 때
    const handlePlaceDataClick = async (data) => {

        setSelectedData(data);
        setShowMobileMapList(false);

        const dataPosition = new kakao.maps.LatLng(data.latitude, data.longitude);
        map.setCenter(dataPosition);


        // 클릭된 장소의 좌표와 마커의 좌표를 비교하여 색상을 변경
        markers.forEach(marker => {
            if (marker.placeId === data.placeId) {  // 클릭한 정보 마커 변경
                marker.setImage(new kakao.maps.MarkerImage(
                    'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                    new kakao.maps.Size(29, 40) // 마커 크기
                ));
                marker.setZIndex(1000); // 클릭된 마커를 가장 위로 올림
            } else {
                marker.setImage(null); // 원래 마커 이미지로 변경
                marker.setZIndex(0);
            }


        });
    };

    return (
        <>
            {/* PC */}
            {!isMobile &&
                <div className='sidebar-content-box'>
                    <input type="text" placeholder="장소 검색" className="map-search-input" onKeyDown={handleEnter} />

                    <div className='place-search-box'>
                        <Scrollbars thumbSize={85}>
                            {datas.length === 0 &&
                                <span>검색 결과가 존재하지 않습니다.</span>
                            }

                            {datas.length !== 0 && datas.map(data => (
                                <div key={data.placeId} className='border-b-gray-200 py-5 border-b '>
                                    <div className='place-search-item'>
                                        <div className='place-search-item flex-1' onClick={() => handlePlaceDataClick(data)}>
                                            <SiMaplibre className='size-10 text-slate-300' />
                                            <div className={`flex-1 ${selectedData !== null && selectedData.placeId === data.placeId ? 'text-[#96DBF4]' : ''}`}>
                                                <p>{data.placeNm}</p>
                                                <p>{data.address}</p>
                                            </div>
                                        </div>
                                        <div className='mr-4 gap-2 flex items-center'>
                                            <button onClick={() => window.open(data.placeUrl, '_blank')}>
                                                <MdOutlineInfo className='size-4' />
                                            </button>
                                            <button onClick={() => setShowPlaceSave(true)}>
                                                <FaRegStar className='size-4' />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </Scrollbars>
                    </div>
                </div>
            }


            {/* Mobile */}
            {/* 검색창 */}
            {isMobile &&
                <div role="presentation" className={`map-mobile-search-box ${showMobileMapSearch ? 'bg-white' : ''}`}>
                    {showMobileMapSearch &&
                        <button>
                            {showMobileMapList ?
                                <RiRoadMapFill className='size-7 text-[#96DBF4]' onClick={() => setShowMobileMapList((val) => !val)} />
                                :
                                <FaListUl className='size-7 text-[#96DBF4]' onClick={() => setShowMobileMapList((val) => !val)} />
                            }
                        </button>
                    }

                    <input type="text" placeholder="장소 검색" className="map-mobile-search-input h-full " 
                        onClick={() => { setShowMobileMapList(true); setShowMobileMapSearch(true); }} 
                        onKeyDown={handleEnter}
                         />

                    {showMobileMapSearch &&
                        <button onClick={() => { setShowMobileMapSearch(false); setShowMobileMapList(false); closeEvent('mapSearch'); clearAllData()}}>
                            <AiOutlineClose className='size-5' />
                        </button>
                    }
                </div>
            }

            {/* 검색 목록 */}
            {isMobile && showMobileMapList &&
                <div className='map-search-mobile-content-box'>
                    <div className='mobile-place-box'>
                        <Scrollbars thumbSize={85}>
                            {datas.length === 0 &&
                                <span>검색 결과가 존재하지 않습니다.</span>
                            }

                            {datas.length !== 0 && datas.map(data => (

                                <div key={data.placeId} className='border-b-gray-200 py-5 border-b '>
                                    <div className='place-search-item'>
                                        <div className='place-search-item flex-1' onClick={() => handlePlaceDataClick(data)}>
                                            <SiMaplibre className='size-10 text-slate-300' />
                                            <div className={`flex-1 ${selectedData !== null && selectedData.placeId === data.placeId ? 'text-[#96DBF4]' : ''}`}>
                                                <p>{data.placeNm}</p>
                                                <p>{data.address}</p>
                                            </div>
                                        </div>
                                        <div className='mr-4 gap-2 flex items-center'>
                                            <button onClick={() => window.open(data.placeUrl, '_blank')}>
                                                <MdOutlineInfo className='size-4' />
                                            </button>
                                            <button onClick={() => setShowPlaceSave(true)}>
                                                <FaRegStar className='size-4' />
                                            </button>

                                        </div>
                                    </div>
                                    {/* <button className='flex items-center gap-1 ml-12 mt-2 ' onClick={() => setShowPlaceSave(true)}>
                                        <FaRegStar />저장
                                    </button> */}
                                </div>

                            ))}
                        </Scrollbars>
                    </div>
                </div>
            }


            {showPlaceSave && <PlaceSave onClose={() => setShowPlaceSave(false)} />}

        </>

    )
}