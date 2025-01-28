import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import AppBanner from "../appBanner/AppBanner"

const SinglePage  = ({Component, dataType}) => {
  // const smth = useParams();
  // console.log(smth)

  const {id} = useParams()
  const [data, setData] = useState(null) // объект с данными 
  const {loading, error, getComic, getCharacterById, clearError} =  useMarvelService();
  useEffect(() => {
    updateData();
  }, [id])

  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'comic':
        getComic(id).then(onDataLoaded);
        break;
      case 'character':
        getCharacterById(id).then(onDataLoaded);
    }
  }

  const onDataLoaded = (data) => {
    setData(data);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !data) ? <Component data = {data}/> : null;
    

  return (
    <>
      <AppBanner/>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

export default SinglePage;