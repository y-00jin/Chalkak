import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';

export default function MemoryLogin() {

    const REST_API_KEY = `${process.env.REACT_APP_KAKAO_CLIENT_ID}`;

    const navigate = useNavigate();

    const handleLoginTest1 = async () => {
        const reqData = {
            userInfo: {
                user_seq_no: 1,
                email: 'test1@test.com',
                user_nm: '테스트1',
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

    const handleLoginTest2 = async () => {
        const reqData = {
            userInfo: {
                user_seq_no: 2,
                email: 'test2@test.com',
                user_nm: '테스트2',
                social_type: 'google',
                social_id: '2'
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
            <div className="login-btn-box-new">
                <div className="flex items-center">
                    <div className="border-t flex-grow bg-gray-500"></div>
                    <div className="mx-4  text-gray-500">SNS LOGIN</div>
                    <div className="border-t flex-grow bg-gray-500"></div>
                </div>
                <div className="login-btn-box-items-new">
                    <button
                        type="button"
                        className="login-btn-new login-btn-kakao-new"
                        onClick={() => window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${process.env.REACT_APP_CLIENT_BASE_URL}/auth/kakao&response_type=code`}
                    >
                        <RiKakaoTalkFill className="w-full h-full " />
                    </button>
                    <button
                        type="button"
                        className="login-btn-new login-btn-naver-new"
                        onClick={handleLoginTest1}
                    >
                        <SiNaver className="w-5 h-5 " />
                    </button>
                    <button
                        type="button"
                        className="login-btn-new login-btn-google-new"
                        onClick={handleLoginTest2}
                    >
                        <FcGoogle className="w-full h-full" />
                    </button>
                </div>



            </div>
            {/* <div className="login-btn-box">
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
                    onClick={handleLoginTest1}
                >
                    <SiNaver className="w-4 h-4 " />
                    테스트 계정 1
                </button>
                <button
                    type="button"
                    className="login-btn login-btn-google"
                    onClick={handleLoginTest2}
                >
                    <FaGoogle className="w-6 h-6" />
                    테스트 계정 2
                </button>

            </div> */}
        </div>
    )
}