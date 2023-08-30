import express from 'express';
import indexsRouter from './routes/indexs.js';
import connect from './schemas/index.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const PORT = process.env.Port; // 서버를 열 때 사용할 포트 번호

connect(); // 몽고디비를 연결하기 위한 커넥트 함수를 실행한다.

app.use(express.json()); // json형태로 서버에 body 데이터를 전달하면, req.body 에 데이터를 변환하여 넣어준다.
app.use(express.urlencoded({ extended: true })); // form content tpye 에서 body 데이터를 전달하면, req.body에 데이터를 변환하여 넣어준다.

// 2. 라우터를 등록 합니다.

app.use('/', indexsRouter);

// 1. Express.js의 서버를 엽니다.
app.listen(PORT, () => {
  console.log(`${PORT} 포트 오픈`);
});