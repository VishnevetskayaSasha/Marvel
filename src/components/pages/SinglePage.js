import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/spinner';
// import ErrorMessage from '../errorMessage/errorMessage';
import AppBanner from "../appBanner/AppBanner"
import setContent from '../../utils/setContent';

const SinglePage  = ({Component, dataType}) => {
  // const smth = useParams();
  // console.log(smth)

  const {id} = useParams()
  const [data, setData] = useState(null) // объект с данными 
  const {loading, error, getComic, getCharacterById, clearError, process, setProcess} =  useMarvelService();
  useEffect(() => {
    updateData();
  }, [id])

  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'comic':
        getComic(id).then(onDataLoaded).then(() => setProcess("confirmed")) ;
        break;
      case 'character':
        getCharacterById(id).then(onDataLoaded).then(() => setProcess("confirmed")) ;
    }
  }

  const onDataLoaded = (data) => {
    setData(data);
  }

  // const errorMessage = error ? <ErrorMessage/> : null;
  // const spinner = loading ? <Spinner/> : null;
  // const content = !(loading || error || !data) ? <Component data = {data}/> : null;
    

  return (
    <>
      <AppBanner/>
      {/* {errorMessage}
      {spinner}
      {content} */}
      {
        setContent(process, Component, data)
      }
    </>
  )
}

export default SinglePage;