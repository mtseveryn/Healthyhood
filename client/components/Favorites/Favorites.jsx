import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavorites } from '../../store/entities/favoritesEntity';
import CardsContainer from './CardsContainer';
import './Favorites.css';

const Favorites = () => {
  // const userId = useSelector((state) => state.users.user.id);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getFavorites(userId));
  // }, []);

  return (
    <div className="favorites__mainContainer">
      <div className="favorites__headingContainer" />
      <CardsContainer />
    </div>
  );
};

export default Favorites;
