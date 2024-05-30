import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { SiMaplibre } from "react-icons/si";
import { FaPencilAlt } from "react-icons/fa";
import useMobile from 'components/UseMobile.js';
import PlaceSave from './PlaceSave';

export default function PlaceStorage({ closeEvent }) {

    const isMobile = useMobile();
    const [activeTab, setActiveTab] = useState('PSCC_1');

    const [placeList, setPlaceList] = useState([
        {
            place_seq_no: 1,
            place_nm: '을지로골목집',
            address: '서울 중구 수표로 49-3 1층 (을지로3가)',
            place_alias: '을지로골목집',
            notes: '웨이팅 장난 아님'
        },
        {
            place_seq_no: 2,
            place_nm: '꼬치주간',
            address: '서울 마포구 포은로 70-1 (망원동)',
            place_alias: '꼬치주간',
            notes: '5시 오픈 – 자리 바로 참'
        },
        {
            place_seq_no: 3,
            place_nm: '샹끄발레르',
            address: '인천 연수구 컨벤시아대로 130번길 14 1층 101',
            place_alias: '샹끄발레르',
            notes: ''
        },
        {
            place_seq_no: 4,
            place_nm: '을지로골목집',
            address: '서울 중구 수표로 49-3 1층 (을지로3가)',
            place_alias: '을지로골목집2',
            notes: '웨이팅 장난 아님'
        },
        {
            place_seq_no: 5,
            place_nm: '꼬치주간',
            address: '서울 마포구 포은로 70-1 (망원동)',
            place_alias: '꼬치주간2',
            notes: '5시 오픈 – 자리 바로 참'
        },
        {
            place_seq_no: 6,
            place_nm: '샹끄발레르',
            address: '인천 연수구 컨벤시아대로 130번길 14 1층 101',
            place_alias: '샹끄발레르2',
            notes: ''
        },
    ]);

    // 장소 저장에 필요한 데이터
    const [showPlaceSave, setShowPlaceSave] = useState(false);  // 저장
    const [savePlaceId, setSavePlaceId] = useState(null);
    const [savePlaceAlias, setSavePlaceAlias] = useState('');
    const [saveNotes, setSaveNotes] = useState('');
    const [saveStorageCategory, setSaveStorageCategory] = useState('PSCC_1');
    const [saveEditRestrict, setSaveEditRestrict] = useState(false);

    const handleSavePlace = async () => {
        console.log(savePlaceId);
        console.log(savePlaceAlias);
        console.log(saveNotes);
        console.log(saveStorageCategory);
        console.log(saveEditRestrict);
    }

    useEffect(() => {
        setShowPlaceSave(false);
    },[])

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

                <div>
                    <ul className='place-storage-tab-box' >
                        <li className={`place-storage-tab-item  ${activeTab === 'PSCC_1' ? 'place-storage-tab-item-active' : ''}`}
                        ><button className='w-full' onClick={() => {setActiveTab('PSCC_1'); setSaveStorageCategory('PSCC_1')}}>저장 장소</button>
                        </li>
                        <li className={`place-storage-tab-item  ${activeTab === 'PSCC_2' ? 'place-storage-tab-item-active' : ''}`}
                        ><button className='w-full' onClick={() => {setActiveTab('PSCC_2'); setSaveStorageCategory('PSCC_2')}}>추억 장소</button>
                        </li>
                    </ul>
                </div>

                <div className='place-storage-box'>
                    <Scrollbars thumbSize={85}>

                        {placeList.map((data, index) => (
                            <div key={data.place_seq_no} className='place-storage-item'>
                                <SiMaplibre className='size-12 text-slate-300' />
                                <div className='flex-1'>
                                    <p className='text-lg'>{data.place_alias}</p>
                                    <p className='text-sm text-gray-500'>{data.address}</p>
                                    <p className='text-sm text-gray-500'>{data.notes}</p>
                                </div>

                                <div className='flex gap-3 float-right text-gray-400'>
                                    <button onClick={() => { setSavePlaceId(data.place_seq_no); setSavePlaceAlias(data.place_alias); setSaveNotes(data.notes); setShowPlaceSave(true) }}>
                                        <FaPencilAlt />
                                    </button>

                                    <AiOutlineClose />
                                </div>


                            </div>
                        ))}
                    </Scrollbars>


                </div>




            </div>

            {showPlaceSave && <PlaceSave
                onClose={() => { setShowPlaceSave(false); setSavePlaceId(null); }}
                placeAlias={savePlaceAlias} setPlaceAlias={setSavePlaceAlias}
                notes={saveNotes} setNetes={setSaveNotes}
                storageCategory={saveStorageCategory} setStorageCategory={setSaveStorageCategory}
                editRestrict={saveEditRestrict} setEditRestrict={setSaveEditRestrict}
                handleSavePlace={handleSavePlace}
            />
            }

        </>

    )
}

