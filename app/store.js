import { createStore, combineReducers } from 'redux';

import currentTrackReducer from './reducers/current-track.js'

const reducer = combineReducers({
  currentTrack: currentTrackReducer,
});

const store = createStore(reducer);
export default store;
