const express = require('express');
const path = require('path');
const app = express(); //express객체 생성
const PORT = 3000;

//express 의 use메서드 : 미들웨어 생성함수.
//미들웨어 = 프레임워크가 reponse객체와 request객체를 수정하고 종료하고 서버에 request를 보내는 기능을 할 수 있도록 도와주는 함수.
//static메서드 : 내장 미들웨어함수 정적파일제공가능한 미들웨어 생성가능하게함.(여기선 index.html파일)

app.use(express.static(path.join(__dirname, '..', 'project')));
app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'project', 'index.html'));
}); //express객체의 get(경로,콜백함수)메서드
//response객체의 sendFile()응답객체에 파일을 보내주는 메서드
app.listen(PORT, () => {
  console.log('start server');
});
