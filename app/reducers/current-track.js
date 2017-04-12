export default function currentTrackReducer(currentTrack = null, action) {
  if (action.type === 'UPDATE_CURRENT_TRACK') {
    console.info('action.song', action.song);
    return action.song;

  }

  return currentTrack;
}
