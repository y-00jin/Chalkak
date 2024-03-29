import { Route, Routes, Navigate } from 'react-router';
import Login from 'pages/memory/Login';
import Connection from 'pages/memory/Connection';
import Write from 'pages/memory/Write';

export default function Router() {
    return (
        <>
            {/** 경로 설정 */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/memory/write" element={<Write />} />
                <Route path="/memory/connection" element={<Connection />} />

                {/** 설정된 경로를 제외한 나머지 경로로 접속한 경우 루트 페이지로 이동 */}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </>
    );

}