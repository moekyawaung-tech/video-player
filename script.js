const video = document.getElementById('mainVideo');
const playToggle = document.getElementById('playToggle');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const videoList = document.getElementById('videoList');

// Video Events
video.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(video.duration);
});

video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressFill.style.width = progress + '%';
    currentTime.textContent = formatTime(video.currentTime);
});

video.addEventListener('loadeddata', () => {
    duration.textContent = formatTime(video.duration);
});

progressBar.addEventListener('click', (e) => {
    const progress = e.offsetX / progressBar.offsetWidth;
    video.currentTime = progress * video.duration;
});

function togglePlay() {
    if (video.paused) {
        video.play();
        playToggle.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        playToggle.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

volumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value / 100;
    document.getElementById('volumeIcon').className = 
        video.volume === 0 ? 'fas fa-volume-mute' : 'fas fa-volume-up';
});

function toggleFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
}

function togglePictureInPicture() {
    if (video.requestPictureInPicture) {
        video.requestPictureInPicture();
    }
}

// Initialize
togglePlay(); // Autoplay demo
