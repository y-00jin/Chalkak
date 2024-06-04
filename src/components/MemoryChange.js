import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom';
import useMobile from 'components/UseMobile.js';
import { MdOutlineChecklist } from "react-icons/md";
import axiosInstance from 'utils/axiosInstance';
import { getSavedPlaceList } from 'utils/commonFunctionsReact';

export default function MemoryChange({ closeEvent }) {

    const isMobile = useMobile();

    const navigate = useNavigate();
    const [memoryNm, setMemoryNm] = useState('');
    const [memoryCode, setMemoryCode] = useState('');
    const [memoryCodeSeqNo, setMemoryCodeSeqNo] = useState(null);

    const [selectedMemorySeqNo, setSelectedMemorySeqNo] = useState('');   // 선택된 정보
    const [deleteMemoryInfo, setDeleteMemoryInfo] = useState(null); // 삭제할 정보

    // 임시 데이터
    const [memoryList, setMemoryList] = useState([]);


            // 추억 정보 가져오기
            const getActiveMemoryInfo = async () => {
                try {
    
                    // 세션이 비어있는 경우 추억 정보 조회
                    const res = await axiosInstance.get(`/api/memories/active`);
                    const activeMemoryInfo = res.data.memoryInfo;
    
                    // 추억 정보 설정
                    setMemoryNm(activeMemoryInfo.memory_nm);
                    setMemoryCode(activeMemoryInfo.memory_code);
                    setMemoryCodeSeqNo(activeMemoryInfo.memory_code_seq_no);
                } catch (error) {
                    
                }
            };
    
            // 추억 목록 가져오기
            const getMemorysInfo = async () => {
                try {
                    const res = await axiosInstance.get(`/api/memories/inactive`);
                    setMemoryList(res.data.memoryList);
                } catch (error) {
                }
            }


    // 활성화 추억 정보
    useEffect(() => {
        getActiveMemoryInfo();
        getMemorysInfo();
    }, [memoryCodeSeqNo]);

    // 클릭 데이터
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

        await axiosInstance.put(`/api/memories/${selectedMemorySeqNo}/active`, null)
            .then(res => {
                if (res.status === 200) {
                    // 화면 UPDATE
                    const activeMemoryInfo = res.data.memoryInfo;
                    setMemoryCodeSeqNo(activeMemoryInfo.memory_code_seq_no);
                } else {
                    alert(res.data.resultMsg);
                }
            })
            .catch(error => {
                alert(error.response.data.resultMsg);
            })
            .finally(() => {
                setSelectedMemorySeqNo('');
            });
    }

    // 연결 해제 전 남아있는 사용자 조회
    const ExitMemoryCheck = async (data) => {
        try {
            const res = await axiosInstance.get(`/api/memories/memoryCodes/${data.memory_code_seq_no}/users`);
            let confirmMsg = `'${data.memory_nm}'의 연결을 해제하시겠습니까?\n연결 해제 시 본인이 저장한 장소 정보는 모두 삭제됩니다.`;
            if (res.data.userList.length <= 1) {    // 마지막 남은 사용자
                confirmMsg = `'${data.memory_nm}' 추억의 마지막 사용자입니다. 연결을 해제하시겠습니까?\n연결을 해제 시 '${data.memory_code}' 코드로 다시 연결할 수 없으며, 본인이 저장한 장소 정보는 모두 삭제됩니다.`
            }

            const deleteCheck = window.confirm(confirmMsg);
            if (deleteCheck) {    // 삭제
                setDeleteMemoryInfo(data);
            } else { // 취소
                setDeleteMemoryInfo(null);
            }
        } catch (error) {
        }
    }


    // 연결 해제
    useEffect(() => {
        if (deleteMemoryInfo === null) {
            return;
        }

        const ExitMemory = async () => {
            try {
                const res = await axiosInstance.delete(`/api/memories/${deleteMemoryInfo.memory_seq_no}`);
                if (res.status === 200) {
                    if (res.data.redirectUrl !== '') {
                        navigate('/memories/connection');   // 링크 이동
                    } else {
                        const res = await axiosInstance.get(`/api/memories/inactive`);
                        setMemoryList(res.data.memoryList);
                        // setMemoryCodeSeqNo(memoryCodeSeqNo);    // 화면 새로고침
                    }
                } else {
                    alert(res.data.resultMsg);
                }
            } catch (error) {
                alert(error.response.data.resultMsg);
            } finally {
                setDeleteMemoryInfo(null);
            }
        };

        ExitMemory();
    }, [deleteMemoryInfo]);


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
                            <div key={data.memory_seq_no} className={`${!isMobile ? 'memory-change-item' : 'memory-change-mobile-item'}  ${selectedMemorySeqNo === data.memory_seq_no ? 'memory-change-item-selected' : ''} `}>
                                <div className='flex-1' onClick={() => handleItemClick(data.memory_seq_no)}>
                                    <p>{data.memory_nm}</p>
                                    <p>{data.memory_code}</p>
                                </div>
                                <button onClick={() => ExitMemoryCheck(data)}>
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
                    <button onClick={() => navigate('/memories/connection')}>새 추억 연결</button>
                </div>

            </div>

        </>
    )
}