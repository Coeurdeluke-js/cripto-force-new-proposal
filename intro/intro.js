// Introducción - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Cargar navbar
    loadNavbar();
    
    // Inicializar funcionalidad del video
    initializeVideoPlayer();
    
    // Inicializar efectos de scroll
    initializeScrollEffects();
    
    // Inicializar animaciones
    initializeAnimations();
    
    // Manejar mensaje de volumen
    handleVolumeMessage();
});

// Función para cargar la navbar
function loadNavbar() {
    fetch('../navbar/navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la navbar');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('navbar-container').innerHTML = html;
            
            // Marcar el elemento activo en la navbar
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '../intro/intro.html' || 
                    link.textContent.trim().toLowerCase() === 'introducción') {
                    link.classList.add('active');
                }
            });
        })
        .catch(error => {
            console.error('Error cargando navbar:', error);
        });
}

// Función para inicializar el reproductor de video
function initializeVideoPlayer() {
    const video = document.getElementById('introVideo');
    const volumeMessage = document.getElementById('volumeMessage');
    
    if (!video || !volumeMessage) return;
    
    // Configurar video
    video.addEventListener('loadedmetadata', function() {
        console.log('Video cargado correctamente');
    });
    
    video.addEventListener('error', function(e) {
        console.error('Error al cargar el video:', e);
        showVideoError();
    });
    
    // Evento cuando el video comienza a reproducirse
    video.addEventListener('play', function() {
        hideVolumeMessage();
    });
    
    // Evento cuando el video se pausa
    video.addEventListener('pause', function() {
        // Optionally show volume message again if needed
    });
    
    // Precargar metadata del video
    video.preload = 'metadata';
    
    // Configurar controles personalizados si es necesario
    setupCustomControls(video);
}

// Función para manejar el mensaje de volumen
function handleVolumeMessage() {
    const volumeMessage = document.getElementById('volumeMessage');
    
    if (!volumeMessage) return;
    
    // Ocultar mensaje al hacer clic en cualquier parte
    document.addEventListener('click', function() {
        hideVolumeMessage();
    }, { once: true });
    
    // Ocultar mensaje al presionar cualquier tecla
    document.addEventListener('keydown', function() {
        hideVolumeMessage();
    }, { once: true });
    
    // Ocultar mensaje después de 5 segundos automáticamente
    setTimeout(() => {
        hideVolumeMessage();
    }, 5000);
}

// Función para ocultar el mensaje de volumen
function hideVolumeMessage() {
    const volumeMessage = document.getElementById('volumeMessage');
    if (volumeMessage && !volumeMessage.classList.contains('hidden')) {
        volumeMessage.classList.add('hidden');
        
        // Remover completamente después de la animación
        setTimeout(() => {
            if (volumeMessage.parentNode) {
                volumeMessage.remove();
            }
        }, 300);
    }
}

// Función para mostrar error del video
function showVideoError() {
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'video-error';
        errorMessage.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar el video</p>
                <small>Verifica que el archivo exista en la ruta correcta</small>
            </div>
        `;
        videoWrapper.appendChild(errorMessage);
    }
}

// Función para configurar controles personalizados
function setupCustomControls(video) {
    // Agregar control de velocidad de reproducción
    video.addEventListener('loadedmetadata', function() {
        if (video.playbackRate !== 1) {
            video.playbackRate = 1;
        }
    });
    
    // Manejar teclas de acceso rápido
    document.addEventListener('keydown', function(e) {
        if (document.activeElement === video) {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    video.paused ? video.play() : video.pause();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    video.currentTime = Math.max(0, video.currentTime - 10);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    video.currentTime = Math.min(video.duration, video.currentTime + 10);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    video.volume = Math.min(1, video.volume + 0.1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    video.volume = Math.max(0, video.volume - 0.1);
                    break;
            }
        }
    });
}

// Función para inicializar efectos de scroll
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar párrafos con delay
                if (entry.target.classList.contains('content-text')) {
                    animateTextContent(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos
    const elementsToObserve = document.querySelectorAll('.section-title, .content-text');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Función para animar contenido de texto
function animateTextContent(textContainer) {
    const paragraphs = textContainer.querySelectorAll('p');
    paragraphs.forEach((paragraph, index) => {
        setTimeout(() => {
            paragraph.style.opacity = '1';
            paragraph.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Función para inicializar animaciones
function initializeAnimations() {
    // Animar título principal
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        observeElement(mainTitle, () => {
            mainTitle.style.opacity = '1';
            mainTitle.style.transform = 'translateY(0)';
        });
    }
    
    // Animar wrapper del video
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        videoWrapper.style.opacity = '0';
        videoWrapper.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            videoWrapper.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            videoWrapper.style.opacity = '1';
            videoWrapper.style.transform = 'translateY(0)';
        }, 200);
    }
}

// Función helper para observar elementos
function observeElement(element, callback) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(element);
}

// Función para manejar el scroll suave
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Función para detectar si es dispositivo móvil
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Función para optimizar rendimiento en móviles
function optimizeForMobile() {
    if (isMobileDevice()) {
        // Reducir calidad de video en móviles si es necesario
        const video = document.getElementById('introVideo');
        if (video) {
            video.preload = 'none';
        }
        
        // Simplificar animaciones
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .video-wrapper:hover {
                    transform: none !important;
                }
                
                .volume-message:hover .volume-content {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Función para manejar el cambio de tamaño de ventana
function handleResize() {
    // Recalcular dimensiones si es necesario
    const video = document.getElementById('introVideo');
    if (video) {
        // Mantener aspect ratio
        const wrapper = video.closest('.video-wrapper');
        if (wrapper) {
            const rect = wrapper.getBoundingClientRect();
            console.log('Video dimensions:', rect.width, rect.height);
        }
    }
}

// Event listeners
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', () => {
    setTimeout(handleResize, 100);
});

// Función para precargar recursos
function preloadResources() {
    // Precargar video si no está siendo usado
    const video = document.getElementById('introVideo');
    if (video && video.networkState === video.NETWORK_IDLE) {
        video.load();
    }
    
    // Precargar fuentes
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
}

// Función para manejar errores globales
function handleGlobalErrors() {
    window.addEventListener('error', (e) => {
        console.error('Error global en intro.js:', e.error);
        
        // Mostrar mensaje de error amigable si es crítico
        if (e.error && e.error.message.includes('video')) {
            showVideoError();
        }
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Promise rechazada:', e.reason);
    });
}

// Función para agregar estilos dinámicos
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .video-error {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            z-index: 20;
        }
        
        .error-content {
            text-align: center;
            padding: 2rem;
        }
        
        .error-content i {
            font-size: 3rem;
            color: #ec4d58;
            margin-bottom: 1rem;
        }
        
        .error-content p {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }
        
        .error-content small {
            color: #ccc;
            font-size: 0.9rem;
        }
        
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Inicializar todo
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    handleGlobalErrors();
    optimizeForMobile();
    preloadResources();
});

// Cleanup al salir de la página
window.addEventListener('beforeunload', () => {
    const video = document.getElementById('introVideo');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
});