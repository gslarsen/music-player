var createSongRow = function (songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

  var handleSongClick = function () {
    var clickedSongNumber = $(this).attr('data-song-number');

    // 1. There is a song that is currently playing
    if (currentlyPlayingSongNumber !== null) {
      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');

      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }

    // 2. There is a song currently playing, but a different one was clicked to play
    if (clickedSongNumber !== currentlyPlayingSongNumber) {
      currentlyPlayingSongNumber = clickedSongNumber;
      setSong(songNumber);
      currentSoundFile.play();
      $(this).html(pauseButtonTemplate);

  // 3. The currently playing song was clicked
    } else {
      currentlyPlayingSongNumber = null;
      $(this).html(clickedSongNumber);
    }

};

var onHover = function () {
  var songItem = $(this).find('.song-item-number');
  var songNumber = songItem.attr('data-song-number');

  // if the song being hovered over isn't the one being played
  if (songNumber !== currentlyPlayingSongNumber) {
    // show the play button
    songItem.html(playButtonTemplate);
  }
};

var offHover = function () {
  var songItem = $(this).find('.song-item-number');
  var songNumber = songItem.attr('data-song-number');

  // if the song being hovered over isn't the one being played
  if (songNumber !== currentlyPlayingSongNumber) {
    // revert back to just showing the song number
    songItem.html(songNumber);
  }
};

var $row = $(template);

$row.find('.song-item-number').click(handleSongClick);
$row.hover(onHover, offHover);

return $row;
};

var setCurrentAlbum = function (album) {
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();

  for (var i = 0; i < album.songs.length; i++) {
    var $songRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($songRow);
  }
};

var currentlyPlayingSongNumber = null;
let currentSoundFile = null;
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

setCurrentAlbum(albums[0]);

var setSong = function (songNumber) {
  
  console.log(songNumber);
  let url = albums[0].songs[songNumber].audioUrl;

  currentSoundFile = new buzz.sound(url, {
    formats: [ 'mp3' ],
    preload: true,
  });

  var songItem = $(this).find('.song-item-number');
  var songNumber = songItem.attr('data-song-number');
  console.log(songItem)
  console.log(songNumber)

  
  
};
