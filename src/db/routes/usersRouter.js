const express = require('express');
const queries = require('../queries');

const router = express.Router();


// 로그인 및 회원가입
router.post('/login', async (req, res) => {

    let resultMsg = "로그인 중 문제가 발생했습니다. 다시 시도해주세요.";
    let status = 500;
    let redirectUrl = "/";


    try {
        const { userInfo } = req.body;
        const resUsers = await queries.getUsers(undefined, undefined, undefined, undefined, userInfo.social_id);    // 사용자 조회
        const isUserExists = resUsers.length > 0;

        if (!isUserExists) {    // 신규 회원 -> 회원가입
            const result = await queries.insertUser(userInfo.email, userInfo.user_nm, userInfo.social_type, userInfo.social_id);  // 회원가입
            req.session.loginUser = result.result ? result.userInfo : null;    // 회원가입 성공 시 세션 저장
            redirectUrl = result.result ? '/memory/connection' : '/'; // 회원가입 성공 시 리다이렉트 경로
            status = result.result ? 200 : 500;
        } else {    // 기존 회원 -> 로그인
            req.session.loginUser = resUsers[0]; // 첫 번째 사용자로 로그인
            status = 200;
            redirectUrl = '/memory/connection';
            resultMsg = '';
        }

    } catch (error) {
        // res.status(500).json({ redirectUrl: '/'}); // 오류 발생 시 500 에러 응답
    } finally {
        res.status(status).json({ redirectUrl: redirectUrl, resultMsg : resultMsg});
    }

});

// 로그아웃
router.get('/logout', async (req, res) => {
    delete req.session.loginUser;
    res.status(200).json({ redirectUrl: '/' });
});

// 로그인 확인
router.post('/login/check', async (req, res) => {
    const loginUser = req.session.loginUser;
    res.json({
        result: loginUser === undefined? false:true,
        loginUser: loginUser
    })
});


module.exports = router;