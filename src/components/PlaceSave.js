import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";

import useMobile from 'components/UseMobile';
import CustomToggleSwitch from './CustomToggleSwitch';


export default function PlaceSave({ onClose }) {

    const isMobile = useMobile();

    const [placeAlias, setPlaceAlias] = useState('');
    const [notes, setNetes] = useState('');
    const [storageCategory, setStorageCategory] = useState('저장');
    const [editRestrict, setEditRestrict] = useState(false);

    const handleStorageCategory = (e) => {
        setStorageCategory(e.target.value);
    };

    const handleEditRestrict = () => {
        setEditRestrict(!editRestrict);
    };


    return (
        <>
        <div className='fixed top-0 left-0 z-20 w-full h-screen bg-gray-950 opacity-50' onClick={onClose} />

        <div className={`min-h-[21rem] bg-white border-gray-300 z-[30] p-5 shadow-lg ${isMobile ? 'rounded-t-[30px] absolute bottom-0 border-t w-full ':'rounded-[30px] border top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 fixed w-[35%] ' } `}>
            <div className="relative">
                <button className="absolute right-0 top-0 " onClick={onClose}><AiOutlineClose /></button>
                <div className='flex flex-col gap-5 pt-8 px-8'>
                    <label>
                        <input
                            type="text"
                            value={placeAlias}
                            onChange={(e) => setPlaceAlias(e.target.value)}
                            placeholder='장소 명'
                            className='w-full bg-gray-100 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#96DBF4]'
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={notes}
                            onChange={(e) => setNetes(e.target.value)}
                            placeholder='설명'
                            className='w-full bg-gray-100 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#96DBF4]'
                        />
                    </label>

                    <div className="flex justify-between">
                        <div className='flex gap-3'>
                            <label className='flex gap-2 items-center'>
                                <input
                                    type="radio"
                                    value="저장"
                                    checked={storageCategory === '저장'}
                                    onChange={handleStorageCategory}
                                />
                                저장
                            </label>
                            <label className='flex gap-2 items-center'>
                                <input
                                    type="radio"
                                    value="기록"
                                    checked={storageCategory === '기록'}
                                    onChange={handleStorageCategory}
                                />
                                기록
                            </label>
                        </div>

                        <CustomToggleSwitch checked={editRestrict} onChange={handleEditRestrict} toggleText={'나만 수정'}/>
                    </div>
                    <button className="bg-[#96DBF4] w-[50%] mx-auto mt-5 py-2 rounded-full text-white " onClick={()=>alert('a')}>저장</button>
                    
                </div>
            </div>
        </div>
            
        
        
        
        </>
        
    )
}