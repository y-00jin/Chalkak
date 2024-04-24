import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";

import useMobile from 'components/UseMobile';


export default function MapSave({ onClose }) {

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
        <div className={`absolute bottom-0 border-t rounded-[30px] pt-10 border-gray-300 w-full h-[45%] z-[60] p-5 bg-white  ${!isMobile} ?'':''`}>
            <div className="">
                    <button className="float-right" onClick={onClose}><AiOutlineClose /></button>
                    <form className='flex flex-col gap-5 '>
                        <label>
                            장소명:
                            <input
                                type="text"
                                value={placeAlias}
                                onChange={(e) => setPlaceAlias(e.target.value)}
                            />
                        </label>
                        <label>
                            설명:
                            <textarea
                                value={notes}
                                onChange={(e) => setNetes(e.target.value)}
                            />
                        </label>

                        <label>
                            라디오버튼:
                            <input
                                type="radio"
                                value="저장"
                                checked={storageCategory === '저장'}
                                onChange={handleStorageCategory}
                            />
                            저장
                            <input
                                type="radio"
                                value="기록"
                                checked={storageCategory === '기록'}
                                onChange={handleStorageCategory}
                            />
                            기록
                        </label>

                        <label>
                            토글버튼:
                            <input
                                type="checkbox"
                                checked={editRestrict}
                                onChange={handleEditRestrict}
                            />
                            나만 수정
                        </label>

                        <button type="submit">저장</button>
                    </form>
            </div>
        </div>
    )
}