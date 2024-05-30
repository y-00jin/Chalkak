const express = require('express');
const queries = require('../queries');
const pool = require('../dbConfig');

const router = express.Router();


// 장소 INSERT
router.post('/', async (req, res) => {
    //#swagger.tags = ["Place"]
    //#swagger.summary = "장소 저장"

    let status = 500;
    let resultMsg = '장소 저장 중 문제가 발생했습니다. 다시 시도해주세요.';


    const loginUser = req.session.loginUser;
    const test = req.session.activeMemoryInfo;
    console.log(loginUser);
    console.log(test);

    // const activeMemoryInfo = await queries.getMemory(undefined, undefined, loginUser.user_seq_no, undefined, true);    // 활성화 된 추억 조회
    const placeData = req.body;
    console.log(placeData);



    res.status(status).json({ resultMsg });
    // try {

    //     await pool.query('BEGIN'); // 트랜잭션 시작

    //     const loginUser = req.session.loginUser;

    //     let memoryCodeCheck = false;
    //     let memoryCode = "";
    //     while (!memoryCodeCheck) {
    //         // 추억 코드 랜덤 생성
    //         memoryCode = generateRandomString(10);

    //         // 추억 코드 중복 확인
    //         const memoryCodeCheckRes = await queries.getMemoryCodes(undefined, memoryCode, undefined);    // 추억 코드 중복 확인
    //         if (memoryCodeCheckRes.length < 1) {
    //             memoryCodeCheck = true;
    //         }
    //     }

    //     // 추억 코드 생성
    //     const insertMemoryCodeRes = await queries.insertMemoryCode(memoryCode, memoryNm);    // 추억 코드 생성
    //     if (!insertMemoryCodeRes.result) // 생성 실패 시 오류
    //         throw new Error(resultMsg);

    //     // 새로운 추억 생성
    //     const insertMemoryRes = await queries.insertMemory(
    //         insertMemoryCodeRes.memoryCodeInfo.memory_code_seq_no,
    //         loginUser.user_seq_no,
    //         'COLOR_CODE_1',
    //         true
    //     );

    //     if (!insertMemoryRes.result) { // 추억 생성 실패
    //         throw new Error(resultMsg);
    //     }


    //     // 활성화 된 추억 비활성화로 수정
    //     const updateMemoryActiveRes = await queries.updateMemoryActiveNotThis(insertMemoryRes.memoryInfo.memory_seq_no, loginUser.user_seq_no);
    //     if (!updateMemoryActiveRes.result) {  // 수정 실패
    //         throw new Error(resultMsg);
    //     }

    //     status = 200;
    //     resultMsg = "";

    //     await pool.query('COMMIT'); // 트랜잭션 커밋
    // } catch (error) {
    //     await pool.query('ROLLBACK'); // 트랜잭션 롤백
    // } finally {
    //     res.status(status).json({ resultMsg: resultMsg });
    // }
});


module.exports = router;