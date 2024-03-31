import MemoryHeader from "components/MemoryHeader";
import MemoryWrite from "components/MemoryWrite";
import { useNavigate } from 'react-router-dom';
export default function MemoryNew() {

    const navigate = useNavigate();

    return (
        <>
            <MemoryHeader onSubmit={() => {navigate(`/`)}} />
            <div className=" h-full flex flex-col justify-center">


                <MemoryWrite
                    title='"생성할 추억 이름을 입력하세요"'
                    buttonText="START"
                    onSubmit={() => { navigate(`/map`) }}
                />

                <div className="w-full max-w-sm mx-auto flex justify-center ">
                    <button className="mx-auto mt-5 text-gray-400"
                        onClick={() => { navigate(`/memory/connection`) }}
                    >상대방 코드로 연결하기</button>
                </div>



            </div>
        </>
    )
}