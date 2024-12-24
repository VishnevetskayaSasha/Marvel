import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';

import './charList.scss';

class CharList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            charList: [],
            loading: true,
            error: false
        }
    
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.getCharList()
    }

    onCharListLoaded = (charList) => {
        this.setState({charList, loading: false})
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    getCharList = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    

    render() {
        
        const {charList, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <RenderItems arr = {charList} props = {this.props}/> : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

//простой рендерящий компонент (в нем нет никкакой логики, только рендер куска кода)
const RenderItems = ({arr, props}) => {
    const items = arr.map((item) => {
        let imgStyle;
        if (item.thumbnail.includes("image_not_available")) {imgStyle = {'objectFit' : 'unset'}}
        return (
            <li className="char__item" key={item.id} 
                onClick={() => props.onCharSelected(item.id)}> 
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

export default CharList;