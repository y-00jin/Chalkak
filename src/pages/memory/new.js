import MemoryWrite from "components/MemoryWrite";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { loginCheck, activeMemoryInfoSaveSession } from 'utils/commonFunctionsReact';

export default function MemoryNew() {

    const navigate = useNavigate();
    const [memoryNm, setMemoryNm] = useState(""); // 입력된 추억 이름을 상태로 관리합니다.


    // ## 페이지 제한
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    useEffect(() => {
        loginCheck().then(() => setIsLoading(false)); // 로그인 체크 후 로딩 상태 변경
    }, [])
    if (isLoading) {
        return null; // 로딩 중에는 아무것도 렌더링하지 않음
    }
    // 페이지 제한 ##



    // 추억 생성 이벤트
    const handleCreateMemory = async () => {

        if(memoryNm.trim() === '') {
            alert('생성할 추억 명을 입력하세요.');
            setMemoryNm("");
            return;
        }

        const reqData = {
            memoryNm: memoryNm
        };

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/memories/new`, reqData, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    activeMemoryInfoSaveSession(res.data.activeMemoryInfo);
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
                    title='"생성할 추억 명을 입력하세요"'
                    buttonText="추억 생성"
                    value={memoryNm} // 입력된 값의 상태를 전달합니다.
                    onChange={(e) => setMemoryNm(e.target.value)} // 입력 값이 변경될 때마다 상태를 업데이트합니다.
                    onSubmit={handleCreateMemory}
                />

                <div className="new-btn-box">
                    <div className="connection-btn-box">
                        <button onClick={() => { window.history.back(); }}
                        >돌아가기</button>
                    </div>
                </div>

            </div>


        </>
    )
}