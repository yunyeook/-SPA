const API_URL = 'https://trip-wiki-api.vercel.app/';

//url주소 : https://trip-wiki-api.vercel.app/지역이름?start=시작인덱스&sort=정렬기준&search=검색어
export const request = async (startIndex, region, sortBy, searchWord) => {
  try {
    let url = `${API_URL}`;
    if (region && region !== 'All') {
      url += `${region}?start=${startIndex}`;
    } else {
      url += `?start=${startIndex}`;
    }
    if (sortBy) {
      url += `&sort=${sortBy}`;
    }
    if (searchWord) {
      url += `&search=${searchWord}`;
    }

    //api호출하기
    const response = await fetch(url);
    if (response) {
      let data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const requestCityDetail = async cityId => {
  try {
    const response = await fetch(`${API_URL}city/${cityId}`);
    if (response) {
      let data = await response.json(); //data = json형태의 데이터를 가진 객체
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
