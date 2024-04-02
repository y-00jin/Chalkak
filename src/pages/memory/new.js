import MemoryHeader from "components/MemoryHeader";
import MemoryWrite from "components/MemoryWrite";
import { useNavigate } from 'react-router-dom';
export default function MemoryNew() {

    const navigate = useNavigate();

    return (
        <>
            <div className="h-full flex flex-col justify-center">


                <MemoryWrite
                    title='"생성할 추억 이름을 입력하세요"'
                    buttonText="START"
                    onSubmit={() => { navigate(`/map`) }}
                />

                <div className="mx-auto max-w-sm flex flex-col justify-center mt-5 gap-4 text-gray-500">
                    <button onClick={() => { navigate(`/memory/connection`) }}
                    >상대방 코드로 연결하기</button>

                    <button onClick={() => { navigate(`/`) }}
                    >로그아웃</button>
                </div>

            </div>


        </>
    )
}