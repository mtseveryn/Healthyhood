import { createAction, createReducer } from '@reduxjs/toolkit';
import * as apiActions from './apiActions';

/*
On successful favorites request, server should return an array
of favorite seach objects with the following schema:
{
  _id
  healthScore
  yelpResult: {totalRestaurants, totalGyms}
  walkScore
  iqAirScore
}
*/

const initialState = {
  currentSearch: {
    _id: '',
    title: '',
    healthScore: '',
    yelpResult: {},
    walkScore: '',
    iqAirScore: '',
    lat: '',
    lng: '',
    userid: '',
  },

  favoriteSearches: {},
  favoriteSearchIds: [],
  loading: false,
  lastLoad: null,
  titleDisplay: false,
};

/*--------------
  Action Types
----------------*/
const FAVORITES_REQUESTED = 'favoritesRequested';
const FAVORITES_REQUEST_FAILED = 'favoritesRequestFailed';
const FAVORITES_RECEIVED = 'favoritesReceived';
const SEARCH_SAVED = 'searchSaved';
const UPDATE_CURRENT_SEARCH = 'updateCurrentSearch';
const UPDATE_TITLE_DISPLAY = 'updateTitleDisplay';

/*--------------
  Action Creators
----------------*/
export const favoritesRequest = createAction(FAVORITES_REQUESTED); // no payload
export const favoritesRequestFailed = createAction(FAVORITES_REQUEST_FAILED); // no payload
export const favoritesReceived = createAction(FAVORITES_RECEIVED); // array of favorites objects
export const searchSaved = createAction(SEARCH_SAVED); // favoriteObj
export const updateCurrentSearch = createAction(UPDATE_CURRENT_SEARCH); // favoriteObj
export const updateTitleDisplay = createAction(UPDATE_TITLE_DISPLAY);

/*--------------
  Reducer
----------------*/
const favoritesReducer = createReducer(initialState, {
  [FAVORITES_REQUESTED]: favoritesRequestCase,
  [FAVORITES_REQUEST_FAILED]: favoritesRequestFailedCase,
  [FAVORITES_RECEIVED]: favoritesReceivedCase,
  [SEARCH_SAVED]: searchSavedCase,
  [UPDATE_CURRENT_SEARCH]: updateCurrentSearchCase,
  [UPDATE_TITLE_DISPLAY]: updateTitleDisplayCase,
});

/*--------------
  Reducer Cases
----------------*/
function favoritesRequestCase(state, action) {
  state.loading = true;
}

function favoritesRequestFailedCase(state, action) {
  state.loading = false;
  state.titleDisplay = false;
}

function favoritesReceivedCase(state, action) {
  const favorites = action.payload.data;
  console.log('faves', favorites);
  favorites.forEach((faveSearch) => {
    state.favoriteSearchIds.push(faveSearch._id);
    state.favoriteSearches[faveSearch._id] = faveSearch;
  });
  state.loading = false;
}

function searchSavedCase(state, action) {
  const faveSearch = action.payload.data;
  console.log('faveSearch', faveSearch);
  state.favoriteSearches[faveSearch._id] = faveSearch;
  state.favoriteSearchIds.push(faveSearch._id);
  state.titleDisplay = false;
}

function updateCurrentSearchCase(state, action) {
  const currentSearch = action.payload;
  state.currentSearch = currentSearch;
}

function updateTitleDisplayCase(state, action) {
  state.titleDisplay = !state.titleDisplay;
}

export default favoritesReducer;

/*------------------
  Action Generators
--------------------*/
const { apiCallRequested } = apiActions;
const favoritesUrl = 'user/favorites';

// Returns function that, when called creates an API action object with the following payload
// This is set up to take a user ID and send it to the backend as a param
export const getFavorites = (userId) =>
  apiCallRequested({
    url: `${favoritesUrl}/${userId}`,
    method: 'get',
    data: '',
    onStart: FAVORITES_REQUESTED,
    onSuccess: FAVORITES_RECEIVED,
    onError: FAVORITES_REQUEST_FAILED,
  });

export const saveFavorite = (faveObj) =>
  apiCallRequested({
    url: favoritesUrl,
    method: 'post',
    data: faveObj,
    onStart: FAVORITES_REQUESTED,
    onSuccess: SEARCH_SAVED,
    onError: FAVORITES_REQUEST_FAILED,
  });
