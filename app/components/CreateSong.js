
export default function CreateSong(props) {
  return (
    <li key={song.id}>
      <div className="song-img"
           style={{'backgroundImage': `url(${imgURL})`}}
           onClick={ ()=> props.updateCurrentTrack(song)}>
      </div>
      <span className="span-song-name">{songName}</span>
      <div>
        <i className="fa fa-clock-o clock-font" aria-hidden="true"></i>
        <span className="span-song-duration">{songDuration}</span>
        <i className="fa fa-heart-o heart-font" aria-hidden="true"></i>
      </div>
    </li>
  )
}
