const trackName = document.querySelector('.track-name')
const trackArtist = document.querySelector('.track-artist')
const trackArt = document.querySelector('.track-art')
const seekSlider = document.querySelector('.seek_slider')
const volumeSlider = document.querySelector('.volume_slider')
const audio = document.querySelector('audio')
const btnPlayAndPause = document.querySelector('.fa-play-circle')
const nowPlaying = document.querySelector('.now-playing')
const currentTime = document.querySelector('.current-time')
const totalDuration = document.querySelector('.total-duration')
const songsArray = [
  { title: 'Я найду тебя через века', authors: 'Баста', img: './img/m1000x1000.jfif', audio: './audio/basta-ja-naidu-tebja-cherez-veka.mp3' },
  { title: 'Реки растают', authors: 'Три дня дождя', img: './img/P8bJ4V8zNV4.jpg.jpg', audio: './audio/tri-dnya-dozhdya-reki-rastayut-mp3.mp3' },
  { title: 'Всему своё время', authors: 'PHARAOH', img: './img/1200x1200bb.jpg', audio: './audio/PharaoH - Всему Свое Время (prod. By Noa, PHARAOH, Bryte).mp3' },
  { title: 'Дождь', authors: 'Джиган, МакSим', img: './img/images.jpg', audio: './audio/Джиган & Maksim - Дождь.mp3' },
]
let indexSongs = 0
let isPlay = false
let progress = 0

function TimeDuration(time) {
  if (!isNaN(time)) {
    const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60)
    const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60)
    return `${minutes}:${seconds}`
  } else {
    return '00:00'
  }
}

function randomTrack() {
  indexSongs = Math.floor(Math.random() * (songsArray.length))
  currentSongs()
}


function updateTimeAudio() {
  progress = ((audio.currentTime / audio.duration) * 100)
  seekSlider.value = progress
  currentTime.textContent = TimeDuration(Math.floor(audio.currentTime))
  totalDuration.textContent = TimeDuration(Math.floor(audio.duration))
  if (audio.currentTime === audio.duration) {
    if (indexSongs === songsArray.length - 1) {
      indexSongs = 0
      isPlay = false
    } else {
      indexSongs += 1
    }
    currentSongs()
  }
}

function setVolume() {
  audio.volume = volumeSlider.value
}

function seekTo() {
  audio.currentTime = (seekSlider.value / 100) * audio.duration
}




function currentSongs() {
  trackName.textContent = songsArray[indexSongs].title
  trackArtist.textContent = songsArray[indexSongs].authors
  trackArt.style.backgroundImage = `url(${songsArray[indexSongs].img})`
  nowPlaying.textContent = `Следующая песня - ${indexSongs === songsArray.length - 1 ? songsArray[0].title : songsArray[indexSongs + 1].title}`
  audio.src = songsArray[indexSongs].audio
  document.title = `сейчас играет - ${songsArray[indexSongs].title} `
  audio.currentTime = 0
  audio.onloadedmetadata = () => {
    currentTime.textContent = TimeDuration(Math.floor(audio.currentTime))
    totalDuration.textContent = TimeDuration(Math.floor(audio.duration))
    seekSlider.value = 0
  }
  if (!isPlay) {
    audio.pause()
    isPlay = false
  } else {
    audio.play()
    isPlay = true
  }
}

currentSongs()


function playpauseTrack() {
  if (isPlay) {
    audio.pause()
    btnPlayAndPause.classList.add('fa-play-circle')
    btnPlayAndPause.classList.remove('fa-pause')
    trackArt.classList.remove('rotate')
    isPlay = false
  } else {
    btnPlayAndPause.classList.add('fa-pause')
    btnPlayAndPause.classList.remove('fa-play-circle')
    trackArt.classList.add('rotate')
    audio.play()
    isPlay = true
  }
}


function repeatTrack() {
  audio.currentTime = 0
}


function prevTrack() {
  if (indexSongs === 0) {
    indexSongs = songsArray.length - 1
  } else {
    indexSongs -= 1
  }

  currentSongs()
}


function nextTrack() {
  if (indexSongs === songsArray.length - 1) {
    indexSongs = 0
  } else {
    indexSongs += 1
  }
  currentSongs()
}

