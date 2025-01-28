import { useHttp } from "../hooks/http.hook"

const  useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "33384c6e2d8e0b1c9d6271fd34b346ba"; // из личного кабинета 
  const _baseOffset = 210;

  

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);  // сюда попадают все данные из ответа сервера
    // res.data.results -- сюда попадает массив с объектами всей информации о персонажах
    return res.data.results.map(_transformCharacter) // проходим по этому массиву через map и трансформируем каждый элемент (персонажа) через _transformCharacter
  }

  const getCharacterById = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`); // все данные из ответа сервера
    // res.data.results[0] --  все данные о персонаже с сервера
    return _transformCharacter(res.data.results[0]) // только нужные нам данные (трансформируются через _transformCharacter) 
  }

  const getAllComics = async (offset = 0) => {
		const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${_apiKey}`);
		return res.data.results.map(_transformComics);
	};

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const _transformCharacter = (char) => {
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

  const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

  return {loading, error, getAllCharacters, getCharacterById, clearError, getAllComics, getComic, getCharacterByName}
}

export default useMarvelService;