// BASE SETUP
// ==============================================

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser')

const os = require('os');

fs.writeFileSync(os.tmpdir() + '/playlists.json', fs.readFileSync(__dirname + '/playlists.json'));

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true)
  },
  credentials: true
}))

// ROUTES
// ==============================================


// bodyparser only works when content-type is application/json
app.use(bodyParser.json());


//express runs this function whenever there's a request (XHR request)
// we ROUTE the request to /playlists
app.get('/playlists', (req, res) => {

  // we read the file as a string
  const data = fs.readFileSync(os.tmpdir() + '/playlists.json')

  // we RECEIVE THE RESPONSE of the request - a stringed JSON file
  res.send(data)

  // res.sendFile( os.tmpdir() + '/playlists.json');
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
});

// applying express "listeners" to POST methods from XHR, which updates our data(playlists) with new song
// (the example that was shown in class)

app.post('/add-new-playlist', (req, res) => {

  // in order to make changes we first need to read the JSON file:
  const data = fs.readFileSync(os.tmpdir() + '/playlists.json');

  // we then PARSE it, in order to make it an object
  const playlists = JSON.parse(data);

  //now that its an object, we can push it to playlists
  playlists.push(req.body);

  // now we write it back to playlists.json
  fs.writeFileSync(os.tmpdir() + '/playlists.json', JSON.stringify(playlists));

  //and send
  res.send('OK');
});

app.post('/edit-title', (req, res) => {
  // shorthand:
  const playlists = JSON.parse(fs.readFileSync(os.tmpdir() + '/playlists.json'));

  const reqBody = req.body;
  for (const playlist of playlists) {
    if (playlist.id === reqBody.playlistId) {
      playlist.title = reqBody.value;
    }
  }
  fs.writeFileSync(os.tmpdir() + '/playlists.json', JSON.stringify(playlists));
  res.send('OK');

});

app.post('/update-songs-in-playlists', (req, res) => {
  // shorthand:
  const playlists = JSON.parse(fs.readFileSync(os.tmpdir() + '/playlists.json'));

  const reqBody = req.body;
  if (reqBody.isChecked === true) {
    for (const playlist of playlists) {
      if (playlist.id == reqBody.listID) {
        playlist.songs.push(reqBody.song);
      }
    }
  }
  if (reqBody.isChecked === false) {
    for (const playlist of playlists) {
      if (playlist.id == reqBody.listID) {
        let songIndex = playlist.songs.findIndex((song) => song.id === reqBody.song.id);
        playlist.songs.splice(songIndex, 1);
      }
    }
  }

  fs.writeFileSync(os.tmpdir() + '/playlists.json', JSON.stringify(playlists));
  res.send('OK');

});

app.post('/delete-list', (req, res) => {
  // shorthand:
  const playlists = JSON.parse(fs.readFileSync(os.tmpdir() + '/playlists.json'));
  const reqBody = req.body;

  playlists.splice(reqBody.indexOfList, 1);
  fs.writeFileSync(os.tmpdir() + '/playlists.json', JSON.stringify(playlists));
  res.send('OK');
});

app.post('/add-new-playlist-with-song', (req, res) => {
  // shorthand:
  const playlists = JSON.parse(fs.readFileSync(os.tmpdir() + '/playlists.json'));
  const reqBody = req.body;
  playlists.push(reqBody);

  fs.writeFileSync(os.tmpdir() + '/playlists.json', JSON.stringify(playlists));
  res.send('OK');
});

const path = require('path');
app.get('/app.js', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/app.js')));
app.use('/_', express.static(path.resolve(__dirname, '../dist/_')));
app.get('/**', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
