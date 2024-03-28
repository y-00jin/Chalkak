const express = require('express');
// const bodyParser = require('body-parser');  // JSON 형식 파싱
const queries = require('./src/db/queries'); // queries.js 파일 전체를 가져옴

const path = require('path');
const app = express();

const port = process.env.PORT || 8088; // 포트 설정

// CORS 사용
const cors = require('cors');
const corsOption = {
    origin: "*",
    optionSuccessStatus: 200,
};
app.use(cors(corsOption));

// body-parser 미들웨어 등록
// app.use(bodyParser.json());
app.use(express.json());

app.get('/tests', async (req,res) => {
  try {
    const tests = await queries.getTests(); // queries 객체를 통해 getUsers 함수를 호출하여 사용자 목록을 가져옴
    res.json(tests); // 사용자 목록을 JSON 형식으로 응답
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' }); // 오류 발생 시 500 에러 응답
  }
});

app.post('/tests/add', async (req, res) => {
  const testName = req.body.testName; // POST 요청에서 testName 파라미터를 가져옴
  try {
    const result = await queries.createTest(testName); // createTest 함수를 호출하여 테스트를 생성함
    res.json(result); // 결과를 JSON 형식으로 응답
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' }); // 오류 발생 시 500 에러 응답
  }
});


// 정적 파일 미들웨어 설정
app.use(express.static(path.join(__dirname, '/build')));

// 모든 요청에 대해 index.html 제공
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

// 서버 확인
app.listen(port, ()=>{
  console.log('server is running on ' + port);
});

  
