import { RiKakaoTalkFill } from "react-icons/ri";
import { useEffect, useState } from 'react';
import axios from "axios";

import { useNavigate } from 'react-router-dom'; 

export default function MemoryLogin() {

    const REST_API_KEY = `${process.env.REACT_APP_KAKAO_CLIENT_ID}`;
    const CLIENT_IP = `${process.env.REACT_APP_CLIENT_IP}`;
    
    const navigate = useNavigate();

    // useEffect(() => {
    //     // 서버로부터 로그인 상태 확인
    //     axios.post('/api/users/login/check')
    //         .then(response => {
    //             if(response.data.result){
    //                 navigate('/memories/connection');
    //             }else{
    //                 navigate('/');
    //             }
    //         })
    //         .catch(error => {
    //             navigate('/');
    //         });
    // }, []);


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
                    onClick={()=>window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=http://${CLIENT_IP}:8088/auth/kakao&response_type=code`}
                >
                    <RiKakaoTalkFill className="w-6 h-6 " />
                    Sign in with Kakao
                </button>
            </div>
        </div>
    )
}