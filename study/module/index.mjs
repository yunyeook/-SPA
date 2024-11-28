let num = 10;
console.log(num);

// import { Num, User, add } from './test.mjs';
// console.log(Num);
// console.log(add(10, 20));
// console.log(new User('yeook'));

import * as testModule from './test.mjs'; //전체 불러오기 import * as 모듈객체이름(내가 정함) from '경로'
console.log(testModule.Num);
console.log(testModule.add(10, 20));
console.log(new testModule.User('yeook'));
