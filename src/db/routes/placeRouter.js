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

    try {

        await pool.query('BEGIN'); // 트랜잭션 시작

        const placeData = req.body;

        // 전달받은 사용자와 세션값 같은지 확인
        const loginUser = req.session.loginUser;
        if (loginUser != null && (loginUser.user_seq_no != placeData.userSeqNo)) {
            resultMsg = '장소 정보를 저장할 권한이 존재하지 않습니다. 확인 후 다시 시도해주세요.';
            status = 403;
            throw new Error(resultMsg);
        }

        // 넘어온 데이터가 활성화 된 추억이 아닌 경우
        const activeMemoryInfo = await queries.getMemory(undefined, placeData.memoryCodeSeqNo, placeData.userSeqNo, undefined, true);
        if (activeMemoryInfo === null) {
            status = 400;
            throw new Error(resultMsg);
        }

        // 중복 데이터 확인 (추억코드, 장소ID)
        const placeInfoCheck = await queries.getPlaces(undefined, placeData.memoryCodeSeqNo, undefined, placeData.placeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
        if(placeInfoCheck !== null){
            status = 200;
            resultMsg = '이미 저장된 장소 정보입니다. 확인 후 다시 시도해주세요.';
            throw new Error(resultMsg);
        }

        // 장소 저장
        const insertPlaceRes = await queries.insertPlace(placeData);    // 추억 코드 생성
        if (!insertPlaceRes.result){ // 생성 실패 시 오류
            status = 400;
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

// 장소 목록 조회
router.get('/:memoryCodeSeqNo', async (req, res) => {
    //#swagger.tags = ["Place"]
    //#swagger.summary = "추억 코드로 저장 장소 목록 조회"
    let placeList = null;

    try {

        const memoryCodeSeqNo = req.params.memoryCodeSeqNo;
        placeList = await queries.getPlaces(undefined, memoryCodeSeqNo, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    } catch (error) {

    } finally {
        res.json({ placeList: placeList });
    }

});

module.exports = router;