import React, { useEffect, useState } from 'react';

// 기본 위도 경도 설정
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Map({ setMap }) {

    const [map, setMapInstance] = useState(null);
    const [currentPosition, setCurrentPosition] = useState({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });

    // 카카오 맵 로드
    const loadKaKaoMap = () => {
        window.kakao.maps.load(() => {
            const mapContainer = document.getElementById("map"); // 지도 렌더링 할 요소 선택
            const mapOption = {
                center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng), // 지도 중심점
                level: 3, // 확대 레벨
            };
            const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성

            setMapInstance(mapInstance);
            setMap(mapInstance);
        });
    };

    // 사용자의 현재 위치 가져오기
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                error => {
                    console.error('Error getting current position:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_JS_KEY}&autoload=false`;
        script.async = true;
        script.onload = () => {
            loadKaKaoMap();
            getCurrentLocation(); // 사용자의 현재 위치 가져오기
        };
        document.head.appendChild(script);
    }, [setMap]);

    useEffect(() => {
        if (map && currentPosition.lat !== DEFAULT_LAT && currentPosition.lng !== DEFAULT_LNG) {
            const moveLatLon = new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng);
            map.setCenter(moveLatLon);
        }
    }, [map, currentPosition]);

    return (
        <>
            <div id="map" className="w-full h-screen"></div>
        </>
    )
}

