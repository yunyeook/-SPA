//헤더아래 Asia와 같이 도시들을 리스트할수 있도록하는 부분
export default function RegionList({ $app, initialState, handleRegion }) {
  this.state = initialState; //region이름 ex)Asia
  this.$target = document.createElement('div');
  this.$target.className = 'region-list';

  this.handleRegion = handleRegion;
  $app.appendChild(this.$target);

  this.template = () => {
    const regionList = [
      '🚀 All',
      '🌏 Asia',
      '🕌 Middle-East',
      '🇪🇺 Europe',
      '💃 Latin-America',
      '🐘 Africa',
      '🏈 North-America',
      '🏄 Oceania',
    ];
    let temp = ``;
    regionList.forEach(elm => {
      let regionId = elm.split(' ')[1];
      temp += `<div id=${regionId}>${elm}</div>`;
    });
    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    if (this.state) {
      let $currentRegion = document.getElementById(this.state);
      $currentRegion && ($currentRegion.className = 'clicked');
    } else {
      document.getElementById('All').className = 'clicked';
    }
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render();
  const $regionList = this.$target.querySelectorAll('div'); //All, Asia 등 NodeList반환.

  $regionList.forEach(elm => {
    elm.addEventListener('click', () => {
      this.handleRegion(elm.id);
    });
  });
}
