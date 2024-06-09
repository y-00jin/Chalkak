import React, { useEffect, useState, useContext, useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { SiMaplibre } from "react-icons/si";
import { FaPencilAlt } from "react-icons/fa";
import useMobile from 'components/UseMobile.js';
import PlaceSave from './PlaceSave';
import axiosInstance from 'utils/axiosInstance';
import { MapContext } from 'context/MapContext';
import { RiRoadMapFill } from "react-icons/ri";
import { FaListUl } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { CiSignpostR1 } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import PlaceDetail from './PlaceDetail';
export default function PlaceStorage({ closeEvent }) {

    const isMobile = useMobile();
    const [activeTab, setActiveTab] = useState('PSCC_1');

    const [placeList, setPlaceList] = useState(null);
    const [selectedData, setSelectedData] = useState(null); // 장소 선택
    const kakao = window.kakao;
    const itemRefs = useRef({});
    const [showMobileStorage, setShowMobileStorage] = useState(true);
    const { map, storageMarker, setStorageMarker } = useContext(MapContext);

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
        clearPlaceDetail();
        savePlaceClear();
    }, []);

    // 탭 변경
    const changeActiveTab = (storageCategory) => {
        setSelectedData(null);
        setActiveTab(storageCategory);
        setSaveStorageCategory(storageCategory);
    };

    // 카테고리별 장소 조회
    useEffect(() => {

        storageMarker.forEach(marker => marker.setMap(null));
        setStorageMarker([]);

        getPlaceList(activeTab);
    }, [activeTab]);


    // 장소 정보 클릭했을 때
    const handlePlaceDataClick = async (data) => {

        setSelectedData(data);
        setShowMobileStorage(false);

        const dataPosition = new kakao.maps.LatLng(data.latitude, data.longitude);
        map.panTo(dataPosition);
        // isMobile?map.setCenter(dataPosition):map.panTo(dataPosition);

        // 클릭된 장소의 좌표와 마커의 좌표를 비교하여 색상을 변경
        storageMarker.forEach(marker => {
            if (marker.place_seq_no === data.place_seq_no) {  // 클릭한 정보 마커 변경
                marker.setImage(new kakao.maps.MarkerImage(
                    `${process.env.PUBLIC_URL}/images/marker_search_skyblue.png`, // 마커 이미지 경로
                    new kakao.maps.Size(32, 32)
                ));
                marker.setZIndex(35); // 클릭된 마커를 가장 위로 올림
            } else {
                marker.setImage(new kakao.maps.MarkerImage(
                    `${process.env.PUBLIC_URL}/images/marker_search.png`, // 마커 이미지 경로
                    new kakao.maps.Size(32, 32)
                )); // 원래 마커 이미지로 변경
                marker.setZIndex(0);
            }
        });
    };

    // 마커 이벤트
    useEffect(() => {
        if (storageMarker.length <= 0) {
            return;
        }

        // 마커 클릭리스너 추가
        storageMarker.forEach(marker => {
            kakao.maps.event.addListener(marker, 'click', () => {

                const clickData = {
                    place_seq_no: marker.place_seq_no,
                    place_id: marker.place_id,
                    place_nm: marker.place_nm,
                    place_category_code: marker.place_category_code,
                    memory_date: marker.memory_date,
                    address: marker.address,
                    place_url: marker.place_url,
                    latitude: marker.getPosition().getLat(),
                    longitude: marker.getPosition().getLng()
                };

                handlePlaceDataClick(clickData);

                if (isMobile) {
                    setShowMobileStorage(true);
                }

                setTimeout(() => {
                    if (itemRefs.current[clickData.place_seq_no]) {
                        itemRefs.current[clickData.place_seq_no].scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            });
        });
    }, [storageMarker]);


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
            marker.place_seq_no = place.place_seq_no;
            marker.place_id = place.place_id;
            marker.place_nm = place.place_nm;
            marker.place_category_code = place.place_category_code;
            marker.address = place.address;
            marker.memory_date = place.memory_date;
            marker.place_url = place.place_url;

            marker.setMap(map);
            return marker;
        });
        setStorageMarker(newMarkers);

        // 마커가 모두 추가된 후에 map.panTo 호출
        if (newMarkers.length > 0) {
            const centerPosition = new kakao.maps.LatLng(newMarkers[0].getPosition().getLat(), newMarkers[0].getPosition().getLng());
            map.panTo(centerPosition);
            // isMobile?map.setCenter(centerPosition):map.panTo(centerPosition);
        }

    }, [placeList]);


    // 장소 저장에 필요한 데이터
    const [showPlaceSave, setShowPlaceSave] = useState(false);  // 저장
    const [savePlaceSeqNo, setSavePlaceSeqNo] = useState(null);
    const [savePlaceAlias, setSavePlaceAlias] = useState('');
    const [saveNotes, setSaveNotes] = useState('');
    const [memoryDate, setMemoryDate] = useState(null);
    const [saveStorageCategory, setSaveStorageCategory] = useState('PSCC_1');
    const [saveEditRestrict, setSaveEditRestrict] = useState(false);
    const [saveVisibleEditRestrict, setSaveVisibleEditRestrict] = useState(true);


    // 장소 저장 정보 초기화
    const savePlaceClear = () => {
        setShowPlaceSave(false);
        setSavePlaceSeqNo(null);
        setSavePlaceAlias('');
        setSaveNotes('');
        setMemoryDate(null);
        setSaveStorageCategory('PSCC_1');
        setSaveEditRestrict(false);
        setSaveVisibleEditRestrict(true);
    }

    // 저장 컴포넌트 열기
    const openSavePlace = async (data) => {
        setSavePlaceSeqNo(data.place_seq_no);
        setSavePlaceAlias(data.place_alias);
        setSaveNotes(data.notes);
        setMemoryDate(data.memory_date);
        setSaveStorageCategory(data.storage_category);
        setSaveEditRestrict(data.edit_restrict);

        const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
        if (data.user_seq_no !== loginUser.user_seq_no) {
            setSaveVisibleEditRestrict(false);
        }

        setShowPlaceSave(true);
    }

    // 저장
    const handleSavePlace = async () => {

        if (savePlaceAlias === '') {
            alert('장소 명을 입력하세요.');
            return;
        }

        // 저장  데이터
        let reqData = {
            place_seq_no: savePlaceSeqNo,
            place_alias: savePlaceAlias,
            notes: saveNotes,
            memory_date :memoryDate,
            storage_category: saveStorageCategory,
            edit_restrict: saveEditRestrict
        };

        try {
            // 장소정보 저장
            const res = await axiosInstance.put(`/api/places/place`, reqData);

            savePlaceClear(); // 저장 정보 초기화

            if (res.data.resultMsg !== '') {
                alert(res.data.resultMsg);
            } else {
                storageMarker.forEach(marker => marker.setMap(null));
                setStorageMarker([]);
                getPlaceList(activeTab);
            }
        } catch (error) {
            savePlaceClear(); // 저장 정보 초기화
            alert(error.response.data.resultMsg);
        }
    }

    const [showPlaceDetail, setShowPlaceDetail] = useState(false);  // 상세 정보
    const [showPlaceDetailData, setShowPlaceDetailData] = useState(null);  // 상세 정보 데이터

    // 상세정보
    const openPlaceUrl = (data) => {
        // 추억 장소
        if (activeTab === 'PSCC_2') {
            setShowPlaceDetailData(data);
            setShowPlaceDetail(true);
        } else {

            let placeUrl = data.place_url;
            if (isMobile) {
                const parts = data.place_url.split('.com');
                placeUrl = parts[0] + '.com/m' + parts[1];
                // const remainingUrl = parts.length > 1 ? parts[1] : '';
            }
            window.open(placeUrl, '_blank')
        }
    }
    const clearPlaceDetail = () => {
        setShowPlaceDetailData(null);
        setShowPlaceDetail(false);
    }

    // 장소 삭제
    const deletePlace = async (data) => {

        try {
            const res = await axiosInstance.delete(`/api/places/place`, {
                params: {
                    placeSeqNo: data.place_seq_no
                }
            });

            if (res.status === 200) {
                storageMarker.forEach(marker => marker.setMap(null));
                setStorageMarker([]);
                getPlaceList(activeTab);
            } else {
                alert(res.data.resultMsg);
            }
        } catch (error) {
            alert(error.response.data.resultMsg);
        }
    }



    return (
        <>
            {!isMobile &&

                <div className='sidebar-content-box px-2 py-5'>
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

                    <div className='place-storage-box' >
                        <Scrollbars thumbSize={85}  >

                            {placeList !== null && placeList.map((data) => (
                                <div key={data.place_seq_no} className='border-b-gray-200 border-b py-5' ref={(el) => (itemRefs.current[data.place_seq_no] = el)}>
                                    <div className='place-storage-item'>

                                        <SiMaplibre className='size-10' style={{ color: data.symbol_color_code }} />
                                        <div className={`flex-1 cursor-pointer ${selectedData !== null && selectedData.place_seq_no === data.place_seq_no ? 'text-[#00BFFF]' : ''}`} onClick={() => handlePlaceDataClick(data)}>
                                            <p className='text-lg'>{data.place_alias}</p>
                                            <p className='text-sm flex items-center gap-1 ' title={`${data.address}`}><CiLocationOn /> {data.address.length > 25 ? `${data.address.substring(0, 18)}...` : data.address}</p>
                                            {data.notes !== '' &&
                                                <p className='text-sm flex items-center gap-1  ' title={`${data.notes}`} ><CiSignpostR1 /> {data.notes.length > 25 ? `${data.notes.substring(0, 18)}...` : data.notes}</p>
                                            }

                                        </div>

                                        {(data.edit_restrict === false || (data.edit_restrict === true && data.user_seq_no === JSON.parse(sessionStorage.getItem('loginUser')).user_seq_no)) &&
                                            <div className='flex gap-3 float-right text-gray-400 mr-3'>
                                                <button onClick={() => { openSavePlace(data); }}>
                                                    <FaPencilAlt />
                                                </button>
                                                <button onClick={() => { deletePlace(data); }}>
                                                    <AiOutlineClose />
                                                </button>

                                            </div>
                                        }
                                    </div>

                                    {data.place_url !== '' &&
                                        <div className={`ml-[3.25rem] ${selectedData !== null && selectedData.place_seq_no === data.place_seq_no ? 'text-[#00BFFF]' : 'text-gray-600'} `}>
                                            <button className='flex gap-1 items-center cursor-pointer text-sm' onClick={() => openPlaceUrl(data)}>
                                                <IoInformationCircleOutline className='size-3' />
                                                상세 정보
                                            </button>
                                        </div>
                                    }
                                </div>
                            ))}
                            {placeList === null &&
                                <div className='flex gap-3 items-center p-3 py-5'>
                                    저장된 장소 정보가 없습니다.
                                </div>
                            }
                        </Scrollbars>
                    </div >
                </div>
            }


            {isMobile &&
                <div role="presentation" className='absolute top-0 left-0 flex gap-2 h-20 w-full px-6 py-5 items-center bg-white z-[25]'>
                    <button className=''>
                        {showMobileStorage ?
                            <RiRoadMapFill className='size-6 text-[#00BFFF]' onClick={() => setShowMobileStorage((val) => !val)} />
                            :
                            <FaListUl className='size-6 text-[#00BFFF]' onClick={() => setShowMobileStorage((val) => !val)} />
                        }
                    </button>
                    <button className='menu-mobile-close-btn absolute right-5' onClick={() => closeEvent('mapSearch')}>
                        <AiOutlineClose className='size-5' />
                    </button>
                </div>
            }
            {
                isMobile && showMobileStorage &&
                <div className='place-storage-mobile-content-box'>
                    <div >
                        <ul className='place-storage-tab-box' >
                            <li className={`place-storage-tab-item  ${activeTab === 'PSCC_1' ? 'place-storage-tab-item-active' : ''}`}
                            ><button className='w-full' onClick={() => { changeActiveTab('PSCC_1') }}>저장 장소</button>
                            </li>
                            <li className={`place-storage-tab-item  ${activeTab === 'PSCC_2' ? 'place-storage-tab-item-active' : ''}`}
                            ><button className='w-full' onClick={() => { changeActiveTab('PSCC_2') }}>추억 장소</button>
                            </li>
                        </ul>
                    </div>
                    <div className='place-storage-box flex-1' >
                        <Scrollbars thumbSize={85}  >

                            {placeList !== null && placeList.map((data) => (
                                <div key={data.place_seq_no} className='border-b-gray-200 border-b py-5' ref={(el) => (itemRefs.current[data.place_seq_no] = el)}>
                                    <div className='place-storage-item'>

                                        <SiMaplibre className='size-10' style={{ color: data.symbol_color_code }} />
                                        <div className={`flex-1 cursor-pointer ${selectedData !== null && selectedData.place_seq_no === data.place_seq_no ? 'text-[#00BFFF]' : ''}`} onClick={() => handlePlaceDataClick(data)}>
                                            <p className='text-lg'>{data.place_alias}</p>

                                            <p className='text-sm flex items-center gap-1 ' title={`${data.address}`}><CiLocationOn /> {data.address.length > 25 ? `${data.address.substring(0, 18)}...` : data.address}</p>
                                            {data.notes !== '' &&
                                                <p className='text-sm flex items-center gap-1  ' title={`${data.notes}`} ><CiSignpostR1 /> {data.notes.length > 25 ? `${data.notes.substring(0, 18)}...` : data.notes}</p>
                                            }

                                        </div>

                                        {(data.edit_restrict === false || (data.edit_restrict === true && data.user_seq_no === JSON.parse(sessionStorage.getItem('loginUser')).user_seq_no)) &&
                                            <div className='flex gap-3 float-right text-gray-400 mr-3'>
                                                <button onClick={() => { openSavePlace(data); }}>
                                                    <FaPencilAlt />
                                                </button>
                                                <button onClick={() => { deletePlace(data); }}>
                                                    <AiOutlineClose />
                                                </button>

                                            </div>
                                        }
                                    </div>

                                    {data.place_url !== '' &&

                                        <div className={`ml-[3.25rem] ${selectedData !== null && selectedData.place_seq_no === data.place_seq_no ? 'text-[#00BFFF]' : 'text-gray-600'} `}>
                                            <button className='flex gap-1 items-center cursor-pointer text-sm' onClick={() => openPlaceUrl(data)}>
                                                <IoInformationCircleOutline className='size-3' />
                                                상세 정보
                                            </button>
                                        </div>
                                    }
                                </div>
                            ))}
                            {placeList === null &&
                                <div className='flex gap-3 items-center p-3 py-5'>
                                    저장된 장소 정보가 없습니다.
                                </div>
                            }
                        </Scrollbars>
                    </div >
                </div>
            }



            {showPlaceSave && <PlaceSave
                onClose={() => { savePlaceClear(); }}
                placeAlias={savePlaceAlias} setPlaceAlias={setSavePlaceAlias}
                notes={saveNotes} setNotes={setSaveNotes}
                memoryDate={memoryDate} setMemoryDate ={setMemoryDate}
                storageCategory={saveStorageCategory} setStorageCategory={setSaveStorageCategory}
                editRestrict={saveEditRestrict} setEditRestrict={setSaveEditRestrict}
                visibleEditRestrict={saveVisibleEditRestrict}
                handleSavePlace={handleSavePlace}
            />
            }

            {showPlaceDetail && <PlaceDetail
                onClose={() => { clearPlaceDetail(); }}
                placeSeqNo={showPlaceDetailData.place_seq_no}
            />

            }

        </>

    )
}

