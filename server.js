const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();


require('dotenv').config(); // dotenv를 사용하여 환경 변수 로드

// 세션 설정
app.use(session({
  secret: process.env.REACT_APP_SESSION_SECRET_KEY, // 세션 암호화를 위한 비밀키
  resave: false, // 변경 사항이 없더라도 세션을 다시 저장할지 여부
  saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
  cookie: { secure: false } // 쿠키 설정, HTTPS가 아닌 환경에서도 사용하려면 false로 설정
}));

const testRouter = require('./src/db/routes/testRouter');
const authRouter = require('./src/db/routes/authRouter');
const usersRouter = require('./src/db/routes/usersRouter');
const memoryRouter = require('./src/db/routes/memoryRouter');

const port = process.env.PORT || 8088; // 포트 설정

// CORS 사용
const cors = require('cors');
const corsOption = {
    origin: "*",
    optionSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(express.json());

app.use('/api/tests', testRouter); // '/tests' 경로에 대한 요청은 testRouter.js 파일에서 처리
app.use('/api/auth', authRouter);  // auth
app.use('/api/users', usersRouter);  // users
app.use('/api/memories', memoryRouter);  // users


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

  
