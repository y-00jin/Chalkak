import MemoryWrite from "components/MemoryWrite";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function MemoryNew() {

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
                        navigate('/');
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
            <div className="new-box">
                <MemoryWrite
                    title='"생성할 추억 이름을 입력하세요"'
                    buttonText="START"
                    onSubmit={() => { navigate(`/map`) }}
                />

                <div className="new-btn-box">
                    <button onClick={handleActiveConnect}>
                        활성화 된 추억으로 연결하기
                    </button>

                    <button onClick={() => { navigate(`/memory/connection`) }}>
                        상대방 코드로 연결하기
                    </button>

                    <button onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>

            </div>


        </>
    )
}