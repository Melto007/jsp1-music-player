let checkPlaylist = document.querySelector('.check-playlist')
let playlist = document.querySelector('.playlist')
let songName = document.querySelector('.middle-area h3')
let artistName = document.querySelector('.middle-area p')
let audioPlayer = document.querySelector('#main-audio')
let songForwardBackward = 0

let playMusicButton = document.querySelector('.playMusic')
let progressBar = document.querySelector('.progress-bar')
let progessload = document.querySelector('.progress-load')
let forward = document.querySelector('.fa-forward')
let backward = document.querySelector('.fa-backward')

const songListName = document.querySelector('.playlists-1')

let currentDuration = document.querySelector('.current-duration')
let maxDuration = document.querySelector('.max-duration')
let addVolume = document.querySelector('.addVolume')
let increaseVolume = document.querySelector('.increaseVolume')

let repeat = document.querySelector('.fa-repeat')

let heart = document.querySelector('.fa-heart')

checkPlaylist.addEventListener('click', function() {
    playlist.classList.toggle('add-playlist')
})

const album = [
    {
        id: 1,
        name: 'Hope',
        song: './files/music/XXXTENTACION-Hope.mp3',
        artist: 'XXXTENTACION'
    },{
        id: 2,
        name: 'Faded',
        song: './files/music/Faded (Alan Walker) 320Kbps-(GanaMirchi.in).mp3',
        artist: 'Alan Walker'
    },{
        id: 3,
        name: 'Darkside',
        song: './files/music/Darkside (Alan Walker) 320Kbps-(BigMusic.In).mp3',
        artist: 'Alan Walker'
    },{
        id: 4,
        name: 'Girls like you',
        song: './files/music/muzmo_ru_Maroon_5_ft_Cardi_B_-_Girls_like_you_60116839.mp3',
        artist: 'Maroon 5'
    }
]

window.addEventListener('load', function() {
    createMusic(songForwardBackward)
    createPlayList()
})

function createMusic(songForwardBackward) {
    songName.innerText = album[songForwardBackward].name
    artistName.innerText = album[songForwardBackward].artist
    audioPlayer.setAttribute('src', album[songForwardBackward].song)
}

function createPlayList() {
    for(const index in album) {
        let divTag = `  <div class="playlists">
                            <img src="./files/images/Music_Player-512.webp" alt="music">
                            <div class="song-list">
                                <h3>${album[index].name}</h3>
                                <p>${album[index].artist}</p>
                            </div>
                        </div> `
        songListName.insertAdjacentHTML('beforebegin', divTag)
    }

    let playlists =  document.querySelectorAll(`.playlists`)
 
    playlists.forEach((arr,index) => {
        playlists[index].addEventListener('click', function() {
            let songLists = playlists[index].querySelector('.song-list h3').innerText
            
            if(songLists === album[index].name) {
                let indexs = album[index].id - 1
                songForwardBackward = indexs
                createMusic(songForwardBackward)
                pause()
                playMusic()
                console.log(songActive)
            }
        })
    })
}

function play() {
    playMusicButton.classList.remove('fa-play')
    playMusicButton.classList.add('fa-pause')
    audioPlayer.play() 
}

function pause() {
    playMusicButton.classList.remove('fa-pause')
    playMusicButton.classList.add('fa-play')
    audioPlayer.pause() 
}

function playMusic() {
    let checkBtn =  playMusicButton.classList.contains('fa-play')
    
    if(checkBtn === true) {
        play()
    } else {
        pause()
    }
}

playMusicButton.addEventListener('click', function() {
    playMusic() 
})

audioPlayer.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let progressBarWidth = (currentTime / duration) * 100
    progessload.style.width = `${progressBarWidth}%`

    let totalDuration = audioPlayer.duration
    let totalMin = Math.floor(totalDuration / 60)
    let totalSec = Math.floor(totalDuration % 60)
    
    if(totalSec < 10) {
        totalSec = `0${totalSec}`
    }else if(isNaN(totalMin)) {
        maxDuration.innerText = `00:00`
    } else {
        maxDuration.innerText = `${totalMin}:${totalSec}`
    }

    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)

    if(currentSec < 10) {
        currentSec = `0${currentSec}`
    }else if(isNaN(currentMin)) {
        currentDuration.innerText = '00:00'
    }

    currentDuration.innerText = `${currentMin}:${currentSec}`
    
})

forward.addEventListener('click', function () {
    if(album.length - 1 === songForwardBackward) {
        songForwardBackward = 0
    }else {
        songForwardBackward += 1
    }
    createMusic(songForwardBackward)
    pause()
    playMusic() 
})

backward.addEventListener('click', function() {
    if(songForwardBackward === 0) {
        songForwardBackward = 0
    }else {
        songForwardBackward -= 1
    }

    createMusic(songForwardBackward)
    pause()
    playMusic() 
})

progressBar.addEventListener('click', function(e) {
    let progress = progressBar.clientWidth
    let clicked = e.offsetX
    let songLength = audioPlayer.duration

    audioPlayer.currentTime = (clicked / progress) * songLength
    play() 
})

addVolume.addEventListener('click', function() {
    increaseVolume.classList.toggle('enableVolumeBtn')
})

increaseVolume.addEventListener('change', () => {
    audioPlayer.volume = increaseVolume.value / 100
})

function removeRepeatAttr(attr1,attr2) {
    repeat.removeAttribute('title', attr1)
    repeat.setAttribute('title', attr2)
}

function removeClassAttr(attr1,attr2) {
    repeat.classList.remove(attr1)
    repeat.classList.add(attr2)
}

function loop() {
    repeat.style.color = '#8D3DAF'
    removeRepeatAttr('no-repeat','repeat')
}

function shuffled() {
    removeRepeatAttr('repeat','suffled')
    removeClassAttr('fa-repeat','fa-shuffle')
}

function regular() {
    repeat.style.color = '#fff'
    removeRepeatAttr('suffled','no-repeat')
    removeClassAttr('fa-shuffle','fa-repeat')
}

repeat.addEventListener('click', function() {
    let value = repeat.getAttribute('title')

    value === 'no-repeat' ? loop() : value === 'repeat' ? shuffled() : regular()
})

audioPlayer.addEventListener('ended', () => {
    let value = repeat.getAttribute('title')
    
    if(value === 'repeat') {
        createMusic(songForwardBackward)
        pause()
        playMusic()
    }else if(value === 'suffled'){
        let randomNumber = Math.floor(Math.random() * album.length)
        songForwardBackward = randomNumber
        createMusic(songForwardBackward)
        pause()
        playMusic()
    }else {
        songForwardBackward += 1
        createMusic(songForwardBackward)
        pause()
        playMusic()
    }
})

heart.addEventListener('click', function() {
    heart.classList.toggle('fa-solid')
})