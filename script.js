document.addEventListener('DOMContentLoaded', () => {
    console.log('Xatspace-like page loaded with dynamic tab switching!');

    const navLinks = document.querySelectorAll('.navbar li a');
    const contentSections = document.querySelectorAll('.content-section');
    const container = document.querySelector('.container');
    const loadingScreen = document.getElementById('loading-screen'); 

    // Función principal para cambiar la pestaña SIN SALIR de la página
    const switchTab = (targetId) => {
        // 1. Ocultar TODAS las secciones (añadiendo la clase 'hidden')
        contentSections.forEach(section => {
            section.classList.add('hidden'); 
        });

        // 2. Mostrar la sección deseada (quitando la clase 'hidden')
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            // Usamos un pequeño timeout para asegurar que el DOM responda
            setTimeout(() => {
                 targetSection.classList.remove('hidden'); 
            }, 50); 
        }

        // 3. Actualizar el estado 'active' en la navegación (estilo visual)
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[data-target="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    };
    
    // --- Lógica del Carrusel de la Galería (CORREGIDA CON COMPROBACIONES DE SEGURIDAD) ---
    const galleryTrack = document.querySelector('.gallery-track');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentSlideIndex = 0;
    
    // SOLO EJECUTAR LA LÓGICA SI TENEMOS SUFICIENTES SLIDES Y AMBOS BOTONES
    if (slides.length > 0 && prevButton && nextButton) { 
        
        // Función para mostrar la diapositiva específica
        const moveToSlide = (targetIndex) => {
            // 1. Ocultar la diapositiva actual
            slides[currentSlideIndex].classList.remove('current-slide');
            slides[currentSlideIndex].classList.add('hidden-slide');
            
            // 2. Actualizar el índice
            currentSlideIndex = targetIndex;
            
            // 3. Mostrar la nueva diapositiva
            slides[currentSlideIndex].classList.remove('hidden-slide');
            slides[currentSlideIndex].classList.add('current-slide');
        };

        // Event Listener para el botón Siguiente
        nextButton.addEventListener('click', () => {
            let nextIndex = currentSlideIndex + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0; // Volver al inicio
            }
            moveToSlide(nextIndex);
        });

        // Event Listener para el botón Anterior
        prevButton.addEventListener('click', () => {
            let prevIndex = currentSlideIndex - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1; // Ir al final
            }
            moveToSlide(prevIndex);
        });
    } 

    // Agregar event listeners a los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // MUY IMPORTANTE: Previene el comportamiento por defecto de saltar a #
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                switchTab(targetId);
            }
            
            // Efecto de click visual rápido (opcional)
            link.classList.add('clicked-effect');
            setTimeout(() => {
                link.classList.remove('clicked-effect');
            }, 300);
        });
    });

    // Iniciar el sistema mostrando la pestaña de inicio por defecto
    switchTab('home-section'); 
    
    
    // --- Lógica de la Pantalla de Carga ---
    // Ocultar la pantalla de carga después de 2 segundos (simulado)
    setTimeout(() => {
        if (loadingScreen && container) {
            // Animación de salida (opacidad a 0)
            loadingScreen.style.opacity = '0'; 
            
            // Mostrar el contenedor principal
            container.style.opacity = '1'; 
            
            // Remover el elemento del DOM después de la transición
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500); // 500ms es la duración de la transición en CSS
        }
    }, 2000); // 2 segundos de espera

    // --- Lógica del Reproductor de Música Flotante (AHORA SIEMPRE SE EJECUTA) ---
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause-button');
    const volumeSlider = document.getElementById('volume-slider');
    const playIcon = '▶';
    const pauseIcon = '⏸';

    if (audioPlayer && playPauseButton && volumeSlider) {
        
        // Inicializar el volumen
        audioPlayer.volume = volumeSlider.value;

        // Controlar Reproducción/Pausa
        playPauseButton.addEventListener('click', () => {
            if (audioPlayer.paused) {
                // Intentar reproducir y manejar el error de autoplay (si ocurre)
                audioPlayer.play().then(() => {
                    playPauseButton.innerHTML = `<span class="icon-pause">${pauseIcon}</span>`;
                    console.log("Música iniciada por interacción del usuario.");
                }).catch(error => {
                    console.warn("La reproducción automática ha fallado. Motivo: Bloqueo del navegador o ruta de archivo incorrecta.", error);
                });
            } else {
                audioPlayer.pause();
                playPauseButton.innerHTML = `<span class="icon-play">${playIcon}</span>`;
            }
        });

        // Actualizar el botón al cambiar el estado (por ejemplo, si termina la canción)
        audioPlayer.addEventListener('play', () => {
            playPauseButton.innerHTML = `<span class="icon-pause">${pauseIcon}</span>`;
        });
        audioPlayer.addEventListener('pause', () => {
            playPauseButton.innerHTML = `<span class="icon-play">${playIcon}</span>`;
        });

        // Controlar el volumen
        volumeSlider.addEventListener('input', () => {
            audioPlayer.volume = volumeSlider.value;
        });

    } else {
        console.error("No se encontraron todos los elementos del reproductor de audio.");
    }
});
