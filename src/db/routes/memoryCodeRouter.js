const express = require('express');
const queries = require('../queries');
const pool = require('../dbConfig');

const router = express.Router();

router.get('/:memoryCodeSeqNo', async (req, res) => {

    const reqMemoryCodeSeqNo = req.params.memoryCodeSeqNo;
    let memoryCodeInfo = null;
    try{
        memoryCodeInfo = await queries.getMemoryCode(reqMemoryCodeSeqNo, undefined, undefined);
    } catch(error){

    } finally{
        res.json({ memoryCodeInfo: memoryCodeInfo });
    }
});





module.exports = router;