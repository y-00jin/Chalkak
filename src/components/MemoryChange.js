import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom';
import useMobile from 'components/UseMobile.js';


export default function MemoryChange({ closeEvent }) {

    const isMobile = useMobile();

    const navigate = useNavigate();
    const [memoryNm, setMemoryNm] = useState('강릉 여행');
    const [memoryCode, setMemoryCode] = useState('P2RF6Z');
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);   // 선택된 정보

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
    };

    // 임시 데이터
    const [memoryList, setMemoryList] = useState([
        {
            memorySeqNo: 1,
            memoryNm: '여수 여행',
            memoryCode: 'HEPSS1'
        },
        {
            memorySeqNo: 2,
            memoryNm: '제주 여행',
            memoryCode: 'DQEF49'
        },
        {
            memorySeqNo: 3,
            memoryNm: '나 혼자만의 저장 공간',
            memoryCode: 'BF421S'
        },
        {
            memorySeqNo: 4,
            memoryNm: '여수 여행',
            memoryCode: 'HEPSS1'
        },
        {
            memorySeqNo: 5,
            memoryNm: '제주 여행',
            memoryCode: 'DQEF49'
        },
        {
            memorySeqNo: 6,
            memoryNm: '나 혼자만의 저장 공간',
            memoryCode: 'BF421S'
        }
    ]);


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
                        <p className='flex text-2xl'>
                            {memoryNm}
                        </p>
                        <p>
                            {memoryCode}
                        </p>
                    </div>
                </div>



                <div className={`${!isMobile ? 'memory-change-box' : 'memory-change-mobile-box'}`}>
                    <Scrollbars thumbSize={85}>

                        {memoryList.map((data, index) => (
                            <div key={data.memorySeqNo} className={`${!isMobile ? 'memory-change-item' : 'memory-change-mobile-item'}  ${selectedItemIndex === index ? 'memory-change-item-selected' : ''} `} onClick={() => handleItemClick(index)}>
                                <div>
                                    <p>{data.memoryNm}</p>
                                    <p>{data.memoryCode}</p>
                                </div>
                                <button>
                                    <AiOutlineClose />
                                </button>
                            </div>
                        ))}
                    </Scrollbars>

                </div>

                <div className='memory-change-btn-box '>
                    <button className='memory-change-btn' onClick={() => alert(selectedItemIndex)}>변경</button>
                    <button onClick={() => navigate('/memory/new')}>새 추억 연결</button>
                </div>

            </div>

        </>
    )
}