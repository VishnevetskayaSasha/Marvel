class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/"
  _apiKey = "33384c6e2d8e0b1c9d6271fd34b346ba" // из личного кабинета 

  getResourse = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error (`Could not frtch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = () => {
    return this.getResourse(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`);
  }

  getCharacterById = (id) => {
    return this.getResourse(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
  }
  
}

export default MarvelService;