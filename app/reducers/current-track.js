export default function currentTrackReducer(currentTrack = null, action) {
  if (action.type === 'UPDATE_CURRENT_TRACK') {
    return action.song;

  }

  return currentTrack;
}
