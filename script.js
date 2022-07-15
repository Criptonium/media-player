var player = document.querySelector('.player');
var video = player.querySelector('.video');
//var video_bg = document.querySelector('.video_bg'); //dell

var play_pause_button = player.querySelector('#play-pause-button');
var fullscreen_windowed_button = player.querySelector('#fullscreen-windowed-button');
var settings_button = player.querySelector('#settings-button');
var volume_button = player.querySelector('#volume-button');

var play_button_image = play_pause_button.querySelector('#togglePlay-image');
var pause_button_image = play_pause_button.querySelector('#togglePause-image');
var expand_button_image = fullscreen_windowed_button.querySelector('#expand-arrows-image');
var minimize_button_image = fullscreen_windowed_button.querySelector('#minimize-arrows-image');
var higher_volume_image = volume_button.querySelector('#higher-volume-image');
var below_volume_image = volume_button.querySelector('#below-volume-image');
var none_volume_image = volume_button.querySelector('#none-volume-image');

var progressbar_filled = player.querySelector('.progressbar-filled');

var fullScreenMode = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen; // This will return true or false depending on if it's full screen or not.

// var volume_value = video.volume;

var slider_volume = player.querySelector('.player-slider-volume');


function togglePlayPause() //function play/pause video
{
    var togglePlayPause = video.paused ? 'play' : 'pause';
    video[togglePlayPause]();
    //video_bg[togglePlayPause](); //dell
}

function toggleFullscreenWindowed() //function deployment/cancel fullscreen
{
  fullScreenMode = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
  var toggleFullscreenWindowed = (fullScreenMode) ? (expand_button_image.style.display = 'block', minimize_button_image.style.display = 'none', document.exitFullscreen()) : (expand_button_image.style.display = 'none', minimize_button_image.style.display = 'block', player.requestFullscreen());
}

function togglePlayPauseUpdate() //function button image change play/pause
{
  var image = this.paused ? (pause_button_image.style.display = 'none',play_button_image.style.display = 'block') : (play_button_image.style.display = 'none', pause_button_image.style.display = 'block');

  // play_pause_button.innerhtml = image;
  // play_pause_button.textContent = image;
}

function progressbarUpdate() //function update progressbar video
{
  var  percentProgressbar = (video.currentTime / video.duration) * 100;
  progressbar_filled.style.width = percentProgressbar + "%";
}

function toggleplaybackRate()
{
  video.playbackRate = '3';
}

function toggleVolumeMuteUnmuteUpdate()
{
  var volume_value = slider_volume.value;
  console.log(volume_value);
  // video.muted != 0 ? (volume_value == '0' ? (video.muted = 0, slider_volume.value = '0.5', volume_value = '0.5') : (video.muted = 0, slider_volume.value = volume_value)) : (video.muted = 1, slider_volume.value = 0);
  //
  video.muted == 1 ? (volume_value == '0' ? (video.muted = 0, volume_value = '0.5', video.volume = '0.5', slider_volume.value = '0.5'):(video.muted = 0, video.volume = volume_value, slider_volume.value = volume_value)):(video.muted = 1, slider_volume.value = '0');

  switch (true) {
    case (video.muted == '0'):
      higher_volume_image.style.display = 'block';
      below_volume_image.style.display = 'none';
      none_volume_image.style.display = 'none';
      break;
    case (video.muted == '1'):
      higher_volume_image.style.display = 'none';
      below_volume_image.style.display = 'none';
      none_volume_image.style.display = 'block';
      break;
  }

  // var value = volume_value;
  // alert(value);
  // var volume = video.volume == '0' ? volume_value : '0';
  // video.volume = volume;
  // slider_volume.value = volume;
}

function toggleVolumeUpdate()
{
  video[this.name] = this.value;

  switch (true) {
    case (video.volume == '0'):
      higher_volume_image.style.display = 'none';
      below_volume_image.style.display = 'none';
      none_volume_image.style.display = 'block';
      video.muted = 1;
      break;
    case (video.volume > '0' && video.volume < '0.5'):
      higher_volume_image.style.display = 'none';
      below_volume_image.style.display = 'block';
      none_volume_image.style.display = 'none';
      video.muted = 0;
      break;
    case (video.volume >= '0.5'):
      higher_volume_image.style.display = 'block';
      below_volume_image.style.display = 'none';
      none_volume_image.style.display = 'none';
      video.muted = 0;
      break;
  }
}

function detectKeypress(e) {
	if (e.keyCode == 32) {
	  togglePlayPause();
	}
  if (e.keyCode == 27) {
    // fullScreenMode = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    console.log(fullScreenMode);
    if (fullScreenMode) {
      document.exitFullscreen();
      expand_button_image.style.display = 'block';
      minimize_button_image.style.display = 'none';
    }
	}
}

video.addEventListener('click', togglePlayPause); //onclick on a video
video.addEventListener('play', togglePlayPauseUpdate); //if video playing
video.addEventListener('pause', togglePlayPauseUpdate); //if video paused
volume_button.addEventListener('click', toggleVolumeMuteUnmuteUpdate);
play_pause_button.addEventListener('click', togglePlayPause); //onclick on a button play/pause
/*button change rate*/settings_button.addEventListener('click', toggleplaybackRate); //onclick on a button playbackRate
fullscreen_windowed_button.addEventListener('click', toggleFullscreenWindowed); //onclick on a button fullscreen/windowed
video.addEventListener('timeupdate', progressbarUpdate); //if time video update(currentTime)
// video.addEventListener('timeupdate', toggleVolumeUpdate);
window.addEventListener('keydown', detectKeypress);

slider_volume.addEventListener('change', toggleVolumeUpdate);
slider_volume.addEventListener('mousemove', toggleVolumeUpdate);
