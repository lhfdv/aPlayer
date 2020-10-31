let fillbar = document.querySelector(".fill");
let audios = ["Audio.mp3", "Audio2.mp3", "Audio3.mp3"];
let covers = ["Cover1.png", "Cover2.png", "Cover3.png"];
let currentTime = document.querySelector(".time");
let audio = new Audio();
let currentSong = 0;
let currentCover = 0;

window.onload = playSong;

function changeCover(){
    covers.src = covers[currentCover];
}

function playSong(){
    audio.src = audios[currentSong];
    audio.play();
}

function togglePlayPause(){
    if(audio.paused){
        audio.play();
        let playBtn = document.querySelector(".play-pause");
        playBtn.innerHTML = '<i class="fa fa-pause"></i>';
        playBtn.style.paddingLeft = "30px";
    } else{
        audio.pause();
        playBtn = document.querySelector(".play-pause");
        playBtn.innerHTML = '<i class="fa fa-play"></i>';
        playBtn.style.paddingLeft = "30px";
    }
}

audio.addEventListener("timeupdate", function() {
    let position = audio.currentTime / audio.duration;
    fillbar.style.width = position * 100 + "%";
    convertTime(Math.round(audio.currentTime));
    if (audio.ended) {
      nextAudio();
    }
  });
  
  function convertTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    currentTime.textContent = min + ":" + sec;
    totalTime(Math.round(audio.duration));
  }
  
  function totalTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    currentTime.textContent += " & " + min + ":" + sec;
  }

  function nextAudio() {
    currentSong++;
    if (currentSong > 2) {
      currentSong = 0;
    }
    playSong();
    playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    playBtn.style.paddingLeft = "30px";
    $(".img img").attr("src", covers[currentSong]);
  }
  
  function prevAudio() {
    currentSong--;
    if (currentSong < 0) {
      currentSong = 2;
    }
    playSong();
    playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    playBtn.style.paddingLeft = "30px";
    $(".img img").attr("src", covers[currentSong]);
  }

  function decreaseVolume() {
    audio.volume -= 0.25;
  }
  
  function increaseVolume() {
    audio.volume += 0.25;
  }
  
  let volumeUp = document.querySelector(".volume-up");
  volumeUp.addEventListener("click", function() {
    if (audio.volume === 1) {
      audio.volume = 0;
      document.querySelector(".volume-up i").className = "fa fa-volume-mute";
    } else {
      audio.volume = 1;
      document.querySelector(".volume-up i").className = "fa fa-volume-up";
    }
  });