import { useState } from "react"
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import useMarvelService from "../../services/MarvelService";
import  ErrorMessage  from "../errorMessage/errorMessage";

import "./searchForm.scss" 

const SearchForm = () => {

  const [char, setChar] = useState(null);
  const {loading, error, getCharacterByName, clearError, process, setProcess} = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const updateChar = (name) => {
    clearError();

    getCharacterByName(name)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'));

  }

  const errorMessage = process === "error" ? <div className="form__critical-error"><ErrorMessage /></div> : null;
  const result = !char ? null : char.length > 0 ?
                <div className="form__wrapper">
                  <div className="form__success">There is! Visit {char[0].name} page?</div>
                    <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                        <div className="inner">To page</div>
                    </Link>
                  </div> : 
                <div className="form__error">
                  The character was not found. Check the name and try again
                </div>;

  return (
    <div className="form">
      <Formik
        initialValues = {{
          charName: ''
        }}
        validationSchema = {Yup.object({
          charName: Yup.string().required('This field is required')
        })}
        onSubmit = { ({charName}) => {
          updateChar(charName);
        }}
        >
        <Form onChange={e => !e.target.value ? setChar(null) : null}>
          <label className="form__select">Or find a character by name: </label>
          <div className="form__search-block">
            <Field 
              className="form__input" 
              id="charName" 
              name="charName"
              type="text" 
              placeholder="Enter name. For example, Thor"/>
            <button
              className="button button__main"
              type="submit" 
              disabled={loading}>
                <div className="inner">Find</div>
            </button>
          </div>
          <FormikErrorMessage component="div" className="form__error" name="charName" />
        </Form>
      </Formik>
      {result}
      {errorMessage}
    </div>
  )
}

export default SearchForm