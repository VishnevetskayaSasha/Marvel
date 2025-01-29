import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import setContent from '../../utils/setContent';

import useMarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/spinner';
// import ErrorMessage from '../errorMessage/errorMessage';
// import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';



const CharInfo = (props) => {
    
    const [char, setChar] = useState(null);


    const {loading, error, getCharacterById, clearError, process, setProcess} =  useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])


    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        clearError()
        getCharacterById(charId)
            .then(onCharLoaded)
            .then(() => setProcess("confirmed")) // ручная установка состояния confirmed

            // для теста предохранителя
            // this.foo.bar = 0;
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }


    // const skeleton =  char || loading || error ? null : <Skeleton/>
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char = {char}/> : null;
    

    return (
        <div className="char__info">
            {/* {skeleton}
            {errorMessage}
            {spinner}
            {content} */}
            {
                setContent(process, View, char) // смотрит какое сейчас состояние процесса и рендерит нужный компонент
            }
        </div>
    )
    
    
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
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
                                <Link to={`/comics/${item.resourceURI.split('/').pop()}`} >
                                    {item.name}
                                </Link>
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