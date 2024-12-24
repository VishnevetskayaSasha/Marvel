import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';



class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    updateChar = () => {
        const {charId} = this.props;

        if (!charId) {
            return;
        }

        this.oncharLoading();

        this.marvelService
            .getCharacterById(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)

            // для теста предохранителя
            // this.foo.bar = 0;
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    oncharLoading = () => {
        this.setState({loading: true})
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton =  char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char = {char}/> : null;
        

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    const comicsNew = comics.length > 10  ? comics.slice(0, 10) : comics 

    let imgStyle;
     if (thumbnail.includes("image_not_available")) {imgStyle = {'objectFit' : 'unset'}}
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comicsNew.length > 0 ?
                    comicsNew.map((item, i) => {
                        return (
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        )
                    }) : `There is no comics with ${name}`
                }
                
            </ul>
        </>
    )
}

export default CharInfo;