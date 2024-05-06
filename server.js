const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const queries = require('./src/db/queries');


const testRouter = require('./src/db/routes/testRouter');
const apiRouter = require('./src/db/routes/apiRouter');

const port = process.env.PORT || 8088; // 포트 설정

// CORS 사용
const cors = require('cors');
const corsOption = {
    origin: "*",
    optionSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(express.json());
// app.use(bodyParser.json());


app.use('/api/tests', testRouter); // '/tests' 경로에 대한 요청은 testRouter.js 파일에서 처리
app.use('/api/auth', apiRouter);  // auth






// 정적 파일 미들웨어 설정
app.use(express.static(path.join(__dirname, '/build')));

// 모든 요청에 대해 index.html 제공
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

// 서버 확인
app.listen(port, ()=>{
  console.log('노드 연결 쌉가능 :' + port);
});

  
