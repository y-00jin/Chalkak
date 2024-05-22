import React, { useEffect, useContext } from 'react';
import { MapContext } from 'context/MapContext';

export default function Map() {

    const { map, setMap, psRef, currentPosition, setCurrentPosition, DEFAULT_LAT, DEFAULT_LNG } = useContext(MapContext);


    useEffect(() => {

        // 카카오 맵 로드
        const loadKaKaoMap = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("map"); // 지도 렌더링 할 요소 선택
                const mapOption = {
                    center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng), // 지도 중심점
                    level: 3, // 확대 레벨
                };
                const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성

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
                    }
                );
            } else {
                setCurrentPosition({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
            }
        };



        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_JS_KEY}&libraries=services&autoload=false`;
        script.async = true;
        script.onload = () => {
            loadKaKaoMap();
            getCurrentLocation(); // 사용자의 현재 위치 가져오기
        };
        document.head.appendChild(script);

    }, []);

    useEffect(() => {
        if (map && currentPosition.lat !== DEFAULT_LAT && currentPosition.lng !== DEFAULT_LNG) {
            const moveLatLon = new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng);
            map.setCenter(moveLatLon);
        }

        if (map != null) {
            psRef.current = new window.kakao.maps.services.Places();
        }
    }, [map, currentPosition]);

    return (
        <>
            <div id="map" className="w-full h-screen"></div>
        </>
    )
}

