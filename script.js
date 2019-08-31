var player = document.querySelector('.player');
var video = player.querySelector('.video');
var play_pause_button = player.querySelector('#play-pause-button');
var fullscreen_windowed_button = player.querySelector('#fullscreen-windowed-button');
var play_button = play_pause_button.querySelector('#togglePlay-image');
var pause_button = play_pause_button.querySelector('#togglePause-image');
var expand_button = fullscreen_windowed_button.querySelector('#expand-arrows-image');
var minimize_button = fullscreen_windowed_button.querySelector('#minimize-arrows-image');
var progressbar_filled = player.querySelector('.progressbar-filled');

function togglePlayPause() //function play/pause video
{
    var togglePlayPause = video.paused ? 'play' : 'pause';
    video[togglePlayPause]();
}

function toggleFullscreenWindowed() //function deployment/cancel fullscreen
{
  var toggleFullscreenWindowed = video.fullscreenchange ? (expand_button.style.display = 'block', minimize_button.style.display = 'none', video.exitFullScreen()) : (expand_button.style.display = 'none', minimize_button.style.display = 'block', video.requestFullscreen());
}

function togglePlayPauseUpdate() //function button image change play/pause
{
  var image = this.paused ? (pause_button.style.display = 'none',play_button.style.display = 'block') : (play_button.style.display = 'none', pause_button.style.display = 'block');

  // play_pause_button.innerhtml = image;
  // play_pause_button.textContent = image;
}

function updateProgressbar() //function update progressbar video
{
  var  percentProgressbar = (video.currentTime / video.duration) * 100;
  progressbar_filled.style.width = percentProgressbar + "%";
}

video.addEventListener('click', togglePlayPause); //onclick on a video
video.addEventListener('play', togglePlayPauseUpdate); //if video playing
video.addEventListener('pause', togglePlayPauseUpdate); //if video paused
play_pause_button.addEventListener('click', togglePlayPause); //onclick on a button play/pause
fullscreen_windowed_button.addEventListener('click', toggleFullscreenWindowed); //onclick on a button fullscreen/windowed
video.addEventListener('timeupdate', updateProgressbar); //if time video update(currentTime)
