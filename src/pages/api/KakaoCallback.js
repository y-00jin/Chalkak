import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function KakaoCallback() {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([]);
    const errorMsg = '로그인 중 문제가 발생했습니다. 다시 시도해주세요.';

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");    // 인증 코드 가져옴

        const reqData = {
            code: code
        };

        // 인증 코드를 사용하여 백엔드 서버로 요청
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/kakao`, reqData, { withCredentials: true })
            .then(res => {
                if (res.status !== 200) {
                    alert(errorMsg);
                    navigate('/');
                } else {
                    setUserInfo(res.data.userInfo);
                }
            })
            .catch(error => {
                alert(errorMsg);
                navigate('/');
            });
    }, []);


    // 사용자 정보 update -> 로그인 처리
    useEffect(() => {
        if (userInfo.length === 0) {
            return;
        }
        const reqData = {
            userInfo: userInfo
        };

        // 인증 코드를 사용하여 백엔드 서버로 요청
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, reqData, { withCredentials: true })
            .then(res => {
                if (res.status !== 200) {
                    alert(res.data.resultMsg);
                }
                
                sessionStorage.setItem('loginUser', JSON.stringify(userInfo));  // 세션 저장
                navigate(res.data.redirectUrl);
            })
            .catch(error => {
                alert(error.response.data.resultMsg);
                navigate('/');
            });

    }, [userInfo]);


    return <></>;
}