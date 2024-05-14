import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FaPencilAlt } from "react-icons/fa";
import { BsEmojiSmileFill } from "react-icons/bs";
import useMobile from 'components/UseMobile.js';
import axios from "axios";
export default function MemoryInfo({ closeEvent }) {

    const isMobile = useMobile();
    const [memoryNm, setMemoryNm] = useState('');
    const [memoryCode, setMemoryCode] = useState('');
    const [memoryCodeSeqNo, setMemoryCodeSeqNo] = useState('');

    // 사용자 임시 데이터
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


    useEffect(() => {
        if (memoryCodeSeqNo == '') {
            return;
        }

        // 추억에 속한 사용자 정보 목록 가져오기
        const getUsersInMemory = async () => {
            try {
                const res = await axios.get(`/api/memories/memoryCodes/${memoryCodeSeqNo}/users`);
                setUserList(res.data.userList);
            } catch (error) {
            }
        };

        getUsersInMemory();
    }, [memoryCodeSeqNo])


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
                        <div className="flex text-2xl gap-2 items-center">
                            {memoryNm}
                            <button><FaPencilAlt /></button>
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