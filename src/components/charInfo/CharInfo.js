import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';



const CharInfo = (props) => {
    
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])


    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        oncharLoading();

        marvelService
            .getCharacterById(charId)
            .then(onCharLoaded)
            .catch(onError)

            // для теста предохранителя
            // this.foo.bar = 0;
    }

    const onCharLoaded = (char) => {
        setLoading(false);
        setChar(char);
    }

    const oncharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false)
    }

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

CharInfo.propTypes = {
    charId: PropTypes.string
}
export default CharInfo;