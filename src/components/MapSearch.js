import { Scrollbars } from 'react-custom-scrollbars';
import { SiMaplibre } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
export default function MapSearch({ datas, setShowMapSearch, isMobile }) {

    return (
        <>
            {!isMobile &&
                <div className='map-search-box'>
                    <input type="text" placeholder="장소 검색" className="flex-grow rounded-full px-5 py-3 w-full border border-gray-300 focus:outline-none focus:border-[#96DBF4] shadow-lg" />

                    <div className='h-[90%] flex flex-col gap-2 my-5 px-5'>
                        <Scrollbars thumbSize={85}>

                            {datas.map(data => (
                                <div key={data.id} className='flex gap-3 items-center border-b-gray-200 py-5 border-b'>
                                    <SiMaplibre className='size-10 text-slate-300' />
                                    <div>
                                        <p>{data.location_nm}</p>
                                        <p>{data.address}</p>
                                    </div>
                                </div>
                            ))}
                        </Scrollbars>
                    </div>
                </div>
            }
            {isMobile &&


                <div className='map-mobile-content'>
                    <div className='map-search-mobile-header-box'>
                        <input type="text" placeholder="장소 검색" className="flex-grow rounded-full px-5 py-3 w-full border border-gray-300 focus:outline-none focus:border-[#96DBF4] shadow-lg" />
                        <button className='map-mobile-close-btn float-right' onClick={() => setShowMapSearch((val) => !val)}>
                            <AiOutlineClose className='size-5' />
                        </button>

                    </div>

                    <div className='h-[90%] flex flex-col gap-2 my-5 px-5'>
                        <Scrollbars thumbSize={85}>

                            {datas.map(data => (
                                <div key={data.id} className='flex gap-3 items-center border-b-gray-200 py-5 border-b'>
                                    <SiMaplibre className='size-10 text-slate-300' />
                                    <div>
                                        <p>{data.location_nm}</p>
                                        <p>{data.address}</p>
                                    </div>
                                </div>
                            ))}
                        </Scrollbars>
                    </div>
                </div>
            }




        </>




    )
}