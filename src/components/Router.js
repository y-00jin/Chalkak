import MapHome from 'pages/map';
import MemoryConnection from 'pages/memory/connection';
import MemoryLogin from 'pages/memory/login';
import MemoryNew from 'pages/memory/new';
import MyPageHome from 'pages/place/myPage';
import { Route, Routes, Navigate } from 'react-router';
export default function Router() {
    return (
        <>
            {/** 경로 설정 */}
            <Routes>

                {/** 추억 관리 */}
                <Route path="/" element={<MemoryLogin />} />
                <Route path="/memory/new" element={<MemoryNew />} />
                <Route path="/memory/connection" element={<MemoryConnection />} />

                {/** 지도서비스 */}
                <Route path="/map" element={<MapHome/>} />

                {/* 장소 관리 */}
                <Route path="/mypage" element={<MyPageHome/>} />


                {/** 설정된 경로를 제외한 나머지 경로로 접속한 경우 루트 페이지로 이동 */}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </>
    );

}