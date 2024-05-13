import MemoryWrite from "components/MemoryWrite";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { loginCheck } from 'utils/commonFunctionsReact';

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

    // 로그아웃 이벤트
    const handleLogout = async () => {

        const logoutErrorMsg = '로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.';

        await axios.get('/api/users/logout', { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    navigate(`/`);
                } else {
                    alert(logoutErrorMsg);
                }
            })
            .catch(error => {
                alert(logoutErrorMsg);
                navigate('/');
            });
    };

    // 활성화 된 추억으로 연결
    const handleActiveConnect = async () => {
        await axios.get('/api/memories/active')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.resultMsg === null || res.data.resultMsg === undefined) {
                        
                        
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

        axios.post('/api/memories/connection', reqData)
            .then(res => {
                if (res.status == 200) {
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

                    <button onClick={() => { navigate(`/memory/new`) }}>
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