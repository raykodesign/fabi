document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS ---
    const loadingScreen = document.getElementById('loading-screen');
    const container = document.querySelector('.container');
    const audio = document.getElementById('audio-player');
    const playIcon = document.getElementById('play-icon');
    const playerContainer = document.getElementById('floating-music-player');
    
    // Preparar elementos para animación (añadir clases invisibles)
    const elementsToAnimate = [
        document.querySelector('.glam-header'),
        document.querySelector('.navbar'),
        document.querySelector('.bio-card'),
        document.querySelector('.divider-gold'),
        document.querySelector('.friends-showcase h2')
    ];
    
    // Añadir clase de espera a los bloques grandes
    elementsToAnimate.forEach(el => {
        if(el) el.classList.add('reveal-wait');
    });

    // --- 1. LÓGICA DE ENTRADA (MÚSICA + ANIMACIÓN) ---
    // Necesitamos interacción del usuario para que el navegador permita autoplay
    let entered = false;

    const enterSite = () => {
        if (entered) return;
        entered = true;

        // 1. Ocultar pantalla de carga
        loadingScreen.style.opacity = '0';
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 800);
        
        // 2. Mostrar contenedor principal
        container.style.opacity = '1';

        // 3. INICIAR MÚSICA (Autoplay forzado por click)
        if (audio) {
            audio.volume = 0.5;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    playIcon.classList.remove('ph-play');
                    playIcon.classList.add('ph-pause');
                    playerContainer.classList.remove('paused');
                }).catch(error => {
                    console.log("Autoplay prevenido por navegador:", error);
                });
            }
        }

        // 4. ANIMACIÓN EN CASCADA (Uno por uno)
        let delay = 200; // Tiempo inicial

        // Animar bloques principales
        elementsToAnimate.forEach((el) => {
            if(el) {
                setTimeout(() => {
                    el.classList.add('reveal-visible');
                }, delay);
                delay += 200; // Siguiente elemento tarda 200ms más
            }
        });

        // Animar amigos (efecto dominó rápido)
        const friends = document.querySelectorAll('.friend-gem');
        friends.forEach((friend) => {
            setTimeout(() => {
                friend.classList.add('pop-in');
            }, delay);
            delay += 50; // Muy rápido entre amigo y amigo
        });
    };

    // Al cargar, esperar click
    if (loadingScreen) {
        loadingScreen.addEventListener('click', enterSite);
        // También permitir entrar con tecla Enter
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') enterSite();
        });
    }

    // --- 0. EFECTO DE MOUSE (Polvo de Hadas) ---
    const createSparkle = (e) => {
        if(Math.random() > 0.5) return; // No crear en cada pixel para rendimiento
        const body = document.querySelector('body');
        const sparkle = document.createElement('div');
        sparkle.classList.add('mouse-sparkle');
        
        const x = e.pageX + (Math.random() * 10 - 5);
        const y = e.pageY + (Math.random() * 10 - 5);
        
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        
        const size = Math.random() * 3 + 2; 
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    };

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', createSparkle);
    }

    // --- 2. TABS & GALERÍA ---
    const navLinks = document.querySelectorAll('.navbar li a');
    const contentSections = document.querySelectorAll('.content-section');

    const switchTab = (targetId) => {
        // Ocultar suavemente
        contentSections.forEach(section => {
            section.style.opacity = '0';
            setTimeout(() => section.classList.add('hidden'), 300);
        });
        
        // Mostrar nuevo
        setTimeout(() => {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                // Pequeño reflow para activar transición
                void targetSection.offsetWidth; 
                targetSection.style.opacity = '1';
                
                // Si es la sección de inicio, reanimar los elementos si se desea
                if(targetId === 'home-section') {
                    // Opcional: reiniciar animaciones
                }
            }
        }, 300);

        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.navbar a[data-target="${targetId}"]`);
        if (activeLink) activeLink.classList.add('active');
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if (targetId) switchTab(targetId);
        });
    });

    // Galería
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

    if (prevBtn && nextBtn && slides.length > 0) {
        nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % slides.length; updateGallery(); });
        prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateGallery(); });
        setInterval(() => { currentIndex = (currentIndex + 1) % slides.length; updateGallery(); }, 5000);
    }

    // --- 3. REPRODUCTOR ---
    const songs = [
        { title: "Paulo Londra - Adan y Eva", file: "audio/Paulo Londra - Adan y Eva.mp3" },
        { title: "Canción 2", file: "audio/cancion2.mp3" }
    ];
    let songIndex = 0;
    const titleDisplay = document.getElementById('music-title');
    const playPauseBtn = document.getElementById('play-pause-button');
    const toggleBtn = document.getElementById('toggle-player-btn');

    const loadSong = (index) => {
        const song = songs[index];
        titleDisplay.innerText = `${song.title} • `;
        audio.src = song.file;
    };

    if (audio && playPauseBtn) {
        loadSong(songIndex);

        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playIcon.classList.remove('ph-play');
                playIcon.classList.add('ph-pause');
                playerContainer.classList.remove('paused');
            } else {
                audio.pause();
                playIcon.classList.remove('ph-pause');
                playIcon.classList.add('ph-play');
                playerContainer.classList.add('paused');
            }
        });
        
        // Control volumen
        document.getElementById('volume-slider').addEventListener('input', (e) => audio.volume = e.target.value);
        
        // Siguiente canción automática
        audio.addEventListener('ended', () => {
            songIndex = (songIndex + 1) % songs.length;
            loadSong(songIndex);
            audio.play();
        });
    }

    // Mostrar/Ocultar Player
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            playerContainer.classList.toggle('hidden-player');
        });
    }
});
