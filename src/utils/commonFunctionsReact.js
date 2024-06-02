import axiosInstance from 'utils/axiosInstance';

// 로그인 확인
export async function loginCheck() {

    const errorMsg = '해당 페이지는 로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.';

    try {
        const res = await axiosInstance.get('/api/users/login/check');
        if (!res.data.result) {
            handleLoginFailure(errorMsg);
        }
    } catch (error) {
        handleLoginFailure(errorMsg);
    }
}

function handleLoginFailure(errorMsg) {
    sessionStorage.clear();
    alert(errorMsg);
    window.location.href = '/';
}

// 로그아웃
export async function handleLogout() {

    const logoutErrorMsg = '로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.';

    await axiosInstance.get(`/api/users/logout`)
        .then(res => {
            if (res.status === 200) {
                sessionStorage.clear();
                window.location.href = '/';
            } else {
                alert(logoutErrorMsg);
            }
        })
        .catch(error => {
            alert(logoutErrorMsg);
        });
}

// 활성화 추억 정보 세션에 저장
export async function activeMemoryInfoSaveSession(activeMemoryInfo) {
    try {
        // 첫 번째 요청: 추억 코드 정보 조회
        const res1 = await axiosInstance.get(`/api/memoryCodes/${activeMemoryInfo.memory_code_seq_no}`);

        // activeMemoryInfo에 res1.data.memoryCodeInfo를 추가합니다.
        const updatedActiveMemoryInfo = {
            ...activeMemoryInfo,
            ...res1.data.memoryCodeInfo
        };
        sessionStorage.setItem('activeMemoryInfo', JSON.stringify(updatedActiveMemoryInfo));

    } catch (error) {

    }


}