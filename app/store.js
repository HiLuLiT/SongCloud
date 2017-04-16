import { createStore, combineReducers } from 'redux';

import currentTrackReducer from './reducers/current-track.js'
import playlistsDataReducer from './reducers/playlists-data'
import playlistFocusReducer from './reducers/new-playlist-focus'

const reducer = combineReducers({
  currentTrack: currentTrackReducer,
  isNewPlaylist: playlistFocusReducer,
  playlists: playlistsDataReducer
});

const store = createStore(reducer);
export default store;
