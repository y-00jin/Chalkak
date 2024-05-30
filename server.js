const express = require('express');
const session = require('express-session');
const path = require('path');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const app = express();
// const { swaggerUi, specs } = require("./swagger.js");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");


require('dotenv').config(); // dotenv를 사용하여 환경 변수 로드

// 세션 설정
app.use(session({
  secret: process.env.REACT_APP_SESSION_SECRET_KEY, // 세션 암호화를 위한 비밀키
  resave: false, // 변경 사항이 없더라도 세션을 다시 저장할지 여부
  saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
  cookie: {
    secure: false, // HTTPS가 아닌 환경에서도 사용하려면 false로 설정
    httpOnly: true, // 클라이언트 측에서 쿠키 접근 불가
    maxAge: 24 * 60 * 60 * 1000, // 쿠키 유효 기간 설정 (1일)
  }
}));

const port = process.env.REACT_APP_API_PORT; // 포트 설정

// CORS 사용
const corsOption = {
  origin: process.env.REACT_APP_CLIENT_BASE_URL,
  credentials: true, // 세션 쿠키를 허용하도록 설정
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(express.json());

const testRouter = require('./src/db/routes/testRouter');
const usersRouter = require('./src/db/routes/usersRouter');
const authRouter = require('./src/db/routes/authRouter');
const memoryRouter = require('./src/db/routes/memoryRouter');
const memoryCodeRouter = require('./src/db/routes/memoryCodeRouter');
const placeRouter = require('./src/db/routes/placeRouter');

app.use('/api/users', usersRouter);  // users
app.use('/api/tests', testRouter); // '/tests' 경로에 대한 요청은 testRouter.js 파일에서 처리
app.use('/api/auth', authRouter);  // auth
app.use('/api/memories', memoryRouter);  // memories
app.use('/api/memoryCodes', memoryCodeRouter);  // memoryCodes
app.use('/api/places', placeRouter);  // places


// 정적 파일 미들웨어 설정
app.use(express.static(path.join(__dirname, '/build')));
// swagger-autogen
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 모든 요청에 대해 index.html 제공
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

// HTTPS 옵션 설정
const httpsOptions = {
  key: fs.readFileSync('./key.pem'), // 개인 키 파일
  cert: fs.readFileSync('./cert.pem'), // SSL/TLS 인증서 파일
};

// HTTPS 서버 시작
https.createServer(httpsOptions, app).listen(port, () => {
  console.log('Node 서버가 HTTPS로 연결됨: ' + port);
});

// // 서버 확인
// app.listen(port, () => {
//   console.log('노드 연결 쌉가능 :' + port);
// });


