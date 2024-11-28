const API_URL = 'https://animal-api-two.vercel.app/';

export async function request(name) {
  let resolve = await fetch(name ? `${API_URL}${name}` : API_URL);
  try {
    if (resolve) {
      let data = await resolve.json();
      return data.photos;
    }
  } catch (err) {
    console.log(err);
  }
}
