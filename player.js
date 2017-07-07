window.addEventListener('load',function(){
  video = document.getElementById('video');

  pbarcontainer = document.getElementById('pbar-container');
  pbar = document.getElementById('pbar');
  playbutton = document.getElementById('play-button');

  timefield = document.getElementById('time-field');
  soundButton = document.getElementById('sound-button');

  sbarContainer = document.getElementById('sbar-container');
  sbar = document.getElementById('sbar');
  fullscreenButton= document.getElementById('fullscreen-button');
  screenButton= document.getElementById('screen-button');
  pauseScreen = document.getElementById('screen');

  video.load();

video.addEventListener('canplay',function(){
  playbutton.addEventListener('click',playOrPause,false);
  pbarcontainer.addEventListener('click',skip,false);
  updatePlayer();
  soundButton.addEventListener('click',muteOrUnmute,false);
  sbarContainer.addEventListener('click',changeVolume,false);
  fullscreenButton.addEventListener('click',fullScreen,false);
  screenButton.addEventListener('click',playOrPause,false);
}, false);


},false);

function playOrPause(){
  if(video.paused){
    video.play();
    playbutton.src = 'images/pause.png';
    update = setInterval(updatePlayer,30);

    pauseScreen.style.display = 'none';
    screenButton.src = "images/pause.png";

  }else{
    video.pause();
    playbutton.src = 'images/play.png';
    window.clearInterval(update);

    pauseScreen.style.display = 'block';
    screenButton.src = "images/play.png";

  }
}

function updatePlayer(){
  var percentage = (video.currentTime/video.duration)*100;
  pbar.style.width = percentage + '%';
  timefield.innerHTML = getFormatedTime();
  if(video.ended){
    
    window.clearInterval(update);
    playbutton.src = 'images/replay.png';
    pauseScreen.style.display = 'block';
    screenButton.src = "images/replay.png";

  }else if (video.paused){
    playbutton.src = 'images/play.png';
    screenButton.src = "images/play.png";
  }

}


function skip(ev){
  var mouseX = ev.pageX - pbarcontainer.offsetLeft;
  var width = window.getComputedStyle(pbarcontainer).getPropertyValue('width');
  width = parseFloat(width.substr(0,width.length - 2));

  video.currentTime = (mouseX/width) * video.duration;
  updatePlayer();
  //alert(width);
}


function getFormatedTime(){
  var seconds = Math.round(video.currentTime);
  var minutes = Math.floor(seconds/60);
  if(minutes> 0) seconds -= minutes*60;
  if(seconds.toString().length === 1) seconds = '0' + seconds;

  var totalSeconds = Math.round(video.duration);
  var totalMinutes = Math.floor(totalSeconds/60);
  if(totalMinutes> 0) totalSeconds -= totalMinutes*60;
  if(totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;


  return minutes + ':' + seconds + '/ ' + totalMinutes + ':' + totalSeconds;

}


function muteOrUnmute(){
  if(!video.muted){
      video.muted = true;
      soundButton.src = 'images/mute.png';
      sbar.style.display = 'none';

  }else{
    video.muted = false;
    soundButton.src = 'images/sound.png';
    sbar.style.display = 'block';
  }
}


function changeVolume(ev){
  var mouseX = ev.pageX - sbarContainer.offsetLeft;
  var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
  width = parseFloat(width.substr(0,width.length - 2));

  video.volume = (mouseX/width);
  sbar.style.width = (mouseX/width) *100 + '%';
  video.muted = false;
  soundButton.src = 'images/sound.png';
  sbar.style.display = 'block';

}

function fullScreen(){
  if(video.requestFullscreen){
    video.requestFullscreen();
  }else if(video.webkitRequestFullscreen){
    video.webkitRequestFullscreen();
  }else if(video.mozRequestFullscreen){
    video.mozRequestFullscreen();
  }else if(video.msRequestFullscreen){
    video.msRequestFullscreen();
  }


}
