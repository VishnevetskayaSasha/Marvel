import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';

import './charList.scss';

class CharList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            charList: [],
            loading: true, // для первичной загрузки карточек
            error: false,
            newItemLoading: false, // для загрузки новых карточек 
            offset: 210,
            charEnded: false // определеяем конец списка карточек
        }
    
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest() // первый запрос на сервер, когда компонент отрендерился (2)
        // без аргумента = будет использовано значение поймолчанию (210 - отступ)
    }

    onRequest = (offset) => { // запрос на сервер (1)
        this.onCharListLoading(); // при первичной загрузке не имеет смысла, но при клике на кнопку "Загрузить еще" будет блочить кнопку (3)
        this.marvelService
            .getAllCharacters(offset) // получаем элементы с сервера (4)
            .then(this.onCharListLoaded) // запускается onCharListLoaded (5)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => { // получает в себя новые карточки (6)
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({ // через колбек функцию т.к. нам важно предыдущее значения стейта 
            // возвращаем объект с объедененными данными (7)
            charList: [...charList, ...newCharList], // charList - уже имеющиеся карточки, newCharList - новые карточки
            // при первом запуске charList - пустой массив
            loading: false,
            newItemLoading: false,
            offset: offset + 9, // после успешного запроса на сервер будет увеличивать отступ на 9 (9 новых карточек)
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    
    render() {
        
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <RenderItems arr = {charList} props = {this.props}/> : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled = {newItemLoading}
                    style={{"display": charEnded ? "none" : "block"}} // убираем кнопку, когда карточки заканчиваются
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

//простой рендерящий компонент (в нем нет никкакой логики, только рендер куска кода)
const RenderItems = ({arr, props}) => {

    const itemRefs = [];

    const setRef = (ref) => {
        itemRefs.push(ref);
    }

    const focusOnItem = (id) => {
        itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs[id].classList.add('char__item_selected');
        itemRefs[id].focus();
    }

    const items = arr.map((item, i) => {
        let imgStyle;
        if (item.thumbnail.includes("image_not_available")) {imgStyle = {'objectFit' : 'unset'}}
        return (
            <li className="char__item" 
                key={item.id} 
                tabIndex={0}
                ref={setRef}
                onClick={() => {
                    props.onCharSelected(item.id);
                    focusOnItem(i)
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
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