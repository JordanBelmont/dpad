const BASE_URL = "/"

// let previous = document.getElementById("previous");
let play = document.getElementById("pause");
// let next = document.getElementById("next");
// let game = document.getElementById("game");
// let title = document.getElementById("title");

let playlistName = document.getElementById("playlistName");
let playIcon = document.querySelector(".play-icon");
let playlist = document.getElementById("playlist");
let album = document.getElementById("album");
let mute = document.getElementById("mute");
let volumeIcon = document.getElementById("volumeIcon");
let volumeSlider = document.getElementById("volumeSlider");
let volumeNumber = document.getElementById("volumeNumber");
let durationSlider = document.getElementById("durationSlider");
let currTime = document.getElementById("currentTime");
let totalTime = document.getElementById("totalTime");

// Global values
let updateTimer;
// The tracklist e.g Sega, Nintendo...
let tracklistIndex = 0;
// The song within the current tracklist
let track_index = 0;
let autoplay = 1;
let isPlaying = false;
let muteToggle = false;
// Create audio element for the player
let audioPlayer = document.createElement("audio");



let tracklists = [
   {
      name: "Nintendo",
      tracks: [
         {
            name: "Battle",
            game: "Super Bomberman 3",
            img: "images/albums/sonic-cd.png",
            path: "music/Super Bomberman 3 - Battle.mp3"
         },
         {
            name: "Forest Temple",
            game: "The Legend of Zelda: Ocarina of Time",
            img: "images/albums/zelda-ocarina.png",
            path: "music/The Legend of Zelda - Forest Temple.mp3"
         },
         {
            name: "Simon Belmont's Theme",
            game: "Super Castlevania IV",
            img: "images/albums/super-castlevania-IV.png",
            path: "music/Super Castlevania IV - Simon Belmont's Theme.mp3"
         },
         {
            name: "Escape",
            game: "Super Mario Odyssey",
            img: "images/albums/mario-odyssey.png",
            path: "music/Super Mario Odyssey - Escape.mp3"
         },
      ],
      image: ""
   },
   {
      name: "Sega",
      tracks: [
         {
            name: "Rapmaster Rocket Racket",
            game: "Toejam & Earl: Back in the Groove",
            img: "images/albums/toejam-and-earl.png",
            path: "music/Toejam & Earl - Rapmaster rocket Racket.mp3"
         },
         {
            name: "New Junk City",
            game: "Earthworm Jim",
            img: "images/albums/earthworm-jim.jpng.png",
            path: "music/Earthworm Jim - New Junk City.mp3"
         },
         {
            name: "Toot Toot Sonic Warrior",
            game: "Sonic CD",
            img: "images/albums/sonic-cd.png",
            path: "music/Sonic CD - Toot Toot Sonic Warrior.mp3"
         },
      ],
      image: ""
   },
];

// * FUNCTIONS

const pickTrack = (track) => {
   audioPlayer.src = BASE_URL + track.path;
   audioPlayer.load();
   audioPlayer.play();
   album.src = BASE_URL + track.img;
}

// Load Tracklist
loadTracklist = (index) => {

   // Clear previous timer
   // Load a new track
   // curr_track.src = tracklists[track_index].tracks;
   // curr_track.load();
   console.log(tracklists[index]);
   playlistName.innerHTML = tracklists[index].name;
   tracklists[index].tracks.forEach((track) => {
      // create a new LI element that'll contain a track
      const newItem = document.createElement('li')
      // Set its text content
      newItem.innerHTML = track.name
      // add it to the track list UL
      playlist.appendChild(newItem)

      newItem.addEventListener('click', () => {
         pickTrack(track)
      })
   })
}


// Update album art
// album.src = BASE_URL + tracklists[tracklistIndex].tracks[track_index].img;

// Autoplay
// audioPlayer.addEventListener("ended", function autoplay() {
//    if (audioPlayer.ended) {
//       track_index += 1;
//       loadTracklist(track_index);
//       playTrack();
//    }
// })

// Play/Pause Click
play.addEventListener("click", function playPauseTrack() {

   console.log('Clicked play button', audioPlayer.paused)
   if (audioPlayer.paused) {
      playTrack();
   } else {
      pauseTrack();
   }
})

// Play
playTrack = () => {
   audioPlayer.play();
   playIcon.src = 'https://jordanbelmont.github.io/dpad/icons/pause.png';
}

// Pause
pauseTrack = () => {
   audioPlayer.pause();
   playIcon.src = 'https://jordanbelmont.github.io/dpad/icons/play.png';
}

// // Next track
// next.addEventListener("click", function nextTrack() {
//    if (track_index < track_list.length - 1) {
//       track_index += 1;
//    } else {
//       track_index = 0;
//    }
//    loadTrack(track_index);
//    playTrack();
// });

// // Previous track
// previous.addEventListener("click", function prevTrack() {
//    if (track_index > 0) {
//       track_index -= 1;
//    } else {
//       track_index = track_list.length;
//    }
//    loadTrack(track_index);
//    playTrack();
// });

// Mute sound
mute.addEventListener("click", muteSound = () => {
   if (muteToggle !== true) {
      muteToggle = true;
      audioPlayer.volume = 0;
      volumeSlider.value = 0;
      volumeIcon.src = BASE_URL + "icons/mute.png";

   } else {
      muteToggle = false;
      audioPlayer.volume = 1;
      volumeSlider.value = 50;
      volumeIcon.src = BASE_URL + "icons/volume.png";
   }
});

// Duration slider
durationSlider.addEventListener("change", seek = () => {
   seekto = audioPlayer.duration * (durationSlider.value / 100);
   audioPlayer.currentTime = seekto;
});

// Volume slider
volumeSlider.addEventListener("change", setVolume = () => {
   audioPlayer.volume = volumeSlider.value / 100;
});

// example of use:
//   formatTime(10, 5)
// would return:
//   "10:5"
// 1, 1
const formatTime = (minutes, seconds) => {
   return String(minutes).padStart(2, '0 ') +
      ':' + String(seconds).padStart(2, '0 ');
}

const seekUpdate = () => {
   let seekPosition = 0;
   if (!isNaN(audioPlayer.duration)) {
      seekPosition = audioPlayer.currentTime * (100 / audioPlayer.duration);
      durationSlider.value = seekPosition;

      let currentMinutes = Math.floor(audioPlayer.currentTime / 60);
      let currentSeconds = Math.floor(audioPlayer.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(audioPlayer.duration / 60);
      let durationSeconds = Math.floor(audioPlayer.duration - durationMinutes * 60);

      currTime.textContent = formatTime(currentMinutes, currentSeconds);
      totalTime.textContent = formatTime(durationMinutes, durationSeconds);
   }
}

// Update duration slider
updateTimer = setInterval(seekUpdate, 100);

loadTracklist(track_index);