import { Link } from "react-router-dom";

import "./singleCharacterLayout.scss" 

const SingleCharacterLayout = ({data}) => {
  const {title, description, thumbnail} = data;

  return (
    <div className="single-char">
      <img src={thumbnail} alt={title} className="single-char__img"/>
      <div className="single-char__info">
        <h2 className="single-char__name">{title}</h2>
        <p className="single-char__descr">{description}</p>
      </div>
      <Link to="/" className="single-char__back">Back to all</Link>
    </div>
  )
}

export default SingleCharacterLayout;