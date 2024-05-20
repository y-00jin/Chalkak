import MemoryWrite from "components/MemoryWrite";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { loginCheck, activeMemoryInfoSaveSession, handleLogout } from 'utils/commonFunctionsReact';

export default function MemoryConnection() {

    const navigate = useNavigate();

    const [memoryCode, setMemoryCode] = useState("");

    // ## 페이지 제한
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    useEffect(() => {
        loginCheck().then(() => setIsLoading(false)); // 로그인 체크 후 로딩 상태 변경
    }, [])
    if (isLoading) {
        return null; // 로딩 중에는 아무것도 렌더링하지 않음
    }
    // 페이지 제한 ##

    // 활성화 된 추억으로 연결
    const handleActiveConnect = async () => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/memories/connection/active`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.resultMsg === null || res.data.resultMsg === undefined) {
                        // activeMemoryInfoSaveSession(res.data.activeMemoryInfo);
                        navigate('/map');
                    } else {
                        alert(res.data.resultMsg);
                    }
                }
            })
            .catch(error => {
                alert('추억 연결 중 문제가 발생했습니다. 다시 시도해주세요.');
            });
    }

    // 추억 코드로 추억 연결
    const handleCodeConnect = async () => {
        if(memoryCode.trim() === '') {
            alert('연결할 추억 코드를 입력하세요.');
            setMemoryCode("");
            return;
        }

        const reqData = {
            memoryCode: memoryCode
        };

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/memories/connection/code`, reqData)
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
                setMemoryCode("");
            });
    }


    return (

        <>
            <div className="connection-box">
                <MemoryWrite
                    title='"연결할 추억 코드를 입력하세요"'
                    buttonText="START"
                    value={memoryCode} 
                    onChange={(e) => setMemoryCode(e.target.value)} 
                    onSubmit={handleCodeConnect}
                />

                <div className="new-btn-box">
                    <button onClick={handleActiveConnect}>
                        활성화 된 추억으로 연결하기
                    </button>

                    <button onClick={() => { navigate(`/memories/new`) }}>
                        추억 생성하기
                    </button>

                    <button onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>
            </div>
        </>
    )
}