let previous = document.getElementById("previous");
let play = document.getElementById("play");
let next = document.getElementById("next");

let album = document.getElementById("album");
let game = document.getElementById("game");
let title = document.getElementById("title");

let mute = document.getElementById("mute");
let volumeSlider = document.getElementById("volumeSlider");
let volumeNumber = document.getElementById("volumeNumber");

let durationSlider = document.getElementById("durationSlider");
let currTime = document.getElementById("currentTime");
let totalTime = document.getElementById("totalTime");

// Global values
let updateTimer;
let track_index = 0;
let autoplay = 1;
let isPlaying = false;
let muteToggle = false;

// Create audio element for the player
let curr_track = document.createElement("audio");

// Track list
let track_list = [
   {
      name: "Escape",
      game: "Super Mario Odyssey",
      img: "images/albums/mario-odyssey.jpg",
      path: "music/Super Mario Odyssey - Escape.mp3"
   },
   {
      name: "New Junk City",
      game: "Earthworm Jim",
      img: "images/albums/earthworm-jim.jpg",
      path: "music/Earthworm Jim - New Junk City.mp3"
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
   },
   {
      name: "Nell's Theme",
      game: "Advance Wars",
      img: "images/albums/advance-wars.jpg",
      path: "music/Advance Wars - Nell's Theme.mp3"
   },
   {
      name: "Runner AD2025",
      game: "Alien Soldier",
      img: "images/albums/alien-soldier.jpg",
      path: "music/Alien Soldier - Runner AD2025.mp3"
   },
   {
      name: "Nevan",
      game: "Devil May Cry 3",
      img: "images/albums/dmc3.jpg",
      path: "music/Devil May Cry 3 - Nevan.mp3"
   },
   {
      name: "Just Plains",
      game: "Wario Land: Shake It!",
      img: "images/albums/wario.jpg",
      path: "music/Wario Land Shake It - Just Plains.mp3"
   },
   {
      name: "Level 5",
      game: "Chuck Rock",
      img: "images/albums/chuck-rock.jpg",
      path: "music/Chuck Rock - Level 5.mp3"
   },
   {
      name: "Just Do It",
      game: "Guilty Gear Xrd SIGN",
      img: "images/albums/guilty-gear.jpg",
      path: "music/Guilty Gear Xrd -SIGN- Just do it.mp3"
   },
   {
      name: "Stage 1",
      game: "Keio Flying Squadron",
      img: "images/albums/keio.jpg",
      path: "music/Keio Flying Squadron - Stage 1.mp3"
   },
   {
      name: "Title Theme",
      game: "Kid Icarus",
      img: "images/albums/kid-icarus.jpg",
      path: "music/Kid Icarus - Title Theme.mp3"
   },
   {
      name: "Neo Cortex",
      game: "Crash Trilogy",
      img: "images/albums/crash.jpg",
      path: "music/Crash Trilogy - Neo Cortex.mp3"
   },
   {
      name: "Village of Whispers",
      game: "Killer Instinct",
      img: "images/albums/killer-instinct.jpg",
      path: "music/Killer Instinct - Village of Whispers.mp3"
   },
   {
      name: "Main Theme",
      game: "Quake",
      img: "images/albums/quake.jpg",
      path: "music/Quake - Main Theme.mp3"
   },
   {
      name: "My Dear D",
      game: "Shinobi III",
      img: "images/albums/shinobi3.jpg",
      path: "music/Shinobi III - My Dear D.mp3"
   },
   {
      name: "Neo Ex-Death",
      game: "Dissidia Duodecim",
      img: "images/albums/dissidia.jpg",
      path: "music/Dissidia Duodecim - Neo Ex-Death.mp3"
   },
   {
      name: "Title Theme",
      game: "Splatterhouse 2",
      img: "images/albums/splatterhouse2.jpg",
      path: "music/Splatterhouse 2 - Title Theme.mp3"
   },
   {
      name: "Title Theme",
      game: "Spyro the Dragon",
      img: "images/albums/spyro.jpg",
      path: "music/Spyro the Dragon - Title Theme.mp3"
   },
   {
      name: "Guardiana Library",
      game: "Shining Force CD",
      img: "images/albums/shining-force.jpg",
      path: "music/Shining Force CD - Guardiana Library.mp3"
   },
   {
      name: "Active Red",
      game: "Street Fighter Alpha 3",
      img: "images/albums/street-fighter-alpha.jpg",
      path: "music/Street Fighter Alpha 3 - Active Red.mp3"
   },
   {
      name: "Never Return Alive",
      game: "Streets of Rage II",
      img: "images/albums/sor2.jpg",
      path: "music/Streets of Rage 2 - Never Return Alive.mp3"
   },
   {
      name: "Can o' Salt",
      game: "Super Meat Boy",
      img: "images/albums/supermeat.jpg",
      path: "music/Super Meat Boy - Can o' Salt.mp3"
   },
   {
      name: "Engineering",
      game: "System Shock 2",
      img: "images/albums/system-shock2.jpg",
      path: "music/System Shock 2 - Engineering.mp3"
   },
   {
      name: "Stages 1-4",
      game: "Dr. Robotnik's Mean Bean Machine",
      img: "images/albums/mean-bean.jpg",
      path: "music/Dr. Robotnik's Mean Bean Machine - Stages 1-4.mp3"
   },
   {
      name: "Doom M",
      game: "The Lost Vikings 2",
      img: "images/albums/lost-vikings2.jpg",
      path: "music/The Lost Vikings 2 - Doom M.mp3"
   },
   {
      name: "Ice Station",
      game: "Timesplitters 2",
      img: "images/albums/timesplitters2.jpg",
      path: "music/Timesplitters 2 - Ice Station.mp3"
   },
   {
      name: "Toejam Jammin'",
      game: "Toejam & Earl",
      img: "images/albums/toejam-and-earl.jpg",
      path: "music/Toejam & Earl - Toejam Jammin'.mp3"
   },
   {
      name: "Still More Fighting",
      game: "Final Fantasy VII",
      img: "images/albums/ffvii.jpg",
      path: "music/Final Fantasy VII - Still More Fighting [HQ].mp3"
   },
   {
      name: "Ragnarok Canyon",
      game: "Battletoads in Battlemaniacs",
      img: "images/albums/battletoads.jpg",
      path: "music/Battletoads in Battlemaniacs - Ragnarok Canyon.mp3"
   },
   {
      name: "Main Theme",
      game: "God of War II",
      img: "images/albums/gow2.jpg",
      path: "music/God of War 2 - Main Theme.mp3"
   },
   {
      name: "Dovahkiin",
      game: "Skyrim",
      img: "images/albums/skyrim.jpg",
      path: "music/Skyrim - Dovahkiin.mp3"
   },
   {
      name: "Hammer Bros.",
      game: "Super Mario Bros. 3",
      img: "images/albums/super-mario-3.jpg",
      path: "music/Super Mario Bros 3 - Hammer Bros.mp3"
   },
   {
      name: "Ocean",
      game: "Terraria",
      img: "images/albums/terraria.jpg",
      path: "music/Terraria - Ocean.mp3"
   },
   {
      name: "Sewer Surfin'",
      game: "TMNT IV: Turtles in Time",
      img: "images/albums/tmnt.jpg",
      path: "music/TMNT IV - Sewer Surfin'.mp3"
   },
   {
      name: "Megalovania",
      game: "Undertale",
      img: "images/albums/undertale.jpg",
      path: "music/Undertale - Megalovania.mp3"
   },
   {
      name: "Infinite Blue",
      game: "F-Zero GX",
      img: "images/albums/f-zero.jpg",
      path: "music/F-Zero GX - Infinite Blue.mp3"
   }
];

