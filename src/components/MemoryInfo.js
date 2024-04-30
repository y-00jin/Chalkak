import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FaPencilAlt } from "react-icons/fa";
import { BsEmojiSmileFill } from "react-icons/bs";
import useMobile from 'components/UseMobile.js';

export default function MemoryInfo({ closeEvent }) {

    const isMobile = useMobile();
    const [memoryNm, setMemoryNm] = useState('강릉 여행');
    const [memoryCode, setMemoryCode] = useState('P2RF6Z');

    // 사용자 임시 데이터
    const [userList, setUserList] = useState([
        {
            user_seq_no: 1,
            email: 'test1@test.com'
        },
        {
            user_seq_no: 2,
            email: 'test2@test.com'
        },
        {
            user_seq_no: 3,
            email: 'test3@test.com'
        },
        {
            user_seq_no: 4,
            email: 'test4@test.com'
        },
        {
            user_seq_no: 5,
            email: 'test5@test.com'
        },
        {
            user_seq_no: 6,
            email: 'test6@test.com'
        },
        {
            user_seq_no: 7,
            email: 'test7@test.com'
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
                                <BsEmojiSmileFill className={`size-8 user-color-${index}`} />
                                <p>{data.email}</p>
                            </div>
                        ))}
                    </Scrollbars>

                </div>

                <div className='memory-change-btn-box '>
                    <button onClick={() => alert('연결 해제')}>연결 해제</button>
                </div>

            </div>
        </>
    )
}