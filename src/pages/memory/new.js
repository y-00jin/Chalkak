import MemoryWrite from "components/MemoryWrite";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function MemoryNew() {

    const navigate = useNavigate();
    const [memoryNm, setMemoryNm] = useState(""); // 입력된 추억 이름을 상태로 관리합니다.

    // 추억 생성 이벤트
    const handleCreateMemory = async () => {

        if(memoryNm.trim() === '') {
            alert('생성할 추억 이름을 입력하세요.');
            setMemoryNm("");
            return;
        }

        const reqData = {
            memoryNm: memoryNm
        };

        axios.post('/api/memories/new', reqData)
            .then(res => {
                if (res.status == 200) {
                    navigate('/map');
                } else {
                    alert(res.data.resultMsg);
                }
            })
            .catch(error => {
                alert(error.response.data.resultMsg);
            });

    };


    return (
        <>
            <div className="new-box">
                <MemoryWrite
                    title='"생성할 추억 이름을 입력하세요"'
                    buttonText="추억 생성"
                    value={memoryNm} // 입력된 값의 상태를 전달합니다.
                    onChange={(e) => setMemoryNm(e.target.value)} // 입력 값이 변경될 때마다 상태를 업데이트합니다.
                    onSubmit={handleCreateMemory}
                />

                <div className="new-btn-box">
                    <div className="connection-btn-box">
                        <button onClick={() => { navigate(`/memory/connection`) }}
                        >돌아가기</button>
                    </div>
                </div>

            </div>


        </>
    )
}