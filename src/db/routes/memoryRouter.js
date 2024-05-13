const express = require('express');
const queries = require('../queries');
const pool = require('../dbConfig');

const router = express.Router();
const { generateRandomString } = require('../../utils/commonFunctions');

// 활성화 추억 확인
router.get('/active', async (req, res) => {
    let status = 500;
    let resultMsg = '추억 연결 중 문제가 발생했습니다. 다시 시도해주세요.';
    let activeMemoryInfo = null;
    try {
        const loginUser = req.session.loginUser;

        activeMemoryInfo = await queries.getMemory(undefined, undefined, loginUser.user_seq_no, undefined, true);    // 활성화 된 추억 조회

        if (activeMemoryInfo == null) {
            resultMsg = '활성화된 추억이 존재하지 않습니다.\n새로운 추억을 생성하거나 추억 코드로 연결해주세요.';
        }
        else {
            resultMsg = null;
        }
        status = 200;
    } catch (error) {
        // console.log('오류!');
    } finally {
        res.status(status).json({ resultMsg: resultMsg, activeMemoryInfo: activeMemoryInfo });
    }
});

// 새 추억 생성
router.post('/new', async (req, res) => {
    let status = 500;
    let resultMsg = '추억 생성 중 문제가 발생했습니다. 다시 시도해주세요.';
    const { memoryNm } = req.body;

    try {

        await pool.query('BEGIN'); // 트랜잭션 시작

        const loginUser = req.session.loginUser;

        let memoryCodeCheck = false;
        let memoryCode = "";
        while (!memoryCodeCheck) {
            // 추억 코드 랜덤 생성
            memoryCode = generateRandomString(10);

            // 추억 코드 중복 확인
            const memoryCodeCheckRes = await queries.getMemoryCodes(undefined, memoryCode, undefined);    // 추억 코드 중복 확인
            if (memoryCodeCheckRes.length < 1) {
                memoryCodeCheck = true;
            }
        }

        // 추억 코드 생성
        const insertMemoryCodeRes = await queries.insertMemoryCode(memoryCode, memoryNm);    // 추억 코드 생성
        if (!insertMemoryCodeRes.result) // 생성 실패 시 오류
            throw new Error(resultMsg);

        // 새로운 추억 생성
        const insertMemoryRes = await queries.insertMemory(
            insertMemoryCodeRes.memoryCodeInfo.memory_code_seq_no,
            loginUser.user_seq_no,
            'COLOR_CODE_1',
            true
        );

        if (!insertMemoryRes.result) { // 추억 생성 실패
            throw new Error(resultMsg);
        }


        // 활성화 된 추억 비활성화로 수정
        const updateMemoryActiveRes = await queries.updateMemoryActiveNotThis(insertMemoryRes.memoryInfo.memory_seq_no, loginUser.user_seq_no);
        if(!updateMemoryActiveRes.result){  // 수정 실패
            throw new Error(resultMsg);
        } 

        status = 200;
        resultMsg = "";
        await pool.query('COMMIT'); // 트랜잭션 커밋
    } catch (error) {
        await pool.query('ROLLBACK'); // 트랜잭션 롤백
    } finally {
        res.status(status).json({ resultMsg: resultMsg });
    }
});

// 추억 코드로 추억 연결
router.post('/connection', async (req, res) => {
    let status = 500;
    let resultMsg = '추억 연결 중 문제가 발생했습니다. 다시 시도해주세요.';
    const { memoryCode } = req.body;

    try {

        await pool.query('BEGIN'); // 트랜잭션 시작

        const loginUser = req.session.loginUser;

        // 추억 코드 확인
        const memoryCodeRes = await queries.getMemoryCode(undefined, memoryCode, undefined);
        if(memoryCodeRes == null){
            resultMsg = '올바르지 않은 추억 코드입니다. 확인 후 다시 시도해주세요.';
            throw new Error(resultMsg);
        }

        // 이미 등록된 추억인지 확인
        const memoryRes = await queries.getMemory(undefined, memoryCodeRes.memory_code_seq_no, loginUser.user_seq_no, undefined, undefined)
        if(memoryRes != null){
            resultMsg = '이미 연결된 추억입니다.';
            throw new Error(resultMsg);
        }

        // 추억 연결 INSERT
        const insertMemoryRes = await queries.insertMemory(
            memoryCodeRes.memory_code_seq_no,
            loginUser.user_seq_no,
            'COLOR_CODE_1',
            true
        );

        if (!insertMemoryRes.result) { // 추억 연결 실패
            throw new Error(resultMsg);
        }

        // 활성화 된 추억 비활성화로 수정
        const updateMemoryActiveRes = await queries.updateMemoryActiveNotThis(insertMemoryRes.memoryInfo.memory_seq_no, loginUser.user_seq_no);
        if(!updateMemoryActiveRes.result){  // 수정 실패
            throw new Error(resultMsg);
        } 
        status = 200;
        resultMsg = "";
        await pool.query('COMMIT'); // 트랜잭션 커밋
    } catch (error) {
        await pool.query('ROLLBACK'); // 트랜잭션 롤백
    } finally {
        res.status(status).json({ resultMsg: resultMsg });
    }
});

module.exports = router;