import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading]  = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    
    const {loading, error, getAllCharacters} =  useMarvelService();

    useEffect(() => { // т.к. useEffect запускается после того как компонент отрендерился, 
    // поэтому мы можем использовать функцию onRequest выше чем она объявлена 
        onRequest(offset, true);
    }, []) // пустой массив зависимостей - иммитация componentDidMount

    
    const onRequest = (offset, initial) => { // запрос на сервер (1)
        initial ? setNewItemLoading(false) : setNewItemLoading(true); 
        getAllCharacters(offset) // получаем элементы с сервера (4)
            .then(onCharListLoaded) // запускается onCharListLoaded (5)
    }

    const onCharListLoaded = (newCharList) => { // получает в себя новые карточки (6)
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        // используем колбек функцию т.к. нам важно предыдущее значения стейта 
        setCharList(charList => [...charList, ...newCharList]); // charList - уже имеющиеся карточки, newCharList - новые карточки
        // при первом запуске charList - пустой массив
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9); // после успешного запроса на сервер будет увеличивать отступ на 9 (9 новых карточек)
        setCharEnded(charEnded => ended)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    //const content = !(loading || error) ? <RenderItems arr = {charList} props = {props}/> : null;
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <RenderItems arr = {charList} props = {props}/>
            <button 
                className="button button__main button__long"
                disabled = {newItemLoading}
                style={{"display": charEnded ? "none" : "block"}} // убираем кнопку, когда карточки заканчиваются
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

//простой рендерящий компонент (в нем нет никкакой логики, только рендер куска кода)
const RenderItems = ({arr, props}) => {

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const items = arr.map((item, i) => {
        let imgStyle;
        if (item.thumbnail.includes("image_not_available")) {imgStyle = {'objectFit' : 'unset'}}
        return (
            <li className="char__item" 
                key={item.id} 
                tabIndex={0}
                ref={el => itemRefs.current[i] = el}
                onClick={() => {
                    props.onCharSelected(item.id);
                    focusOnItem(i)
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }
                }}
                > 
                <img style={imgStyle} src={item.thumbnail} alt={item.name} />
                <div className="char__name">{item.name}</div>
            </li>
        )
    })

    return (
        <ul className="char__grid">
            {items}
        </ul>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}


export default CharList;