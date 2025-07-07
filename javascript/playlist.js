let rotation = 0;
let spinInterval = null;
let slowSpinInterval = null;
const imagen = document.getElementById('cover'),
    titulo = document.getElementById('titulo'),
    artist = document.getElementById('artista'),
    currentTimeEl = document.getElementById('current'),
    durationEl = document.getElementById('duracion'),
    progreso = document.getElementById('progreso'),
    playerProgreso = document.getElementById('reproductor-progreso'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play')
const musica = new Audio();
const temas = [
    {
        path: '/audio/Fck Everybody (Free Maxx).mp3',
        displayName: 'F*ck Everybody',
        cover: '/imgs/covers/pngimg.png',
        artist: 'EBK Jaaybo',
    },
    {
        path: '/audio/VonOff1700 - Opps On Deck (Lyrics).mp3',
        displayName: 'Opps On Deck',
        cover: '/imgs/covers/opps_on_deck.png',
        artist: 'VonOff1700',
    },
    {
        path: '/audio/Leon Thomas - MUTT (Audio).mp3',
        displayName: 'MUTT',
        cover: '/imgs/covers/mutt.png',
        artist: 'Leon Thomas',
    },
    {
        path: '/audio/Bartender.mp3',
        displayName: 'Bartender',
        cover: '/imgs/covers/epiphany.png',
        artist: 'T-Pain',
    },
    {
        path: "/audio/Amy Winehouse - You Know I'm No Good (Audio).mp3",
        displayName: "You Know I'm No Good",
        cover: '/imgs/covers/back to black.png',
        artist: 'Amy Winehouse',
    },
    {
        path: '/audio/New Edition - Mr. Telephone Man (Lyrics).mp3',
        displayName: 'Mr. Telephone Man',
        cover: '/imgs/covers/new edition.png',
        artist: 'New Edition',
    },
    {
        path: '/audio/So Fresh, So Clean Outkast.mp3',
        displayName: 'So Fresh, So Clean',
        cover: '/imgs/covers/stanconia.png',
        artist: 'Outkast',
    },
    {
        path: '/audio/U Not Like Me.mp3',
        displayName: 'U Not Like Me',
        cover: "/imgs/covers/Get_Rich_Or_Die_Tryin'.png",
        artist: '50 Cent',
    },
    {
        path: '/audio/Future - The Percocet & Stripper Joint (Audio).mp3',
        displayName: 'The Percocet & Stripper Joint',
        cover: '/imgs/covers/ds2.png',
        artist: 'Future',
    },
    {
        path: '/audio/Young Thug - With That (feat. Duke) [HQ].mp3',
        displayName: 'With That',
        cover: '/imgs/covers/the barter 6.png',
        artist: 'Young Thug',
    }
];
let musicaIndex = 0;
let isPlaying = false;
function togglePlay() {
    if (isPlaying) {
        pauseMusica();
    } else {
        playMusica();
    }
}
function playMusica() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('titulo', 'Pause');
    musica.play();
    stopSlowSpinning();
    startSpinning();
}
function pauseMusica() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('titulo', 'Play');
    startSlowSpinning();
    musica.pause();
    stopSpinning();
}
function loadMusica(song) {
    musica.src = song.path;
    titulo.textContent = song.displayName;
    artist.textContent = song.artist;
    imagen.src = song.cover;
}
function changeMusica(direction) {
    musicaIndex = (musicaIndex + direction + temas.length) % temas.length;
    loadMusica(temas[musicaIndex]);
    playMusica();
}
function updateprogresoBar() {
    const { duration, currentTime } = musica;
    const progresoPorcentaje = (currentTime / duration) * 100;
    progreso.style.width = `${progresoPorcentaje}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}
function setprogresoBar(e) {
    const width = playerProgreso.clientWidth;
    const clickX = e.offsetX;
    musica.currentTime = (clickX / width) * musica.duration;
}
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => {
    if (musica.currentTime > 3) {
        musica.currentTime = 0;
    } else {
        changeMusica(-1);
    }
});
nextBtn.addEventListener('click', () => changeMusica(1));
musica.addEventListener('ended', () => changeMusica(1));
musica.addEventListener('timeupdate', updateprogresoBar);
playerProgreso.addEventListener('click', setprogresoBar);
loadMusica(temas[musicaIndex]);
function updateRotation(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    rotation += (delta / 5000) * 360; 
    rotation %= 360;

    imagen.style.transform = `rotate(${rotation}deg)`;
    spinInterval = requestAnimationFrame(updateRotation);
}
function startSpinning() {
    if (spinInterval) return; 

    const rotate = () => {
        rotation = (rotation + 0.65) % 360;
        imagen.style.transform = `rotate(${rotation}deg)`;
        spinInterval = requestAnimationFrame(rotate);
        imagen.classList.add('glow');
    };

    spinInterval = requestAnimationFrame(rotate);
    imagen.classList.add('glow');
}
function stopSpinning() {
    cancelAnimationFrame(spinInterval);
    spinInterval = null;
    imagen.classList.remove('glow');
}
function startSlowSpinning() {
    if (slowSpinInterval) return;

    const slowRotate = () => {
        rotation = (rotation + 0.1) % 360;
        imagen.style.transform = `rotate(${rotation}deg)`;
        slowSpinInterval = requestAnimationFrame(slowRotate);
    };

    slowSpinInterval = requestAnimationFrame(slowRotate);
}
function stopSlowSpinning() {
    cancelAnimationFrame(slowSpinInterval);
    slowSpinInterval = null;
}