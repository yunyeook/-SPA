import Content from './components/content.js';
import TabBar from './components/tabBar.js';
import { request } from './components/api.js';

export default function App(app) {
  this.state = {
    currentTab: window.location.pathname.slice(115) || 'all',
    photos: [],
  };
  const tabBar = new TabBar({
    app,
    initialState: '',
    onClick: async name => {
      history.pushState(null, `${name}`, name);
      this.setState({
        // ...this.state,
        //function App의 this.state를 가리킴 (why? 화살표 함수니까 상위 스코프의 this를 참조)
        currentTab: name,
        photos: await request(name === 'all' ? '' : name),
      });
    },
  });
  const content = new Content({ app, initialState: [] });

  this.setState = newState => {
    this.state = newState;
    tabBar.setState(this.state.currentTab);
    content.setState(this.state.photos);
  };

  window.addEventListener('popstate', async () => {
    const tabName = window.location.pathname.slice(115) || 'all';
    const photos = await request(tabName === 'all' ? '' : tabName);
    this.setState({
      ...this.state,
      currentTab: tabName,
      photos: photos,
    });
  });
  const init = async () => {
    //초기화하기
    try {
      const currentTab = this.state.currentTab;
      const initialPhotos = await request(currentTab === 'all' ? '' : currentTab); //전체사진 불러옴.
      this.setState({
        ...this.state, //currentTab : 'all'임.
        photos: initialPhotos,
      });
    } catch (err) {
      console.log(err);
    }
  };
  init();
}
