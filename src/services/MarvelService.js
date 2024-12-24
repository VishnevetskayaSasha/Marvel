class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/"
  _apiKey = "33384c6e2d8e0b1c9d6271fd34b346ba" // из личного кабинета 
  _baseOffset = 210

  getResourse = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error (`Could not frtch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`);  // сюда попадают все данные из ответа сервера
    // res.data.results -- сюда попадает массив с объектами всей информации о персонажах
    return res.data.results.map(this._transformCharacter) // проходим по этому массиву через map и трансформируем каждый элемент (персонажа) через _transformCharacter
  }

  getCharacterById = async (id) => {
    const res = await this.getResourse(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`); // все данные из ответа сервера
    // res.data.results[0] --  все данные о персонаже с сервера
    return this._transformCharacter(res.data.results[0]) // только нужные нам данные (трансформируются через _transformCharacter) 
  }

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? char.description.length > 210 ? char.description.slice(0, 210) + '...' : char.description : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }
}

export default MarvelService;