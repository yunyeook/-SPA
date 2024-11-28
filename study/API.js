//fetch() 는 프로미스 객체를 반환한다.
//jsonplaceholder 사이트
// let reponse = fetch('https://jsonplaceholder.typicode.com/users');
// // console.log(reponse);
// reponse.then(res => {
//   console.log(res); //Response{}객체가 출력이된다. : API호출에 성공했을때 반환되는 API성공 객체이다.
// });

//response.then()대신에 await을 사용하여 resolve값을 저장한다.
async function getData() {
  try {
    let reponse = await fetch('https://jsonplaceholder.typicode.com/users');
    // fetch()의 결과값은 프로미스이므로 await 을 사용해 fetch()가 성공했을때 갖는 값인 Response {} 객체를 가져올수 있다.

    let data = await reponse.json(); //  사이트에 나와있는것처럼 json의 문법으로 나타내기 위해 json()메서드를 사용한다.이 또한 프로미스객체를 반환함.
    // console.log(reponse); //프로미스 객체 출력됨
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getData();
