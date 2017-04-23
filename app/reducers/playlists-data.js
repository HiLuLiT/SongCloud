import uuid from 'uuid';

// const dummyData = [
//   {
//     id: uuid(),
//     title: 'My 1st Playlist',
//     songs: [
//       {
//         id: 250711755,
//         title: "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
//         duration: 219082,
//         stream_url: "https://api.soundcloud.com/tracks/250711755/stream",
//         uri: "https://api.soundcloud.com/tracks/250711755",
//         artwork_url: "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
//       }]
//   },
//   {
//     id: uuid(),
//     title: 'My 2nd Playlist',
//     songs: [
//       {
//         "id": 250711755,
//         "title": "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
//         "duration": 219082,
//         "stream_url": "https://api.soundcloud.com/tracks/250711755/stream",
//         "uri": "https://api.soundcloud.com/tracks/250711755",
//         "artwork_url": "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
//       }]
//   },
//   {
//     id: uuid(),
//     title: 'My 3rd Playlist',
//     songs: [
//       {
//         "id": 250711755,
//         "title": "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
//         "duration": 219082,
//         "stream_url": "https://api.soundcloud.com/tracks/250711755/stream",
//         "uri": "https://api.soundcloud.com/tracks/250711755",
//         "artwork_url": "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
//       }]
//   },
// ];

export default function playlistsDataReducer(playlists = [], action) {
  let copyofPlayLists = [...playlists];


  if (action.type === 'SET_PLAYLIST_DATA') {
    copyofPlayLists = action.firstdata;
    return copyofPlayLists;
  }


  if (action.type === 'EDIT_PLAYLIST_TITLE') {
    for (const playlist of copyofPlayLists) {
      if (playlist.id === action.playlistId) {
        playlist.title = action.newTitle;
        return copyofPlayLists
      }
    }
  }

  if (action.type === 'ADD_NEW_PLAYLIST') {
    console.info();
    copyofPlayLists.push(action.newPlaylistData);
    return copyofPlayLists;
  }

  if (action.type === 'UPDATE_SONGS_IN_PLAYLIST') {
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
    copyofPlayLists.splice(action.indexOfList, 1);
    return copyofPlayLists;
  }

  return playlists;
}
