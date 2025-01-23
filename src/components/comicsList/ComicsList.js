import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './comicsList.scss';

const ComicsList = () => {

  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading]  = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const {loading, error, getAllComics} =  useMarvelService();

  useEffect(() => { 
        onRequest(offset, true);
    }, []) 

    
  const onRequest = (offset, initial) => { // запрос на сервер (1)
      initial ? setNewItemLoading(false) : setNewItemLoading(true); 
      getAllComics(offset) // получаем элементы с сервера (4)
          .then(onComicsListLoaded) // запускается onComicsListLoaded (5)
  }

  const onComicsListLoaded = (newComicsList) => { // получает в себя новые карточки (6)
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }

    // используем колбек функцию т.к. нам важно предыдущее значения стейта 
    setComicsList(comicsList => [...comicsList, ...newComicsList]); // comicsList - уже имеющиеся карточки, newComicsList - новые карточки
    // при первом запуске comicsList - пустой массив
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 8); // после успешного запроса на сервер будет увеличивать отступ на 8 (9 новых карточек)
    setComicsEnded(charEnded => ended)
  }

  function renderItems (arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      )
    })

    return (
      <ul className="comics__grid">
        {items}
      </ul>
    )
  }

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemLoading ? <Spinner/> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button 
        disabled={newItemLoading} 
        style={{'display' : comicsEnded ? 'none' : 'block'}}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList;