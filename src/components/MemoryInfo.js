import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FaPencilAlt } from "react-icons/fa";
import { BsEmojiSmileFill } from "react-icons/bs";
import useMobile from 'components/UseMobile.js';
import axios from "axios";
import { IoCheckmark } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";


export default function MemoryInfo({ closeEvent }) {

    const isMobile = useMobile();
    const [memoryNm, setMemoryNm] = useState('');
    const [memoryCode, setMemoryCode] = useState('');
    const [memoryCodeSeqNo, setMemoryCodeSeqNo] = useState('');


    const [memoryNmEdit, setMemoryNmEdit] = useState(false); // 수정 모드 여부를 추적하는 상태 
    const [editedMemoryNm, setEditedMemoryNm] = useState('');   // 수정 추억 명

    // 사용자 데이터
    const [userList, setUserList] = useState([]);

    useEffect(() => {

        let activeMemoryInfo = null;

        // 추억 정보 가져오기
        const getActiveMemoryInfo = async () => {
            try {

                // 세션에서 추억 정보 가져오기
                const activeMemoryInfoStr = sessionStorage.getItem('activeMemoryInfo');

                if (activeMemoryInfoStr != null) {
                    activeMemoryInfo = JSON.parse(activeMemoryInfoStr);
                } else {
                    // 세션이 비어있는 경우 추억 정보 조회
                    const res = await axios.get('/api/memories/active');
                    activeMemoryInfo = res.data.memoryInfo;
                    sessionStorage.setItem("activeMemoryInfo", JSON.stringify(activeMemoryInfo));
                }

                // 추억 정보 설정
                setMemoryNm(activeMemoryInfo.memory_nm);
                setMemoryCode(activeMemoryInfo.memory_code);
                setMemoryCodeSeqNo(activeMemoryInfo.memory_code_seq_no);
            } catch (error) {
                console.error('Error fetching or setting active memory info:', error);
            }
        };

        getActiveMemoryInfo();
    }, [])

    // 추억에 속한 사용자 정보 목록 가져오기
    useEffect(() => {
        if (memoryCodeSeqNo == '') {
            return;
        }

        const getUsersInMemory = async () => {
            try {
                const res = await axios.get(`/api/memories/memoryCodes/${memoryCodeSeqNo}/users`);
                setUserList(res.data.userList);
            } catch (error) {
            }
        };

        getUsersInMemory();
    }, [memoryCodeSeqNo])




    // 수정 모드로 전환하는 함수
    const enableEdit = () => {
        setEditedMemoryNm(memoryNm); // 수정하기 전에 기존 값을 저장
        setMemoryNmEdit(true);
    };

    // 수정 모드를 취소하고 이전 값으로 되돌리는 함수
    const cancelEdit = () => {
        setMemoryNm(editedMemoryNm); // 이전 값으로 되돌림
        setMemoryNmEdit(false);
    };

    // 수정된 값을 적용하고 수정 모드를 종료하는 함수
    const applyEdit = () => {

        // DB update

        // session update
        
        // front update
        setMemoryNm(editedMemoryNm); // 수정된 값을 적용
        setMemoryNmEdit(false); // 수정 모드 종료
    };

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

                <div className={`${!isMobile ? 'memory-change-info-box' : 'memory-change-mobile-info-box '}`}>
                    <div className='flex flex-col'>
                        <div className="flex text-xl gap-2 items-center pb-5">


                        {memoryNmEdit ? ( // 수정 모드인 경우
                                <input
                                    type="text"
                                    className='bg-gray-100 rounded-full px-8 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#96DBF4] focus:ring-opacity-50'
                                    value={editedMemoryNm}
                                    onChange={(e) => setEditedMemoryNm(e.target.value)}
                                />
                            ) : (
                                <>
                                    <span className='text-2xl'>{memoryNm}</span>
                                    <button onClick={enableEdit}><FaPencilAlt /></button>
                                </>
                            )}
                            {memoryNmEdit && ( // 수정 모드인 경우에만 확인 및 취소 버튼 표시
                                <>
                                    <button className='text-green-400' onClick={applyEdit}><FaCheck/></button>
                                    <button className='text-red-500' onClick={cancelEdit}><IoClose className='size-8'/></button>
                                </>
                            )}




                            {/* {memoryNm}
                            <button><FaPencilAlt /></button> */}
                        </div>
                        <p>
                            {memoryCode}
                        </p>
                    </div>
                </div>

                <div className={`${!isMobile ? 'memory-change-box' : 'memory-change-mobile-box'}`}>
                    <Scrollbars thumbSize={85}>

                        {userList.map((data, index) => (
                            <div key={data.user_seq_no} className={`${!isMobile ? 'memory-info-item' : 'memory-info-mobile-item'}`}>
                                <BsEmojiSmileFill className={`size-8`} style={{ color: data.symbol_color_code }} />
                                <p>{data.user_nm}</p>
                            </div>
                        ))}
                    </Scrollbars>

                </div>

                <div className='memory-change-btn-box '>
                    <button onClick={() => alert('연결 해제')}>이 추억 나가기</button>
                </div>

            </div>
        </>
    )
}