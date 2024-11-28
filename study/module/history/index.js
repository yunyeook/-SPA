const changePage = page => {
  let $content = document.getElementById('content');
  $content.textContent = `현재 보고 있는 페이지는 ${page}입니다.`;
  // history.pushState(state, title, url); state는 객체임=={}
  //현재 페이지를 세션기록'스택'에 저장함.
  history.pushState({
    page: page
  }, `Title${page}`, `/${page}`);
};
//popstate : history의 back()또는 forward()메서드 사용한 경우.
//세션기록'스택'에서 POP함.
window.addEventListener('popstate', event => {
  console.dir(event)
  if (event.state) {
    let $content = document.getElementById('content');
    $content.textContent = `현재 보고 있는 페이지는 ${event.state.page}입니다.`;
  }
});

document.getElementById('page1').addEventListener('click', () => {
  changePage('page1');
});
document.getElementById('page2').addEventListener('click', () => {
  changePage('page2');
});
document.getElementById('page3').addEventListener('click', () => {
  changePage('page3');
});
//document.getElementById('page1').addEventListner('click',change('page1')) 처럼 listner자리에 화살표함수 없이 바로 함수를 불러오면 클릭을 안해도 실행이 되기때문에 이처럼 쓰면 안된다.!!

// const goBack = () => {
//   history.back(); //페이지 주소가 바뀜.
// };

// const goForward = () => {
//   history.forward();
// };
// document.getElementById('goBack').addEventListener('click', () => {
//   goBack();
// });
// document.getElementById('goForward').addEventListener('click', () => {
//   goForward();
// });

document.getElementById('goBack').addEventListener('click', () => {
  history.back() //페이지 주소를 바꿔주는 메서드: 뷰포트에 보이는 화면이 바뀌지 않음.
});
document.getElementById('goForward').addEventListener('click', () => {
  history.forward() // 페이지 주소를 바꿔주는 메서드 : 뷰포트에 보이는 화면이 바뀌지 않음.
});
console.log(history)