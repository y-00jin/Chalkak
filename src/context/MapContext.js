import React, { createContext, useState, useRef } from 'react';

// Context 생성
export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [map, setMap] = useState(null);         // 맵
    const [markers, setMarkers] = useState([]);   // 마커
    const [showMobileMapSearch, setShowMobileMapSearch] = useState(false);  // 검색창 여부
    const psRef = useRef(null);   // psRef 생성

    // 기본 위도 경도 설정
    const DEFAULT_LAT = 37.497625203;
    const DEFAULT_LNG = 127.03088379;
    const [currentPosition, setCurrentPosition] = useState({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });   // 현재 위치


    return (
        <MapContext.Provider value={{ map, setMap, markers, setMarkers, showMobileMapSearch, setShowMobileMapSearch, psRef, currentPosition, setCurrentPosition, DEFAULT_LAT, DEFAULT_LNG }}>
            {children}
        </MapContext.Provider>
    );
};