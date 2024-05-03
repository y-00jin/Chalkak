import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios"

export default function KakaoCallback() {

    const navigate = useNavigate();
    const serverIp = `${process.env.REACT_APP_SERVER_IP}`;
    const redirectUri = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
    const [ userInfo, setUserInfo ] = useState([]);

    useEffect(() => {
        // URL에서 인증 코드를 가져옵니다.
        const code = new URL(window.location.href).searchParams.get("code");

        // 인증 코드를 사용하여 백엔드 서버로 POST 요청을 보냅니다.
        axios.get(serverIp + redirectUri +'?code=' + code)
            .then(response => {
                const data = response.data;
                console.log(data);
                if (!data.result) {
                    alert('이미 만료된 로그인입니다.');
                    // navigate('/');
                } else{
                    setUserInfo(data.userInfo);
                }
            })
            .catch(error => {
                console.error('오류 발생:', error);
            });


        // 인증 코드를 사용하여 백엔드 서버로 POST 요청을 보냅니다.
        // fetch('http://192.168.0.245:8088/api/auth/kakao?code=' + code)
        //     .then(res => res.json())
        //     .then(data => {
        //         if (!data.result) {
        //             alert('이미 만료된 로그인입니다.');
        //             navigate('/');
        //             return;
        //         }
        //         alert('a')
        //     })
    }, []);


    // 사용자 정보 update
    useEffect(() => {
        if (userInfo.length !== 0) {








            console.log(userInfo)
        }
    },[userInfo]);


    return <></>;
}