const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        version: '0.0.9',
        title: "찰칵 API 명세서",
        description: "Express 서버 api 명세 정리",
    },
    host: "localhost:3000",// API 호스트
    basePath: '/', // 기본 경로
    schemes: ['https'], // 프로토콜 설정
    tags: [ // 태그 추가
        {
            name: 'Auth',
            description: '카카오 인증',
        },
        {
            name: 'MemoryCode',
            description: '추억 코드 관리',
        },
        {
            name: 'Memory',
            description: '추억 관리',
        },
        {
            name: 'User',
            description: '사용자 관리',
        },
    ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
    "./server.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);