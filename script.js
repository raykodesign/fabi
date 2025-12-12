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
    // --- Lógica del Carrusel de la Galería ---
    const galleryTrack = document.querySelector('.gallery-track');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentSlideIndex = 0;
    
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
});
// CÓDIGO A AGREGAR EN script.js (en la zona de const/variables)

const backgroundMusic = document.getElementById('background-music'); // Referencia al elemento de audio
const musicToggleButton = document.getElementById('music-toggle-button'); // Referencia al botón de control
const musicIcon = document.getElementById('music-icon'); // Referencia al ícono

// CÓDIGO A AGREGAR EN script.js (dentro del setTimeout principal)

// --- Lógica del Reproductor de Música ---
    if (musicToggleButton && backgroundMusic) {
        
        // Función para cambiar el estado y el ícono
        const toggleMusic = () => {
            if (backgroundMusic.paused) {
                // Intentar reproducir
                backgroundMusic.play().then(() => {
                    musicToggleButton.classList.remove('paused');
                    musicIcon.textContent = '🎶'; // Icono de reproducción
                }).catch(error => {
                    console.error("Fallo al intentar reproducir el audio:", error);
                    // Si falla, se queda en pausa y se mantiene el icono de silencio.
                    musicToggleButton.classList.add('paused');
                    musicIcon.textContent = '🔇';
                });
            } else {
                // Pausar
                backgroundMusic.pause();
                musicToggleButton.classList.add('paused');
                musicIcon.textContent = '🔇'; // Icono de silencio/pausa
            }
        };

        // Escuchar el evento click en el botón
        musicToggleButton.addEventListener('click', toggleMusic);
        
        // Inicializar el estado visual del botón (por si el autoplay falla)
        if (backgroundMusic.paused) {
             musicToggleButton.classList.add('paused');
             musicIcon.textContent = '🔇';
        } else {
             musicToggleButton.classList.remove('paused');
             musicIcon.textContent = '🎶';
        }
    }

// CÓDIGO A AGREGAR EN script.js (dentro del setTimeout principal)

            // NUEVO: INTENTO DE REPRODUCIR LA MÚSICA
            // ADVERTENCIA: Muchos navegadores modernos bloquean la reproducción automática (autoplay). 
            // Esto intenta iniciarla cuando la pantalla de carga desaparece.
            if (backgroundMusic) {
                backgroundMusic.volume = 0.5; // Ajusta el volumen (0.0 a 1.0)
                backgroundMusic.play().catch(error => {
                    console.warn("Autoplay bloqueado. La música se iniciará con el primer clic del usuario.", error);
                });
            }

