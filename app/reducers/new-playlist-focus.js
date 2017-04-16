export default function playlistFocusReducer(isNewPlaylist = false, action) {
  if (action.type === 'IS_NEW_LIST') {
    return action.isNewPlaylist

  }

  return isNewPlaylist;
}
