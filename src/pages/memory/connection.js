import MemoryWrite from "components/MemoryWrite";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function MemoryConnection() {

    const navigate = useNavigate();

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

    return (

        <>
            <div className="connection-box">
                <MemoryWrite
                    title='"연결할 추억 코드를 입력하세요"'
                    buttonText="START"
                    onSubmit={() => { navigate(`/map`) }}
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