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