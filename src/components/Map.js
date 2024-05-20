import React, { useEffect, useState } from 'react';

// 기본 위도 경도 설정
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Map({ setMap }) {



    // 카카오 맵 로드
    const loadKaKaoMap = () => {

        window.kakao.maps.load(() => {

            const mapContainer = document.getElementById("map");    // 지도 렌더링 할 요소 선택

            // 지도 옵션 설정
            const mapOption = {
                center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG), // 지도 중심점
                level: 3,   // 확대 레벨
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성
            setMap(map);
        })
    }

    // 컴포넌트 마운트 시 실행
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_JS_KEY}&autoload=false`;
        script.async = true;
        script.onload = loadKaKaoMap;
        document.head.appendChild(script);

    }, [setMap]);

    return (
        <>
            <div id="map" className="w-full h-screen"></div>
        </>
    )
}

