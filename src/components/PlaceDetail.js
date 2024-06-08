import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import axiosInstance from 'utils/axiosInstance';
import useMobile from 'components/UseMobile';

import { CiLocationOn } from "react-icons/ci";
import { CiSignpostR1 } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { BsEmojiSmileFill } from "react-icons/bs";
import { GoTrash } from "react-icons/go";


export default function PlaceDetail({ onClose, placeSeqNo }) {

    const isMobile = useMobile();
    const [placeData, setPlaceData] = useState({})


    // 장소 정보 가져오기
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

    // 상세정보
    const openDetailPlaceUrl = (data) => {
        let placeUrl = data;
        if (isMobile) {
            const parts = data.split('.com');
            placeUrl = parts[0] + '.com/m' + parts[1];
            // const remainingUrl = parts.length > 1 ? parts[1] : '';
        }
        window.open(placeUrl, '_blank')
    }

    // 추억 정보 가져온 후 place_detail 정보 조회
    useEffect(()=>{

    },[placeData])

    useEffect(() => {
        getPlaceInfo(); // 추억 정보
    }, [])
    return (
        <>
            <div className='fixed top-0 left-0 z-[38] w-full h-screen bg-gray-950 opacity-50' onClick={onClose} />

            <div className={`bg-white z-[40] py-5  ${isMobile ? 'absolute top-0 w-full h-full ' : 'shadow-lg  border-gray-300 rounded-[30px] border top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 fixed min-w-[500px] w-[35%] h-[75%]'} `}>
                <Scrollbars thumbSize={85}>
                    <div className='px-5 flex flex-col h-full'>

                        <div className="relative">
                            <button className="absolute right-0 top-0 " onClick={onClose}><AiOutlineClose /></button>
                        </div>

                        <div className='gap-1 flex flex-col border-b border-gray-200 pb-5'>
                            <p className='text-[#96DBF4] text-2xl mb-2 flex items-center gap-2'>
                                {placeData.place_alias}
                                <button className='size-5 cursor-pointer hover:text-cyan-800' onClick={() => openDetailPlaceUrl(placeData.place_url)}>
                                    <IoInformationCircleOutline className='size-5' />
                                </button>
                            </p>

                            {placeData.address !== '' &&
                                <div className='flex gap-3 items-center text-lg'>
                                    <CiLocationOn className='size-5' />
                                    <p className='w-full'>{placeData.address}</p>
                                </div>
                            }
                            {placeData.notes !== '' &&

                                <div className='flex gap-3 items-center text-lg'>
                                    <CiSignpostR1 className='size-5 ' />
                                    <p className='w-full max-h-20 overflow-y-auto'>{placeData.notes}</p>
                                </div>
                            }
                            <p className='flex gap-3 items-center text-lg'><CiCalendar /> {placeData.memory_date === null ? '-' : placeData.memory_date}</p>

                        </div>

                        <div className='flex flex-col flex-1 pt-7 '>
                            <div className='flex-1'>

                                {/* 사용자 추억 목록 */}
                                <div className='flex flex-col gap-5 mb-5 '>
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex items-center gap-1'>
                                            <BsEmojiSmileFill className='text-[#ff0000]' />
                                            <p className='text-[#ff0000] text-lg'>강성현</p>
                                        </div>

                                        <div className='px-5 '>
                                            강릉 여행 너무 재밌었음
                                        </div>
                                        <div className='flex items-center px-5 text-gray-400'>
                                            <p className=' text-xs flex-1'>2024.06.09</p>
                                            <div className='flex gap-2'>
                                                <button className='cursor-pointer hover:text-[#96DBF4] hover:border-[#96DBF4] shadow-sm border-[1px] rounded-full w-12 text-sm'>수정</button>
                                                <button className='cursor-pointer hover:text-[#96DBF4] hover:border-[#96DBF4] shadow-sm border-[1px] rounded-full w-12 text-sm'>삭제</button>
                                            </div>
                                        </div>
                                        {/* <p className='border-[1px] flex-1 rounded-lg p-2 min-h-16 border-gray-200 relative before:content-["<"] before:absolute before:left-[-1rem] before:text-gray-200 before:text-2xl '>내용~~</p> */}
                                    </div>

                                </div>

                                <div className='flex flex-col gap-5 mb-5'>
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex items-center gap-1'>
                                            <BsEmojiSmileFill className='text-[#ff0000]' />
                                            <p className='text-[#ff0000] text-lg'>강성현</p>
                                        </div>

                                        <div className='px-5 '>
                                            강릉 여행 너무 재밌었음
                                        </div>
                                        <div className='flex items-center px-5 text-gray-400'>
                                            <p className=' text-xs flex-1'>2024.06.09</p>
                                            <div className='flex gap-2'>
                                                <button className='cursor-pointer hover:text-[#96DBF4] hover:border-[#96DBF4] shadow-sm border-[1px] rounded-full w-12 text-sm'>수정</button>
                                                <button className='cursor-pointer hover:text-[#96DBF4] hover:border-[#96DBF4] shadow-sm border-[1px] rounded-full w-12 text-sm'>삭제</button>
                                            </div>
                                        </div>
                                        {/* <p className='border-[1px] flex-1 rounded-lg p-2 min-h-16 border-gray-200 relative before:content-["<"] before:absolute before:left-[-1rem] before:text-gray-200 before:text-2xl '>내용~~</p> */}
                                    </div>

                                </div>


                            </div>





                            {/* 입력창 */}
                            <div className='gap-2 flex items-center p-1 ' >
                                <textarea className='bg-gray-100 rounded-2xl w-full min-h-[4.5rem]  resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#96DBF4] '>

                                </textarea>
                                <button className="bg-[#96DBF4] rounded-full w-20 h-16 text-white text-center ">저장</button>

                                {/* <button className='flex justify-end'>
                                    <FaCircleCheck className='size-5'/>
                                </button> */}

                            </div>




                        </div>

                    </div>




                </Scrollbars>
            </div>




        </>

    )
}