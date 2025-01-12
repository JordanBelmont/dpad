const BASE_URL = "/"

let previous = document.getElementById("previous");
let play = document.getElementById("pause");
let next = document.getElementById("next");
// let game = document.getElementById("game");
// let title = document.getElementById("title");

let playlistName = document.getElementById("playlistName");
let playIcon = document.querySelector(".play-icon");
let playlist = document.getElementById("playlist");
let song = document.getElementById("li");
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
            img: "images/albums/super-bomberman.png",
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
         {
            name: "Sami's Theme",
            game: "Advance Wars",
            img: "images/albums/advance-wars.png",
            path: "music/Advance Wars - Sami's Theme.mp3"
         },
         {
            name: "Brinstar",
            game: "Super Smash Bros. Melee",
            img: "images/albums/smash-bros.png",
            path: "music/Super Smash Bros Melee - Brinstar.mp3"
         },
         {
            name: "Infinite Blue",
            game: "F-Zero GX",
            img: "images/albums/f-zero.png",
            path: "music/F-Zero GX - Infinite Blue.mp3"
         },
         {
            name: "Overworld",
            game: "Super Mario Land",
            img: "images/albums/super-mario-land.png",
            path: "music/Super Mario Land - Overworld.mp3"
         },
         {
            name: "Sewer Surfin'",
            game: "Teenage Mutant Ninja Turtles IV",
            img: "images/albums/tmnt.png",
            path: "music/TMNT IV - Sewer Surfin'.mp3"
         },
         {
            name: "Just Plains",
            game: "Wario Land: Shake It",
            img: "images/albums/wario-land.png",
            path: "music/Wario Land Shake It - Just Plains.mp3"
         },
      ],
      image: "images/consoles/nintendo-logo.png"
   },
   {
      name: "Sega",
      tracks: [
         {
            name: "Rapmaster Rocket Racket",
            game: "Toejam & Earl: Back in the Groove",
            img: "images/albums/toejam-and-earl.png",
            path: "music/Toejam & Earl - Rapmaster Rocket Racket.mp3"
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
         {
            name: "Runner AD2025",
            game: "Alien Soldier",
            img: "images/albums/alien-soldier.png",
            path: "music/Alien Soldier - Runner AD2025.mp3"
         },
         {
            name: "Rise From Your Grave",
            game: "Altered Beast",
            img: "images/albums/altered-beast.png",
            path: "music/Altered Beast - Rise From Your Grave.mp3"
         },
         {
            name: "Ravaged Village",
            game: "Golden Axe II",
            img: "images/albums/golden-axe.png",
            path: "music/Golden Axe II - Ravaged Village.mp3"
         },
         {
            name: "Guardiana Library",
            game: "Shining Force CD",
            img: "images/albums/shining-force.png",
            path: "music/Shining Force CD - Guardiana Library.mp3"
         },
         {
            name: "My Dear D",
            game: "Shinobi III",
            img: "images/albums/shinobi-3.png",
            path: "music/Shinobi III - My Dear D.mp3"
         },
         {
            name: "My Dear D",
            game: "Splatterhouse 2",
            img: "images/albums/splatterhouse-2.png",
            path: "music/Splatterhouse 2 - Title Theme.mp3"
         },
         {
            name: "My Dear D",
            game: "Streets of Rage 2",
            img: "images/albums/streets-of-rage-2.png",
            path: "music/Streets of Rage 2 - Never Return Alive.mp3"
         }
      ],
      image: "images/consoles/sega-logo.png"
   },
   {
      name: "PlayStation",
      tracks: [
         {
            name: "Prologue",
            game: "Castlevania: Symphony of the Night",
            img: "images/albums/castlevania-sotn.png",
            path: "music/Castlevania - Prologue.mp3"
         },
         {
            name: "Title Theme",
            game: "Crash Bandicoot",
            img: "images/albums/crash-bandicoot.png",
            path: "music/Crash Bandicoot - Title Theme.mp3"
         },
         {
            name: "Nevan",
            game: "Devil May Cry 3",
            img: "images/albums/devil-may-cry-3.png",
            path: "music/Devil May Cry 3 - Nevan.mp3"
         },
         {
            name: "Still More Fighting",
            game: "Final Fantasy VII",
            img: "images/albums/FFVII.png",
            path: "music/Final Fantasy VII - Still More Fighting.mp3"
         },
         {
            name: "Main Titles",
            game: "God of War II",
            img: "images/albums/gof-of-war-II.png",
            path: "music/God of War II - Main Titles.mp3"
         },
         {
            name: "Keep Yourself Alive 2",
            game: "Guilty Gear XX",
            img: "images/albums/guilty-gear-xx.png",
            path: "music/Guilty Gear XX - Keep Yourself Alive 2.mp3"
         },
         {
            name: "Still Dawn",
            game: "Resident Evil",
            img: "images/albums/resident-evil.png",
            path: "music/Resident Evil - Still Dawn.mp3"
         },
         {
            name: "Doom M",
            game: "The Lost Vikings 2",
            img: "images/albums/lost-vikings-2.png",
            path: "music/The Lost Vikings 2 - Doom M.mp3"
         },
         {
            name: "Ice Station",
            game: "Timesplitters 2",
            img: "images/albums/timesplitters-2.png",
            path: "music/Timesplitters 2 - Ice Station.mp3"
         },
         {
            name: "BFG Division",
            game: "Doom",
            img: "images/albums/doom.png",
            path: "music/Doom - BFG Division.mp3"
         }
      ],
      image: "images/consoles/playstation-logo.png"
   },
   {
      name: "Steam",
      tracks: [
         {
            name: "Tweedle Dee & Tweedle Dum",
            game: "American McGee's Alice",
            img: "images/albums/alice.png",
            path: "music/American McGee's Alice - Tweedle Dee and Tweedle Dum.mp3"
         },
         {
            name: "Zero Signal",
            game: "Carmageddon",
            img: "images/albums/carmageddon.png",
            path: "music/Carmageddon - Zero Signal.mp3"
         },
         {
            name: "Welcome to the Dead Estate",
            game: "Dead Estate",
            img: "images/albums/dead-estate.png",
            path: "music/Dead Estate - Welcome to the Dead Estate.mp3"
         },
         {
            name: "Tristram Village",
            game: "Diablo",
            img: "images/albums/diablo.png",
            path: "music/Diablo - Tristram Village.mp3"
         },
         {
            name: "Hell March",
            game: "Command & Conquer: Red Alert",
            img: "images/albums/red-alert.png",
            path: "music/Red Alert C&C - Hell March.mp3"
         },
         {
            name: "The Labyrinth",
            game: "Shivers",
            img: "images/albums/shivers.png",
            path: "music/Shivers - The Labyrinth.mp3"
         },
         {
            name: "Can o' Salt",
            game: "Super Meat Boy",
            img: "images/albums/super-meatboy.png",
            path: "music/Super Meatboy - Can o' Salt.mp3"
         },
         {
            name: "Engineering",
            game: "System Shock 2",
            img: "images/albums/system-shock-2.png",
            path: "music/System Shock 2 - Engineering.mp3"
         },
         {
            name: "Crusade",
            game: "The Binding of Isaac",
            img: "images/albums/binding-of-isaac.png",
            path: "music/The Binding of Isaac - Crusade.mp3"
         },
         {
            name: "Main Theme",
            game: "Vampire the Masquerade: Bloodlines",
            img: "images/albums/vampire-the-masquerade.png",
            path: "music/Vampire the Masquerade - Main Theme.mp3"
         }
      ],
      image: "images/consoles/steam-logo.png"
   }
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
   console.log(tracklists[index]);
   // playlistName.src = tracklists[index].name;
   tracklists[index].tracks.forEach((track) => {
      // create a new LI element that'll contain a track
      const newItem = document.createElement('li')
      // Set its text content
      newItem.innerHTML = track.game + "<br /><br />" + track.name;
      // add it to the track list UL
      playlist.appendChild(newItem)

      newItem.addEventListener('click', () => {
         pickTrack(track)
         document.querySelector('.active')?.classList.remove('active');
         newItem.classList.add('active');
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