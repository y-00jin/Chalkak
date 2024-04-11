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
            <div className='map-content-box px-2 py-5'>
                <div className='flex flex-col pb-10 border-b border-gray-300'>
                    <p className='text-2xl'>
                        {memoryNm}
                    </p>
                    <p>
                        {memoryCode}
                    </p>
                </div>


                <div className=' my-10 h-full flex  flex-col'>

                    <Scrollbars thumbSize={85}>

                        {memoryList.map(data => (
                            <div key={data.memorySeqNo} className='py-5 px-3 flex  justify-between items-center border-b-gray-200 border-b'>
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

                <div className='flex flex-col justify-center py-5 items-center gap-5'>
                    <button className='bg-[#96DBF4] w-32 h-12 rounded-full text-white '>변경</button>

                    <Link to="/">
                        <button>새 추억 연결</button>
                    </Link>

                </div>








            </div>


            {/* 모바일 */}
            <div className="map-mobile-content">
                <div className="memory-info-header-box">
                    <button className='map-mobile-close-btn float-right' onClick={() => closeEvent('mapSearch')}>
                        <AiOutlineClose className='size-5' />
                    </button>
                </div>

                <div className="p-5 justify-center flex flex-col h-[90%] ">
                    <div className='flex flex-col'>
                        <div className="flex text-2xl gap-2 items-center">
                            {memoryNm}
                            <button><FaPencilAlt /></button>
                        </div>
                        <p>
                            {memoryCode}
                        </p>
                    </div>




                    <div className='border rounded-3xl my-10 h-64 flex  flex-col'>

                        <Scrollbars thumbSize={85}>

                            {memoryList.map(data => (
                                <div key={data.memorySeqNo} className='py-5 px-2 flex  justify-between items-center border-b-gray-200 mx-5 border-b'>
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

                    <div className='flex flex-col justify-center py-5 items-center gap-5'>
                        <button className='bg-[#96DBF4] w-32 h-12 rounded-full text-white '>변경</button>

                        <Link to="/">
                            <button>새 추억 연결</button>
                        </Link>

                    </div>
                </div>

            </div>

        </>
    )
}