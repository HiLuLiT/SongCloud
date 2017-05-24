export default function playlistsDataReducer(playlists = [], action) {



  if (action.type === 'SET_PLAYLIST_DATA') {
    let playlists = action.firstdata;
    return playlists;
  }


  if (action.type === 'EDIT_PLAYLIST_TITLE') {
    let copyofPlayLists = [...playlists];
    for (const playlist of copyofPlayLists) {
      if (playlist.id === action.playlistId) {
        playlist.title = action.newTitle;
        return copyofPlayLists
      }
    }
  }

  if (action.type === 'ADD_NEW_PLAYLIST') {
    let copyofPlayLists = [...playlists];
    copyofPlayLists.push(action.newPlaylistData);
    return copyofPlayLists;
  }

  if (action.type === 'UPDATE_SONGS_IN_PLAYLIST') {
    let copyofPlayLists = [...playlists];
    if (action.isChecked === true) {
      for (const playlist of copyofPlayLists) {
        if (playlist.id == action.playlistID) {
          playlist.songs.push(action.song);
          return copyofPlayLists;
        }
      }
    }
    if (action.isChecked === false) {
      for (const playlist of copyofPlayLists) {
        if (playlist.id == action.playlistID) {
          let songIndex = playlist.songs.findIndex((song) => song.id === action.song.id);
          playlist.songs.splice(songIndex, 1);
          return copyofPlayLists;
        }

      }
    }
  }

  if (action.type === 'DELETE_PLAYLIST') {
    let copyofPlayLists = [...playlists];
    copyofPlayLists.splice(action.indexOfList, 1);
    return copyofPlayLists;
  }

  return playlists;
}
