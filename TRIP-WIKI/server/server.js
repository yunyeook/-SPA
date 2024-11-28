const express = require('express');
const path = require('path');
const app = express(); // ==express 애플리케이션 객체 생성하기
const PORT = 3000;

// app.use() : express애플리케이션에 미들웨어 추가하기
//__dirname : directory + name 으로 현재의 파일이 위치한 폴더의 절대경로를 알려줌.
app.use(express.static(path.join(__dirname, '..'))); // '..'으로 현재파일이 위치한폴더의 상위폴더를 알려줌.

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html')); //모든요청(*/)에 index.html파일을 보냄.
});

app.listen(PORT, () => {
  console.log('start server');
});
