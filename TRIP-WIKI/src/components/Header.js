//사이트 맨 위쪽에 있는 TripWiki, 정렬,검색하는 부분
export default function Header({ $app, initialState, handleSortChange, handleSearch }) {
  this.state = initialState; //{sortBy : this.state.sortBy, searchWord:this.state.searchWord } -> App.js의 this.state임.
  this.$target = document.createElement('div');
  this.$target.className = 'header';

  this.handleSortChange = handleSortChange;
  this.handleSearch = handleSearch;

  $app.appendChild(this.$target);

  this.template = () => {
    const { sortBy, searchWord, currentPage } = this.state;
    let tmp = `<div class='title'>
      <a href='/'>Trip Wiki</a>
      </div>`;
    if (!currentPage.includes('/city/')) {
      tmp += `<div class='filter-search-container'>
        <div class='filter'>
          <select id='sortList' class='sort-list'>
            <option value='total' ${sortBy === 'total' ? 'selected' : ''}> Total </option>
            <option value='cost' ${sortBy === 'cost' ? 'selected' : ''}> Cost </option>
            <option value='fun' ${sortBy === 'fun' ? 'selected' : ''}> Fun </option>
            <option value='safety' ${sortBy === 'safety' ? 'selected' : ''}> Safety </option>
            <option value='internet' ${sortBy === 'internet' ? 'selected' : ''}> Internet </option>
            <option value='air' ${sortBy === 'air' ? 'selected' : ''}> Air Quality </option>
            <option value='food' ${sortBy === 'food' ? 'selected' : ''}> food </option>
          </select>

        </div>
        <div class='search'>
          <input type='text' placeholder='Search' id='search' autocomplete='off' value=${searchWord} >
        </div>
      </div>`;
    }

    return tmp;
  };
  this.render = () => {
    this.$target.innerHTML = this.template();
    if (!this.state.currentPage.includes('/city/')) {
      document.getElementById('sortList').addEventListener('change', event => {
        this.handleSortChange(event.target.value);
      });
      const $searchInput = document.getElementById('search');
      $searchInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          this.handleSearch($searchInput.value);
        }
      });
    }
  };
  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render();
}
