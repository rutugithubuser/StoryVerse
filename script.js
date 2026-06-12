const cards = document.querySelectorAll(".card");
const player = document.getElementById("player");
const video = document.getElementById("video");
const playBtn = document.querySelector(".play-btn");
const banner = document.getElementById("banner");
const music = document.getElementById("bg-music");

const nextPopup = document.getElementById("next-popup");
const nextBtn = document.getElementById("next-btn");

const playPause = document.getElementById("playPause");
const progress = document.getElementById("progress");
const muteBtn = document.getElementById("muteBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");

let currentIndex = 0;

/* PLAY FROM CARDS */
cards.forEach((card, index) => {
card.addEventListener("click", () => {
currentIndex = index;
playVideo();
});
});

playBtn.addEventListener("click", () => {
currentIndex = 0;
playVideo();
});

/* PLAY VIDEO */
function playVideo() {
video.src = `videos/${currentIndex + 1}.mp4`;
player.classList.remove("hidden");
player.classList.remove("paused");
video.play();
showControls();

// reset UI
player.classList.remove("show-popup");
}

/* PLAY / PAUSE BUTTON */
playPause.onclick = () => {
if (video.paused) video.play();
else video.pause();
};

video.addEventListener("play", () => {
playPause.textContent = "⏸";
player.classList.remove("paused");
player.classList.add("show-next");
});

video.addEventListener("pause", () => {
playPause.textContent = "▶";
player.classList.add("paused");
});

/* TIME UPDATE */
video.addEventListener("timeupdate", () => {
if (!video.duration) return;

// update progress bar
progress.value = (video.currentTime / video.duration) * 100;

// next popup logic
const remaining = video.duration - video.currentTime;

if (remaining <= 5 && remaining > 0) {
player.classList.add("show-popup");
} else {
player.classList.remove("show-popup");
}
});

/* PROGRESS CONTROL */
progress.addEventListener("input", () => {
if (!video.duration) return;
video.currentTime = (progress.value / 100) * video.duration;
});

/* MUTE */
muteBtn.onclick = () => {
video.muted = !video.muted;
muteBtn.textContent = video.muted ? "🔇" : "🔊";
};

/*  FULLSCREEN */
fullscreenBtn.onclick = () => {
if (!document.fullscreenElement) {
player.requestFullscreen();
} else {
document.exitFullscreen();
}
};

/* NEXT */
function playNext() {
currentIndex = (currentIndex + 1) % cards.length;
playVideo();
}

video.addEventListener("ended", playNext);

/* CLOSE */
function closePlayer() {
video.pause();
player.classList.add("hidden");
player.classList.remove("show-popup");
}

/* SLIDER */
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
slides.forEach(slide => slide.classList.remove("active"));
slides[index].classList.add("active");
}

if (slides.length > 0) {
setInterval(() => {
currentSlide = (currentSlide + 1) % slides.length;
showSlide(currentSlide);
}, 4000);
}



/* PROFILE */
function enterNetflix() {
document.getElementById("profile-screen").style.display = "none";
document.getElementById("splash-screen").style.display = "flex";

music.currentTime = 0;
music.play();

setTimeout(() => {
document.getElementById("splash-screen").style.display = "none";
}, 3900);
}

/* KEYBOARD CONTROLS */
document.addEventListener("keydown", (e) => {
if (player.classList.contains("hidden")) return;

switch (e.key.toLowerCase()) {


case " ":
  e.preventDefault();
  video.paused ? video.play() : video.pause();
  break;

case "f":
  if (!document.fullscreenElement) {
    player.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  break;

case "m":
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "🔇" : "🔊";
  break;

case "arrowright":
  video.currentTime += 5;
  break;

case "arrowleft":
  video.currentTime -= 5;
  break;


}
});

const infoBtn = document.querySelector(".info-btn");
const infoModal = document.getElementById("info-modal");

if (infoBtn && infoModal) {

/* OPEN */
infoBtn.addEventListener("click", () => {
infoModal.classList.remove("hidden");
});

/* CLOSE */
window.closeInfo = function () {
infoModal.classList.add("hidden");
};

}

/* AUTO HIDE CONTROLS + CURSOR */

let hideTimeout;

function showControls() {
player.classList.add("show-controls");
player.classList.remove("hide-cursor");

clearTimeout(hideTimeout);

hideTimeout = setTimeout(() => {
if (!video.paused && !player.classList.contains("hidden")) {
player.classList.remove("show-controls");
player.classList.add("hide-cursor");
}
}, 3000);
}


/* SHOW ON MOUSE MOVE */
player.addEventListener("mousemove", showControls);

/* SHOW WHEN VIDEO STARTS */
video.addEventListener("play", showControls);

/* ALWAYS SHOW WHEN PAUSED */
video.addEventListener("pause", () => {
player.classList.add("show-controls");
player.classList.remove("hide-cursor");
});
