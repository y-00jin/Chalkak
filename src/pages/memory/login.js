import { RiKakaoTalkFill } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';

export default function MemoryLogin() {

    const REST_API_KEY = `${process.env.REACT_APP_KAKAO_CLIENT_ID}`;

    const navigate = useNavigate();
    const handleLoginOther = async () => {
        const reqData = {
            userInfo: {
                user_seq_no: 2,
                email: 'shalpha_2@naver.com',
                user_nm: '강성현',
                social_type: 'naver',
                social_id: '1'
            }
        };

        // 인증 코드를 사용하여 백엔드 서버로 요청
        await axiosInstance.post(`/api/users/login`, reqData)
            .then(res => {
                if (res.status !== 200) {
                    alert(res.data.resultMsg);
                }

                sessionStorage.setItem('loginUser', JSON.stringify(res.data.resultUserInfo));  // 세션 저장
                navigate(res.data.redirectUrl);
            })
            .catch(error => {
                alert(error.response.data.resultMsg);
                navigate('/');
            });
    }

    return (

        <div className="login-box" >
            <div className="login-logo-box">
                <div className="login-logo-img">
                    <img src="/images/chalkak_logo.png" alt="Chalkak Logo" width="200px" />
                </div>
                <p className="login-logo-text-bold">
                    SNS 계정으로 로그인해주세요
                </p>
                <p className="login-logo-text">
                    계정이 없다면 자동으로 회원가입이 진행됩니다.
                </p>

            </div>
            <div className="login-btn-box">
                <button
                    type="button"
                    className="login-btn login-btn-kakao"
                    onClick={() => window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${process.env.REACT_APP_CLIENT_BASE_URL}/auth/kakao&response_type=code`}
                >
                    <RiKakaoTalkFill className="w-6 h-6 " />
                    Sign in with Kakao
                </button>
                <button
                    type="button"
                    className="login-btn login-btn-naver"
                    onClick={handleLoginOther}
                >
                    <RiKakaoTalkFill className="w-6 h-6 " />
                    다른 계정 로그인
                </button>
            </div>
        </div>
    )
}