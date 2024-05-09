const express = require('express');
const queries = require('../queries');
const router = express.Router();


// 로그인 확인
router.get('/active', async (req, res) => {
    let status = 500;
    let resultMsg = '추억 연결 중 문제가 발생했습니다. 다시 시도해주세요.';

    try {
        const loginUser = req.session.loginUser;

        const resActiveMemory = await queries.getMemory(undefined, undefined, loginUser.user_seq_no, undefined, undefined, true);    // 활성화 된 추억 조회
        
        console.log(resActiveMemory);
        if (resActiveMemory == null) {
            status = 200;
            resultMsg = '활성화된 추억이 존재하지 않습니다.\n새로운 추억을 생성하거나 추억 코드로 연결해주세요.';
        } else{
            resultMsg = null;
            status = 200;
        }
    } catch (error) {
        // console.log('오류!');
    } finally {
        console.log(resultMsg);
        res.status(status).json({ resultMsg: resultMsg });
    }
});


module.exports = router;