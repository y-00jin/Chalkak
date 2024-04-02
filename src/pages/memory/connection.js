import MemoryWrite from "components/MemoryWrite";
import { useNavigate } from 'react-router-dom';
export default function MemoryConnection() {

    const navigate = useNavigate();

    return (

        <>
            <div className="connection-box">
                <MemoryWrite
                    title='"연결할 추억 코드를 입력하세요"'
                    buttonText="START"
                    onSubmit={() => { navigate(`/map`) }}
                />

                <div className="connection-btn-box">
                    <button onClick={() => { navigate(`/memory/new`) }}
                    >돌아가기</button>
                </div>

            </div>
        </>
    )
}