const express = require('express');
const queries = require('../queries');

const router = express.Router();


// 로그인 및 회원가입
router.post('/login', async (req, res) => {
    try {
        const { userInfo } = req.body;
        const resUsers = await queries.getUsers(undefined, undefined, undefined, undefined, userInfo.social_id);    // 사용자 조회
        const isUserExists = resUsers.length > 0;

        if (!isUserExists) {    // 신규 회원 -> 회원가입
            const result = await queries.createUser(userInfo.email, userInfo.user_name, userInfo.social_type, userInfo.social_id);  // 회원가입
            req.session.loginUser = result.result ? result.userInfo : null;    // 회원가입 성공 시 세션 저장
            const redirectUrl = result.result ? '/memory/new' : '/'; // 회원가입 성공 시 리다이렉트 경로
            res.status(result.result ? 200 : 500).json({ result: result.result, redirectUrl });
        } else {    // 기존 회원 -> 로그인
            req.session.loginUser = resUsers[0]; // 첫 번째 사용자로 로그인
            res.status(200).json({ result: true , redirectUrl: '/memory/new'});
        }

    } catch (error) {
        res.status(500).json({ result: false, redirectUrl: '/'}); // 오류 발생 시 500 에러 응답
    } 
});

// 로그아웃
router.get('/logout', async (req, res) => {
    delete req.session.loginUser;
    res.status(200).json({ result: true, redirectUrl: '/' });
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