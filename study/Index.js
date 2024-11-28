const $name = document.getElementById('name');
$name.className = 'name';
$name.className += ' animal';
$name.classList.add('hi');

// console.log($name);

const animal = document.getElementsByClassName('animal');

const animalInfo = document.querySelector('div.animal-info');

let cat = document.createElement('div');
cat.className = 'cat';
cat.id = 'name';

let CAT = document.createTextNode('고양이');

animalInfo.appendChild(cat); //
cat.appendChild(CAT);

let button = document.createElement('button');
let BUTTON = document.createTextNode('BUTTON');
animalInfo.appendChild(button);
button.appendChild(BUTTON);
button.addEventListener('click', () => {
  alert('click');
});
