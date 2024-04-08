import { Scrollbars } from 'react-custom-scrollbars';
import { SiMaplibre } from "react-icons/si";
export default function MapSearch({datas}) {

    return (
        <>

                {datas.map(data => (
                    <div key={data.id} className='flex gap-3 items-center border-b-gray-200 py-5 border-b'>
                        <SiMaplibre className='size-10 text-slate-300' />
                        <div>
                            <p>{data.location_nm}</p>
                            <p>{data.address}</p>
                        </div>
                    </div>
                ))}

        </>

    )
}