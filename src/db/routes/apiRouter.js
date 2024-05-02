const express = require('express');
const queries = require('../queries');

const router = express.Router();

router.get('/api', async (req, res) => {
    try {
console.log('a');

    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' }); // 오류 발생 시 500 에러 응답
    }
});


module.exports = router;