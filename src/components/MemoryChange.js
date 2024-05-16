import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom';
import useMobile from 'components/UseMobile.js';
import { MdOutlineChecklist } from "react-icons/md";
import axios from "axios";

export default function MemoryChange({ closeEvent }) {

    const isMobile = useMobile();

    const navigate = useNavigate();
    const [memoryNm, setMemoryNm] = useState('');
    const [memoryCode, setMemoryCode] = useState('');
    const [memoryCodeSeqNo, setMemoryCodeSeqNo] = useState('');
    const [selectedMemorySeqNo, setSelectedMemorySeqNo] = useState('');   // 선택된 추억 정보

    // 임시 데이터
    const [memoryList, setMemoryList] = useState([]);

    // 활성화 추억 정보
    useEffect(() => {

        // 추억 정보 가져오기
        const getActiveMemoryInfo = async () => {
            let activeMemoryInfo = null;
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

        // 추억 목록 가져오기
        const getMemorysInfo = async () => {
            try {
                const res = await axios.get('/api/memories/inactive');
                setMemoryList(res.data.memoryList);
            } catch (error) {
                console.error('Error fetching or setting active memory info:', error);
            }
        }

        getActiveMemoryInfo();
        getMemorysInfo();
    }, [memoryCodeSeqNo])


    const handleItemClick = (index) => {
        if (selectedMemorySeqNo === index) {
            setSelectedMemorySeqNo('');
        } else {
            setSelectedMemorySeqNo(index);
        }
    };

    // 추억 변경
    const handleChangeMemory = async () => {
        if (selectedMemorySeqNo === '') {
            alert('변경할 추억 정보를 선택해 주세요.');
            return;
        }

        await axios.put(`/api/memories/${selectedMemorySeqNo}/active`)
            .then(res => {
                if (res.status == 200) {

                    // SESSION UPDATE
                    const activeMemoryInfo = res.data.memoryInfo;
                    sessionStorage.setItem("activeMemoryInfo", JSON.stringify(activeMemoryInfo));

                    // 화면 UPDATE
                    setMemoryCodeSeqNo(activeMemoryInfo.memory_code_seq_no);
                    setSelectedMemorySeqNo('');
                } else {
                    alert(res.data.resultMsg);
                    setSelectedMemorySeqNo('');
                }
            })
            .catch(error => {
                alert(error.response.data.resultMsg);
                setSelectedMemorySeqNo('');
            });
    }



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

                <div className={`${!isMobile ? 'memory-change-info-box' : 'memory-change-mobile-info-box'}`}>
                    <div className='flex flex-col'>
                        <p className='flex text-2xl pb-2'>
                            {memoryNm}
                        </p>
                        <p>
                            {memoryCode}
                        </p>
                    </div>
                </div>

                <div className={`flex mb-5 text-xl border-t border-gray-300 pt-8 items-center ${isMobile ? 'mx-5' : 'mt-10'}`}>
                    <MdOutlineChecklist />
                    <span className='ml-2'>연결된 추억 목록</span>
                </div>

                <div className={`${!isMobile ? 'memory-change-box ' : 'memory-change-mobile-box'}`}>
                    <Scrollbars thumbSize={85}>

                        {memoryList != null && memoryList.map((data) => (
                            <div key={data.memory_seq_no} className={`${!isMobile ? 'memory-change-item' : 'memory-change-mobile-item'}  ${selectedMemorySeqNo === data.memory_seq_no ? 'memory-change-item-selected' : ''} `} onClick={() => handleItemClick(data.memory_seq_no)}>
                                <div>
                                    <p>{data.memory_nm}</p>
                                    <p>{data.memory_code}</p>
                                </div>
                                <button onClick={() => alert('b')}>
                                    <AiOutlineClose />
                                </button>
                            </div>
                        ))}
                        {memoryList == null &&
                            <div className={`${!isMobile ? 'memory-change-item' : 'memory-change-mobile-item'} border-none`}>
                                <p className={`${isMobile ? 'mx-auto my-2' : ''}`}>
                                    연결된 추억 정보가 존재하지 않습니다.
                                </p>
                            </div>
                        }

                    </Scrollbars>

                </div>

                <div className='memory-change-btn-box '>
                    <button className='memory-change-btn' onClick={handleChangeMemory}>변경</button>
                    <button onClick={() => navigate('/memories/new')}>새 추억 연결</button>
                </div>

            </div>

        </>
    )
}