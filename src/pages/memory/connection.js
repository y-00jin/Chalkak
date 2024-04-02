import MemoryHeader from "components/MemoryHeader";
import MemoryWrite from "components/MemoryWrite";
import { useNavigate } from 'react-router-dom';
export default function MemoryConnection() {

    const navigate = useNavigate();

    return (

        <>
            {/* <MemoryHeader onSubmit={() => {navigate(`/memory/new`)}} /> */}
            <div className="h-full flex flex-col justify-center">
                <MemoryWrite
                    title='"연결할 추억 코드를 입력하세요"'
                    buttonText="START"
                    onSubmit={() => { navigate(`/map`) }}
                />

                <div className="mx-auto max-w-sm flex flex-col justify-center mt-5 text-gray-500">
                    <button onClick={() => { navigate(`/memory/new`) }}
                    >돌아가기</button>
                </div>

            </div>
        </>
    )
}