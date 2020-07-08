import React from 'react';
import Joi from '@hapi/joi';
import { useSelector, useDispatch } from 'react-redux';
import { saveFavorite } from '../../store/entities/favoritesEntity';
import Form from '../common/Form';
import FormInput from '../common/FormInput';
import FormButton from '../common/FormButton';

const TitleForm = () => {
  const faves = useSelector((state) => state.favorites);
  const { currentSearch, titleDisplay } = faves;
  const dispatch = useDispatch();

  const initialState = {
    title: '',
  };

  const schema = { title: Joi.string().min(3).max(55) };
  const joiSchema = Joi.object(schema);

  const doSubmit = async (data) => {
    const newFavoriteSearch = { ...currentSearch, title: data.title };
    try {
      const savedSearch = await dispatch(saveFavorite(newFavoriteSearch));
      console.log('savedSearch', savedSearch);
    } catch (e) {
      alert('Search did not save, try again!');
    }
  };

  return (
    <div className="favorites__titleFormContainer">
      <Form
        propertySchemaObj={schema}
        formSchema={joiSchema}
        initialState={initialState}
        doSubmit={doSubmit}
        checkErrorsOnSubmitOnly={false}
      >
        <FormInput name="title" label="Title Your Search:" />
        <FormButton label="Submit" />
      </Form>
    </div>
  );
};

export default TitleForm;
