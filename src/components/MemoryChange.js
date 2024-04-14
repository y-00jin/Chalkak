import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function MemoryChange({ closeEvent }) {

    const navigate = useNavigate();

    const [memoryNm, setMemoryNm] = useState('강릉 여행');
    const [memoryCode, setMemoryCode] = useState('P2RF6Z');

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


            {/* PC */}
            <div className='sidebar-content-box px-2 py-5'>
                <div className='memory-change-info-box '>
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

                


                <div className='memory-change-box'>

                    <Scrollbars thumbSize={85}>

                        {memoryList.map(data => (
                            <div key={data.memorySeqNo} className='memory-change-item'>
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
                    <button className='memory-change-btn'>변경</button>

                    <Link to="/">
                        <button>새 추억 연결</button>
                    </Link>

                </div>

            </div>


            {/* 모바일 */}
            <div className="menu-mobile-content-box">
                <div>
                    <button className='menu-mobile-close-btn' onClick={() => closeEvent('mapSearch')}>
                        <AiOutlineClose className='size-5' />
                    </button>
                </div>

                <div className="memory-change-mobile-info-box ">
                    <div className='flex flex-col'>
                        <div className="flex text-2xl gap-2 items-center">
                            {memoryNm}
                            <button><FaPencilAlt /></button>
                        </div>
                        <p>
                            {memoryCode}
                        </p>
                    </div>

                    <div className='memory-change-mobile-box'>

                        <Scrollbars thumbSize={85}>

                            {memoryList.map(data => (
                                <div key={data.memorySeqNo} className='memory-change-mobile-item'>
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

                    <div className='memory-change-btn-box'>
                        <button className='memory-change-btn'>변경</button>

                        <Link to="/">
                            <button>새 추억 연결</button>
                        </Link>

                    </div>
                </div>

            </div>

        </>
    )
}