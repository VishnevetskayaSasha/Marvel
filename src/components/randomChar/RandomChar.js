import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner'
import ErrorMessage from '../errorMessage/errorMessage';
import setContent from '../../utils/setContent';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = () => {

    const [char, setChar] = useState([]);
    const {loading, error, getCharacterById, clearError, process, setProcess} =  useMarvelService();

    useEffect(() => {
        updateChar()
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacterById(id)
            .then(onCharLoaded)
            .then(() => setProcess("confirmed")) 
    }
    
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error) ? <View char = {char}/> : null;

    return (
        <div className="randomchar">
            {/* {errorMessage}
            {spinner}
            {content} */}
            {
                setContent(process, View, char)
            }
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    
}

// простой рендерящий компонент (в нем нет никкакой логики, только рендер куска кода)
const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" 
                // className={thumbnail.includes("image_not_available") ? "randomchar__img randomchar__img_not-available" : "randomchar__img"}
                className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div data-tooltip="Страницы Homepage и Wiki пока не работают. Проблемы с данными у API Marvel Comics. Ждем, когда починят" className="randomchar__btns">
                    <a target="_blank" rel="noopener noreferrer" href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}



export default RandomChar;