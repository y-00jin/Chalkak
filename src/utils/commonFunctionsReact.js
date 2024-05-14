import axios from "axios";

export async function loginCheck() {

    const errorMsg = '해당 페이지는 로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.';

    await axios.post('/api/users/login/check')
        .then(response => {
            if (!response.data.result) {
                alert(errorMsg);
                window.location.href = '/';
            } 
        })
        .catch(error => {
            alert(errorMsg);
            window.location.href = '/';
        });
}



