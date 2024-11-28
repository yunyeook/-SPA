const executor = (resolve, reject) => {
  resolve('성공'); //resolve(value) 값은 1개만
  reject('실패'); //reject(value) 값은 1개만 나머지는 무시됨.
};
const promise = new Promise(executor);

/*
then(callback1, callback2) 
callback1 : 매개변수 = 무조건 1개, Promise객체 생성시 callback함수의 성공매개변수의 value
callback2 : 매개변수 = 무조건. 1개, Promise객체 생성시 callback함수의 실패매개변수의 value
*/
promise.then(
  result => {
    console.log(result);
  },
  error => {
    console.log(error);
  }
);
//then(callback) : callback함수의 매개변수 result = 무조건1개, Promise객체 생성시 callback함수의 성공매개변수의 value
//.catch(callback) :  무조건. 1개, Promise객체 생성시 callback함수의 실패매개변수의 value
promise
  .then(result => {
    console.log(result);
  })
  .catch(result => {
    console.log(result);
  });
