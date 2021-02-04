
let previous = document.getElementById('previous');
let play = document.getElementById('play');
let next = document.getElementById('next');

let album = document.getElementById('album');
let game = document.getElementById('game');
let title = document.getElementById('title');

let mute = document.getElementById('mute');
let volumeSlider = document.getElementById('volumeSlider');
let volumeNumber = document.getElementById('volumeNumber');

let durationSlider = document.getElementById('durationSlider');
let currTime = document.getElementById('currentTime');
let totalTime = document.getElementById('totalTime');

// Global values
let updateTimer;
let track_index = 0;
let isPlaying = false;

// Create audio element for the player
let curr_track = document.createElement('audio');

// Track list
let track_list = [
   {
      name: "New Junk City",
      game: "Earthworm Jim",
      img: "images/albums/earthworm-jim.jpg",
      path: "music/Earthworm Jim - New Junk City.mp3"
   },
   {
      name: "Prologue",
      game: "Castlevania: Symphony of the Night",
      img: "images/albums/castlevania.jpg",
      path: "music/Castlevania SOTN - Prologue.mp3"
   },
   {
      name: "Toot Toot Sonic Warrior",
      game: "Sonic CD",
      img: "images/albums/sonic-cd.jpg",
      path: "music/Sonic CD - Toot Toot Sonic Warrior.mp3"
   },
   {
      name: "Brinstar",
      game: "Metroid",
      img: "images/albums/metroid.jpg",
      path: "music/Metroid - Brinstar Theme.mp3"
   },
   {
      name: "Hell March",
      game: "C&C Red Alert",
      img: "images/albums/red-alert.jpg",
      path: "music/Red Alert C&C - Hell March.mp3"
   }
];

// * FUNCTIONS

// Clear duration timer


// Load Tracks
function loadTrack(track_index) {

   // Clear previous timer
   clearInterval(updateTimer);
   resetValues();

   // Load a new track
   curr_track.src = track_list[track_index].path;
   curr_track.load();

   // Update track details
   title.textContent = track_list[track_index].name;
   game.textContent = track_list[track_index].game;
   album.src = track_list[track_index].img;
   
   // Update duration slider
   updateTimer = setInterval(seekUpdate, 1000);

   // Change track on end of song
   // curr_track.addEventListener("ended", autoPlay() {
      
   // }; 
}

function resetValues() {
   currentTime.textContent = "00:00";
   totalTime.textContent = "00:00";
   durationSlider.value = 0;
}

// Play/Pause Click
play.addEventListener("click", function playPauseTrack() {
   if (!isPlaying) {
      playTrack();
   } else {
      pauseTrack();
   }
})

// Play
function playTrack() {
   curr_track.play();
   isPlaying = true;
   play.innerHTML = '<img class="play-icon" src="icons/pause.png"></img>'; 
}

// Pause
function pauseTrack() {
   curr_track.pause();
   isPlaying = false;
   play.innerHTML = '<img class="play-icon" src="icons/play.png"></img>';
}

// Next track
next.addEventListener("click", function nextTrack() {
   if (track_index < track_list.length - 1) {
      track_index += 1;
   } else {
      track_index = 0;
   }
   loadTrack(track_index);
   playTrack();
});

// Previous track
previous.addEventListener("click", function prevTrack() {
   if (track_index > 0) {
      track_index -= 1;
   } else {
      track_index = track_list.length;
   }
   loadTrack(track_index);
   playTrack();
});

// Mute sound
mute.addEventListener("click", function muteSound() {
   if (curr_track.volume !== 0 || volumeSlider.value !== 0) {
      curr_track.volume = 0;
      volumeSlider.value = 0;
      mute.innerHTML = '<img class="volume-icon" src="icons/mute.png"></img>'
   } else { 
      curr_track.volume = 1;
      volumeSlider.value = 1;
      mute.innerHTML = '<img class="volume-icon" src="icons/volume.png"></img>'};
   });

durationSlider.addEventListener("change", function seek() {
   seekto = curr_track.duration * (durationSlider.value / 100);
   curr_track.currentTime = seekto;
});

volumeSlider.addEventListener("change", function setVolume() {
   curr_track.volume = volumeSlider.value / 100;
});

function seekUpdate() { 
   let seekPosition = 0;
   if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      durationSlider.value = seekPosition;

      let currentMinutes = Math.floor(curr_track.currentTime / 60); 
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60); 
      let durationMinutes = Math.floor(curr_track.duration / 60); 
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60); 

      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 

      currTime.textContent = currentMinutes + ":" + currentSeconds;
      totalTime.textContent = durationMinutes + ":" + durationSeconds;
   }
}
loadTrack(track_index);