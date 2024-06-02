import React, { useEffect, useState, useContext, useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { SiMaplibre } from "react-icons/si";
import { FaPencilAlt } from "react-icons/fa";
import useMobile from 'components/UseMobile.js';
import PlaceSave from './PlaceSave';
import axiosInstance from 'utils/axiosInstance';
import { MapContext } from 'context/MapContext';

export default function PlaceStorage({ closeEvent }) {

    const isMobile = useMobile();
    const [activeTab, setActiveTab] = useState('PSCC_1');

    const [placeList, setPlaceList] = useState(null);
    const [selectedData, setSelectedData] = useState(null); // 장소 선택
    const kakao = window.kakao;
    const itemRefs = useRef({});
    const { showMobileMapSearch, setShowMobileMapSearch, map, psRef, markers, setMarkers, currentPosition } = useContext(MapContext);
    // 추억 정보 가져오기
    const getPlaceList = async (storageCategory) => {
        try {
            const res = await axiosInstance.get(`/api/places/active`, {
                params: {
                    storageCategory: storageCategory
                }
            });
            setPlaceList(res.data.placeList);

        } catch (error) {
            setPlaceList(null);
        }
    }

    // 장소목록
    useEffect(() => {
        setShowPlaceSave(false);
    }, []);

    // 탭 변경
    const changeActiveTab = (storageCategory) => {
        setActiveTab(storageCategory);
        setSaveStorageCategory(storageCategory);
    };

    // 카테고리별 장소 조회
    useEffect(() => {

        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);

        getPlaceList(activeTab);
    }, [activeTab]);

    // 마커
    useEffect(() => {
        if (placeList === null)
            return;


        const newMarkers = placeList.map((place) => {
            const markerPosition = new kakao.maps.LatLng(place.latitude, place.longitude);
            const markerImage = new kakao.maps.MarkerImage(
                `${process.env.PUBLIC_URL}/images/marker_search.png`, // 마커 이미지 경로
                new kakao.maps.Size(32, 32)
            );

            const marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage // 마커 이미지 설정
            });

            // 생성한 마커를 지도에 추가
            marker.placeId = place.place_id;
            marker.placeNm = place.place_nm;
            marker.placeCategoryCode = place.place_category_code;
            marker.address = place.address_name;
            marker.placeUrl = place.place_url;

            // 이벤트
            kakao.maps.event.addListener(marker, 'click', () => {

                const clickData = {
                    placeId: marker.placeId,
                    placeNm: marker.placeNm,
                    placeCategoryCode: marker.placeCategoryCode,
                    address: marker.address,
                    placeUrl: marker.placeUrl,
                    latitude: marker.getPosition().getLat(),
                    longitude: marker.getPosition().getLng()
                };

                handlePlaceDataClick(clickData);
                setTimeout(() => {
                    if (itemRefs.current[clickData.placeId]) {
                        itemRefs.current[clickData.placeId].scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            });

            marker.setMap(map);
            return marker;
        });
        setMarkers(newMarkers);

        // 마커가 모두 추가된 후에 map.panTo 호출
        if (newMarkers.length > 0) {

            const centerPosition = new kakao.maps.LatLng(newMarkers[0].getPosition().getLat(), newMarkers[0].getPosition().getLng());
            map.panTo(centerPosition);
        }

    }, [placeList]);

    // 장소 정보 클릭했을 때
    const handlePlaceDataClick = async (data) => {

        setSelectedData(data);

        const dataPosition = new kakao.maps.LatLng(data.latitude, data.longitude);
        map.panTo(dataPosition);

        // 클릭된 장소의 좌표와 마커의 좌표를 비교하여 색상을 변경
        markers.forEach(marker => {
            if (marker.placeId === data.place_id) {  // 클릭한 정보 마커 변경
                marker.setImage(new kakao.maps.MarkerImage(
                    `${process.env.PUBLIC_URL}/images/marker_search_current.png`, // 마커 이미지 경로
                    new kakao.maps.Size(32, 32)
                ));
                marker.setZIndex(1000); // 클릭된 마커를 가장 위로 올림
            } else {
                marker.setImage(new kakao.maps.MarkerImage(
                    `${process.env.PUBLIC_URL}/images/marker_search.png`, // 마커 이미지 경로
                    new kakao.maps.Size(32, 32)
                )); // 원래 마커 이미지로 변경
                marker.setZIndex(0);
            }
        });
    };


    // 장소 저장에 필요한 데이터
    const [showPlaceSave, setShowPlaceSave] = useState(false);  // 저장
    const [savePlaceId, setSavePlaceId] = useState(null);
    const [savePlaceAlias, setSavePlaceAlias] = useState('');
    const [saveNotes, setSaveNotes] = useState('');
    const [saveStorageCategory, setSaveStorageCategory] = useState('PSCC_1');
    const [saveEditRestrict, setSaveEditRestrict] = useState(false);

    const handleSavePlace = async () => {
        console.log(savePlaceId);
        console.log(savePlaceAlias);
        console.log(saveNotes);
        console.log(saveStorageCategory);
        console.log(saveEditRestrict);
    }

    useEffect(() => {
        if (map && placeList !== null && placeList.length > 0) {
            // 검색 결과 중 첫 번째 장소의 위치를 기준으로 지도의 중심을 설정
            const centerPosition = new kakao.maps.LatLng(placeList[0].latitude, placeList[0].longitude);
            map.panTo(centerPosition);
        }
    }, [placeList, map]);



    return (
        <>
            <div className={`${!isMobile ? 'sidebar-content-box px-2 py-5' : 'menu-mobile-content-box'}`}>
                {isMobile &&
                    <div className='menu-mobile-close-btn-wrapper'>
                        <button className='menu-mobile-close-btn' onClick={() => closeEvent('mapSearch')}>
                            <AiOutlineClose className='size-5' />
                        </button>
                    </div>
                }

                <div>
                    <ul className='place-storage-tab-box' >
                        <li className={`place-storage-tab-item  ${activeTab === 'PSCC_1' ? 'place-storage-tab-item-active' : ''}`}
                        ><button className='w-full' onClick={() => { changeActiveTab('PSCC_1') }}>저장 장소</button>
                        </li>
                        <li className={`place-storage-tab-item  ${activeTab === 'PSCC_2' ? 'place-storage-tab-item-active' : ''}`}
                        ><button className='w-full' onClick={() => { changeActiveTab('PSCC_2') }}>추억 장소</button>
                        </li>
                    </ul>
                </div>

                <div className='place-storage-box'>
                    <Scrollbars thumbSize={85}>

                        {placeList !== null && placeList.map((data, index) => (
                            <div key={data.place_seq_no} className='place-storage-item' ref={(el) => (itemRefs.current[data.placeId] = el)}>
                                <SiMaplibre className='size-12 text-slate-300' />
                                <div className={`flex-1 cursor-pointer ${selectedData !== null && selectedData.place_id === data.place_id ? 'text-[#96DBF4]' : ''}`}  onClick={() => handlePlaceDataClick(data)}>
                                    <p className='text-lg'>{data.place_alias}</p>
                                    <p className='text-sm '>{data.address}</p>
                                    <p className='text-sm '>{data.notes}</p>
                                </div>

                                <div className='flex gap-3 float-right text-gray-400'>
                                    <button onClick={() => { setSavePlaceId(data.place_seq_no); setSavePlaceAlias(data.place_alias); setSaveNotes(data.notes); setShowPlaceSave(true) }}>
                                        <FaPencilAlt />
                                    </button>

                                    <AiOutlineClose />
                                </div>


                            </div>
                        ))}
                        {placeList === null &&
                            <div className='flex gap-3 items-center p-3 py-5'>
                                저장된 장소 정보가 없습니다.
                            </div>
                        }
                    </Scrollbars>


                </div>




            </div>

            {showPlaceSave && <PlaceSave
                onClose={() => { setShowPlaceSave(false); setSavePlaceId(null); }}
                placeAlias={savePlaceAlias} setPlaceAlias={setSavePlaceAlias}
                notes={saveNotes} setNetes={setSaveNotes}
                storageCategory={saveStorageCategory} setStorageCategory={setSaveStorageCategory}
                editRestrict={saveEditRestrict} setEditRestrict={setSaveEditRestrict}
                handleSavePlace={handleSavePlace}
            />
            }

        </>

    )
}

