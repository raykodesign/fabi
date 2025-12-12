document.addEventListener('DOMContentLoaded', () => {
    console.log('Xatspace-like page loaded!');

    const navLinks = document.querySelectorAll('.navbar li a');
    const contentSections = document.querySelectorAll('.content-section');
    const container = document.querySelector('.container');
    const loadingScreen = document.getElementById('loading-screen');

    // 1. Lógica de Pestañas (Mejorada)
    const switchTab = (targetId) => {
        contentSections.forEach(section => section.classList.add('hidden'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            setTimeout(() => {
                targetSection.classList.remove('hidden');
            }, 50);
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

    // 2. Lógica del Carrusel (Con seguridad para evitar que el script muera)
    const slides = document.querySelectorAll('.gallery-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentSlideIndex = 0;

    if (slides.length > 0 && prevButton && nextButton) {
        const moveToSlide = (targetIndex) => {
            slides[currentSlideIndex].classList.remove('current-slide');
            slides[currentSlideIndex].classList.add('hidden-slide');
            currentSlideIndex = targetIndex;
            slides[currentSlideIndex].classList.remove('hidden-slide');
            slides[currentSlideIndex].classList.add('current-slide');
        };

        nextButton.addEventListener('click', () => {
            let nextIndex = (currentSlideIndex + 1) % slides.length;
            moveToSlide(nextIndex);
        });

        prevButton.addEventListener('click', () => {
            let prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            moveToSlide(prevIndex);
        });
    }

    // 3. Lógica del Reproductor (Segura)
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause-button');
    const volumeSlider = document.getElementById('volume-slider');

    if (audioPlayer && playPauseButton && volumeSlider) {
        audioPlayer.volume = volumeSlider.value;
        playPauseButton.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play().catch(err => console.log("Autoplay bloqueado"));
                playPauseButton.innerHTML = '<span>⏸</span>';
            } else {
                audioPlayer.pause();
                playPauseButton.innerHTML = '<span>▶</span>';
            }
        });
        volumeSlider.addEventListener('input', () => {
            audioPlayer.volume = volumeSlider.value;
        });
    }

    // 4. INICIAR PANTALLA DE CARGA (Movido para asegurar ejecución)
    switchTab('home-section');

    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            if (container) container.style.opacity = '1';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);
});