// * FUNCTIONS

// Load Tracks
loadTrack = (track_index) => {

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
}

// Value reset
resetValues = () => {
   currentTime.textContent = "00:00";
   totalTime.textContent = "00:00";
   durationSlider.value = 0;
}

// Autoplay
curr_track.addEventListener("ended", function autoplay() {
   if (curr_track.ended) {
      track_index += 1;
      loadTrack(track_index);
      playTrack();
   }
})

// Play/Pause Click
play.addEventListener("click", function playPauseTrack() {
   if (isPlaying == false) {
      playTrack();
   } else {
      pauseTrack();
   }
})

// Play
playTrack = () => {
   curr_track.play();
   isPlaying = true;
   play.innerHTML = "<img class='play-icon' src='icons/pause.png'></img>";
}

// Pause
pauseTrack = () => {
   curr_track.pause();
   isPlaying = false;
   play.innerHTML = "<img class='play-icon' src='icons/play.png'></img>";
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
mute.addEventListener("click", muteSound = () => {
   if (muteToggle !== true) {
      muteToggle = true;
      curr_track.volume = 0;
      volumeSlider.value = 0;
      mute.innerHTML = "<img class='volume-icon' src='icons/mute.png'></img>";
   } else {
      muteToggle = false;
      curr_track.volume = 1;
      volumeSlider.value = 50;
      mute.innerHTML = "<img class='volume-icon' src='icons/volume.png'></img>";
   }
});

// Duration slider
durationSlider.addEventListener("change", seek = () => {
   seekto = curr_track.duration * (durationSlider.value / 100);
   curr_track.currentTime = seekto;
});

// Volume slider
volumeSlider.addEventListener("change", setVolume = () => {
   curr_track.volume = volumeSlider.value / 100;
});

seekUpdate = () => {
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