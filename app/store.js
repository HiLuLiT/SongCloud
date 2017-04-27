import {createStore, combineReducers} from 'redux';

import currentTrackReducer from './reducers/current-track.js'
import playlistsDataReducer from './reducers/playlists-data'
import playlistFocusReducer from './reducers/new-playlist-focus'
import isInPlayModeReducer from './reducers/is-in-play-mode'

const reducer = combineReducers({
  currentTrack: currentTrackReducer,
  isNewPlaylist: playlistFocusReducer,
  playlists: playlistsDataReducer,
  isInPlayMode: isInPlayModeReducer,
});

const store = createStore(reducer);

export default store;

