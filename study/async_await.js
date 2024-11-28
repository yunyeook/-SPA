function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.floor(ms / 1000) + '초가 지났습니다.');
    }, ms);
  });
}

function start() {
  delay(3000).then(res => console.log(res));
}

start();

/*
- async가 붙은 함수는 프로미스 객체를 반환한다. -> then()메서드를 쓸수 있다
- await은 async가 붙은 함수의 내부에서만 사용가능하다, then()대신에 사용한다. 
  프로미스 객체를 반환하는 함수가 처리될때까지 다음 코드를 실행하지 않겠다는 의미이다.
  await이 많은경우 한꺼번에 병렬적으로 실행된다.

*/
async function start2() {
  try {
    let result1 = await delay(5000);
    let result2 = await delay(3000);
    let result3 = await delay(10000);

    //위의 await이 붙은 함수가 끝나기 전까지 밑의 console.log()가 실행이안됨.
    // 10초뒤에 실행됨.
    console.log(result1);
    console.log(result2);
    console.log(result3);
    console.log(1);

    /*try문안에서 에러가 발생하면 (==await키워드가 붙은 함수를 실행했을때 reject의 값을 가진 프로미스가 반환된다면)
    발생한 에러가 error객체에 담기게 되어 console.log(error)로 어떤에러가 발생했는지 알수있다.*/
  } catch (error) {
    console.log(error);
  }
}
start2();
// console.log(start2()); //Promise{<pending>}
