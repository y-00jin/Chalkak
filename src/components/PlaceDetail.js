import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import axiosInstance from 'utils/axiosInstance';
import useMobile from 'components/UseMobile';

import { CiLocationOn } from "react-icons/ci";
import { CiSignpostR1 } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";

import { Scrollbars } from 'react-custom-scrollbars-2';


export default function PlaceDetail({ onClose, placeSeqNo }) {

    const isMobile = useMobile();
    const [placeData, setPlaceData] = useState({})


    // 추억 정보 가져오기
    const getPlaceInfo = async () => {
        try {
            const res = await axiosInstance.get(`/api/places/place/placeSeqNo`, {
                params: {
                    placeSeqNo: placeSeqNo
                }
            });
            setPlaceData(res.data.placeInfo);
        } catch (error) {
            setPlaceData(null);
            alert('장소 정보 조회 중 문제가 발생했습니다. 다시 시도해주세요.');
            onClose();
        }
    }

    useEffect(() => {
        getPlaceInfo();
    }, [])
    return (
        <>
            <div className='fixed top-0 left-0 z-[38] w-full h-screen bg-gray-950 opacity-50' onClick={onClose} />

            <div className={`bg-white z-[40] p-5 ${isMobile ? 'absolute top-0 w-full h-full ' : 'shadow-lg  border-gray-300 rounded-[30px] border top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 fixed min-w-[500px] w-[35%] h-[75%]'} `}>

                <Scrollbars thumbSize={85}  >
                    <div className="relative">
                        <button className="absolute right-0 top-0 " onClick={onClose}><AiOutlineClose /></button>
                    </div>

                    <div className='gap-1 flex flex-col border-b border-gray-200 pb-5'>
                        <p className='text-[#96DBF4] text-2xl mb-2'>{placeData.place_alias}</p>
                        {placeData.address !== '' &&
                            <p className='flex gap-3 items-center text-lg'><CiLocationOn /> {placeData.address}</p>
                        }
                        {placeData.notes !== '' &&
                            <p className='flex gap-3 items-center text-lg'><CiSignpostR1 /> {placeData.notes}</p>
                        }
                        {placeData.place_url !== '' &&
                            <p className='flex gap-3 items-center text-lg'><IoInformationCircleOutline />{placeData.place_url}</p>
                        }
                        <p className='flex gap-3 items-center text-lg'><CiCalendar /> {placeData.memory_date === null ? '-' : placeData.memory_date}</p>

                    </div>


                </Scrollbars>


            </div>




        </>

    )
}