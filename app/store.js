import { createStore, combineReducers } from 'redux';

import currentTrackReducer from './reducers/current-track.js'
import playlistsDataReducer from './reducers/playlists-data'

const reducer = combineReducers({
  currentTrack: currentTrackReducer,
  playlists: playlistsDataReducer,
});

const store = createStore(reducer);
export default store;
