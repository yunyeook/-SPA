import Header from './components/Header.js';
import RegionList from './components/RegionList.js';
import CityList from './components/CityList.js';
import CityDetail from './components/CityDetail.js';

import { request, requestCityDetail } from './components/api.js';

export default function App($app) {
  //getSortBy, getSearchWoard : 현재 url에서 매개변수인sort와 search 값을 가져오는것.
  //window.location.pathname : url반환함. node.js의 path모듈사용해서 search로 경로사용가능.
  //window.location.search 매개변수
  const getSortBy = () => {
    if (window.location.search) {
      return window.location.search.split('sort=')[1].split('&')[0];
    }
    return 'total';
  };

  const getSearchWord = () => {
    if (window.location?.search?.includes('search=')) {
      return window.location.search.split('search=')[1];
    }
    return '';
  };
  this.state = {
    startIdx: 0,
    sortBy: getSortBy(),
    searchWord: getSearchWord(),
    region: '',
    cities: '', //json형태의 데이터
    currentPage: window.location.pathname,
  };
  const renderHeader = () => {
    new Header({
      $app,
      initialState: {
        sortBy: this.state.sortBy,
        searchWord: this.state.searchWord,
        currentPage: this.state.currentPage,
      },
      handleSortChange: async sortBy => {
        const pageUrl = `/${this.state.region}?sort=${sortBy}`;
        // history.pushState(state, title, url); state==객체{}
        //현재 페이지를 세션기록'스택'에 저장함. -> 페이지저장했으니 해당페이지일때 특정요소만 보여주도록 라우팅함.
        history.pushState(null, null, this.state.searchWord ? pageUrl + `$search=${this.state.searchWord}` : pageUrl);
        const cities = await request(0, this.state.region, sortBy, this.state.searchWord);
        this.setState({
          ...this.state,
          startIdx: 0,
          sortBy: sortBy,
          cities: cities,
        });
      },
      handleSearch: async searchWord => {
        history.pushState(null, null, `/${this.state.region}?sort=${this.state.sortBy}&search=${searchWord}`);
        const cities = await request(0, this.state.region, this.state.sortBy, searchWord);
        this.setState({ ...this.state, startIdx: 0, searchWord: searchWord, cities: cities });
      },
    });
  };
  const renderRegionList = () => {
    new RegionList({
      $app,
      initialState: this.state.region,
      handleRegion: async region => {
        history.pushState(null, null, `/${region}?sort=total`);
        const cities = await request(0, region, 'total');
        this.setState({
          ...this.state,
          startIdx: 0,
          region: region,
          sortBy: 'total',
          searchWord: '',
          cities: cities,
          currentPage: window.location.pathname,
        });
      },
    });
  };

  const renderCityList = () => {
    new CityList({
      $app,
      initialState: this.state.cities,
      handleLoadMore: async () => {
        const newStartIdx = this.state.startIdx + 40;
        const newCities = await request(newStartIdx, this.state.region, this.state.sortBy, this.state.searchWord);
        this.setState({
          ...this.state,
          startIdx: newStartIdx,
          cities: {
            cities: [...this.state.cities.cities, ...newCities.cities],
            isEnd: newCities.isEnd,
          },
        });
      },
      handleItemClick: id => {
        history.pushState(null, null, `/city/${id}`);
        this.setState({ ...this.state, currentPage: `/city/${id}` });
      },
    });
  };
  const renderCityDetail = async cityId => {
    try {
      const cityDetailData = await requestCityDetail(cityId);
      new CityDetail({ $app, initialState: cityDetailData });
    } catch (error) {
      console.log(error);
    }
  };
  //header,regionlist,citylist를 바꾸도록함.
  this.setState = newState => {
    this.state = newState;
    render();
  };

  const render = async () => {
    const path = this.state.currentPage;
    $app.innerHTML = '';
    // 상세 페이지로 이동
    if (path.startsWith('/city/')) {
      const cityId = path.split('/city/')[1];
      renderHeader();
      renderCityDetail(cityId);
    } else {
      renderHeader();
      renderRegionList();
      renderCityList();
    }
  };

  const init = async () => {
    const path = this.state.currentPage;
    $app.innerHTML = '';
    if (path.startsWith('/city/')) {
      render();
    } else {
      const cities = await request(this.state.startIdx, this.state.region, this.state.sortBy, this.state.searchWord);
      this.setState({ ...this.state, cities: cities });
    }
  };
  //window.location은 현재 웹페이지의 URL정보를 담은 객체
  //window.location.pathname은  URL중 리소스경로를 나타냄.(/이하값.)
  ['popstate', 'load'].forEach(elm => {
    window.addEventListener(elm, async () => {
      const urlPath = window.location.pathname;
      console.log(window.location);
      const region = urlPath.replace('/', '');
      const sortBy = getSortBy();
      const searchWord = getSearchWord();
      const startIdx = 0;
      const cities = await request(startIdx, region, sortBy, searchWord);

      this.setState({
        ...this.state,
        startIdx: startIdx,
        sortBy: sortBy,
        region: region,
        searchWord: searchWord,
        cities: cities,
        currentPage: urlPath,
      });
    });
  });

  init();
}
