document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LÓGICA DE PESTAÑAS Y CARGA ---
    const navLinks = document.querySelectorAll('.navbar li a');
    const contentSections = document.querySelectorAll('.content-section');
    const container = document.querySelector('.container');
    const loadingScreen = document.getElementById('loading-screen'); 

    const switchTab = (targetId) => {
        contentSections.forEach(section => section.classList.add('hidden'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            setTimeout(() => { targetSection.classList.remove('hidden'); }, 50); 
        }
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[data-target="${targetId}"]`);
        if (activeLink) activeLink.classList.add('active');
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if (targetId) switchTab(targetId);
        });
    });

    switchTab('home-section'); 

    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0'; 
            if (container) container.style.opacity = '1'; 
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
        }
    }, 2000);

    // --- 2. LÓGICA DE LA GALERÍA ---
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtnGal = document.querySelector('.prev-button');
    const nextBtnGal = document.querySelector('.next-button');
    let currentSlideIndex = 0;

    if (slides.length > 0 && prevBtnGal && nextBtnGal) {
        const moveToSlide = (idx) => {
            slides[currentSlideIndex].classList.replace('current-slide', 'hidden-slide');
            currentSlideIndex = idx;
            slides[currentSlideIndex].classList.replace('hidden-slide', 'current-slide');
        };
        nextBtnGal.addEventListener('click', () => moveToSlide((currentSlideIndex + 1) % slides.length));
        prevBtnGal.addEventListener('click', () => moveToSlide((currentSlideIndex - 1 + slides.length) % slides.length));
    }

    // --- 3. NUEVA LÓGICA DEL REPRODUCTOR (CON LISTA Y BOTÓN FLOTANTE) ---
    const songs = [
        { title: "Paulo Londra - Adan y Eva", file: "audio/Paulo Londra - Adan y Eva.mp3" },
        { title: "Nombre Canción 2", file: "audio/cancion2.mp3" },
        { title: "Nombre Canción 3", file: "audio/cancion3.mp3" }
    ];

    let songIndex = 0;
    const audio = document.getElementById('audio-player');
    const titleDisplay = document.getElementById('music-title');
    const playPauseBtn = document.getElementById('play-pause-button');
    const playIcon = document.getElementById('play-icon');
    const toggleBtn = document.getElementById('toggle-player-btn');
    const playerContainer = document.getElementById('floating-music-player');

    function loadSong(index) {
        const song = songs[index];
        titleDisplay.innerText = song.title;
        audio.src = song.file;
    }

    if (audio && playPauseBtn) {
        loadSong(songIndex);

        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(() => console.log("Error al reproducir"));
                playIcon.innerText = "⏸";
            } else {
                audio.pause();
                playIcon.innerText = "▶";
            }
        });

        document.getElementById('next-song').addEventListener('click', () => {
            songIndex = (songIndex + 1) % songs.length;
            loadSong(songIndex);
            audio.play();
            playIcon.innerText = "⏸";
        });

        document.getElementById('prev-song').addEventListener('click', () => {
            songIndex = (songIndex - 1 + songs.length) % songs.length;
            loadSong(songIndex);
            audio.play();
            playIcon.innerText = "⏸";
        });

        document.getElementById('volume-slider').addEventListener('input', (e) => {
            audio.volume = e.target.value;
        });
    }

    // Abrir/Cerrar con el botón 🎵
    if (toggleBtn && playerContainer) {
        toggleBtn.addEventListener('click', () => {
            playerContainer.classList.toggle('hidden-player');
            toggleBtn.innerHTML = playerContainer.classList.contains('hidden-player') ? "🎵" : "✖";
        });
    }
});
