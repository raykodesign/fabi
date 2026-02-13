document.addEventListener('DOMContentLoaded', () => {
    
    const loadingScreen = document.getElementById('loading-screen');
    const container = document.querySelector('.container');
    const audio = document.getElementById('audio-player');
    const playIcon = document.getElementById('play-icon');
    const playerContainer = document.getElementById('floating-music-player');
    
    // --- 0. BRILLO DEL MOUSE (Restaurado) ---
    const createSparkle = (e) => {
        if(Math.random() > 0.5) return; // Limitar cantidad
        const body = document.querySelector('body');
        const sparkle = document.createElement('div');
        sparkle.classList.add('mouse-sparkle');
        
        // Ajuste para posición global
        const x = e.clientX + (Math.random() * 10 - 5);
        const y = e.clientY + (Math.random() * 10 - 5);
        
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        
        body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    };

    // Activar solo en PC (donde hay mouse)
    document.addEventListener('mousemove', createSparkle);

    // --- Animaciones de entrada ---
    const elementsToAnimate = [
        document.querySelector('.glam-header'),
        document.querySelector('.navbar'),
        document.querySelector('.bio-card'),
        document.querySelector('.divider-gold'),
        document.querySelector('.friends-showcase h2')
    ];
    elementsToAnimate.forEach(el => { if(el) el.classList.add('reveal-wait'); });

    // --- Entrada al sitio ---
    let entered = false;
    const enterSite = () => {
        if (entered) return;
        entered = true;

        loadingScreen.style.opacity = '0';
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 800);
        container.style.opacity = '1';

        if (audio) {
            audio.volume = 0.5;
            audio.play().then(() => {
                playIcon.classList.remove('ph-play');
                playIcon.classList.add('ph-pause');
            }).catch(() => {});
        }

        let delay = 100;
        elementsToAnimate.forEach((el) => {
            if(el) {
                setTimeout(() => { el.classList.add('reveal-visible'); }, delay);
                delay += 100;
            }
        });

        const friends = document.querySelectorAll('.friend-gem');
        friends.forEach((friend, i) => {
            setTimeout(() => { friend.classList.add('pop-in'); }, delay + (i * 30));
        });
    };

    if (loadingScreen) loadingScreen.addEventListener('click', enterSite);

    // --- Tabs ---
    const navLinks = document.querySelectorAll('.navbar li a');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            contentSections.forEach(s => s.classList.add('hidden'));
            document.getElementById(targetId).classList.remove('hidden');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // --- Galería ---
    const slides = document.querySelectorAll('.carousel-track img');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentIndex = 0;

    const updateGallery = () => {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentIndex) slide.classList.add('active');
        });
    };

    if (slides.length > 0) {
        if(nextBtn) nextBtn.addEventListener('click', () => { 
            currentIndex = (currentIndex + 1) % slides.length; 
            updateGallery(); 
        });
        if(prevBtn) prevBtn.addEventListener('click', () => { 
            currentIndex = (currentIndex - 1 + slides.length) % slides.length; 
            updateGallery(); 
        });
    }

    // --- Reproductor ---
    const songs = [
        { title: "Paulo Londra - Adan y Eva", file: "audio/Paulo Londra - Adan y Eva.mp3" },
        { title: "Canción 2", file: "audio/cancion2.mp3" }
    ];
    let songIndex = 0;
    const playPauseBtn = document.getElementById('play-pause-button');
    const titleDisplay = document.getElementById('music-title');

    const loadSong = (i) => {
        if(songs[i] && titleDisplay) {
            titleDisplay.innerText = songs[i].title;
            audio.src = songs[i].file;
        }
    };
    loadSong(0);

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playIcon.classList.remove('ph-play');
                playIcon.classList.add('ph-pause');
            } else {
                audio.pause();
                playIcon.classList.remove('ph-pause');
                playIcon.classList.add('ph-play');
            }
        });
        document.getElementById('volume-slider').addEventListener('input', (e) => audio.volume = e.target.value);
    }
    
    document.getElementById('toggle-player-btn').addEventListener('click', () => {
        playerContainer.classList.toggle('hidden-player');
    });
});
