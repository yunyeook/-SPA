const workA = value => {
  console.log(value);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value + 5);
    }, 5000);
  });
  return promise;
};
const workB = value => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value + 3);
    }, 3000);
  });
  return promise;
};
const workC = value => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value + 10);
    }, 10000);
  });
  return promise;
};

/* workA, workB,workC 는 각각의 결과값이 다음 함수의 인자로 필요하지만
console.log('hihi')는 상관 없으니까 
관련있는 것끼리 묶어서 순서대로 실행되도록 하고 다음꺼 바로 실행하면됨.
*/
workA(10)
  .then(res1 => {
    console.log('workA = ' + res1);
    return workB(res1);
  })
  .then(res2 => {
    console.log('workB = ' + res2);
    return workC(res2);
  })
  .then(res3 => {
    console.log('workC = ' + res3);
  })
  .catch(error => console.log(error));

console.log('hihi');
