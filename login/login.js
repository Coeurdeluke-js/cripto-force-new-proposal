// Aviso - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Cargar navbar
    loadNavbar();
    
    // Generar estrellas de fondo
    createStars();
    
    // Inicializar efectos
    initializeEffects();
    
    // Inicializar eventos
    initializeEvents();
    
    // Inicializar animaciones
    initializeAnimations();
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
            
            // Marcar el elemento activo en la navbar si es necesario
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                // Remover clase activa de todos los enlaces
                link.classList.remove('active');
            });
        })
        .catch(error => {
            console.error('Error cargando navbar:', error);
        });
}

// Función para crear las estrellas de fondo
function createStars() {
    const stars = document.getElementById('stars');
    const count = 200;
    
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Posición aleatoria
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        // Tamaño aleatorio
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Delay aleatorio para la animación
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        stars.appendChild(star);
    }
}

// Función para inicializar efectos
function initializeEffects() {
    // Efecto de aparición del logo
    const logo = document.querySelector('.card-logo');
    if (logo) {
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, 500);
    }
    
    // Efecto de escritura para el título
    const title = document.querySelector('.main-title');
    if (title) {
        setTimeout(() => {
            title.style.opacity = '1';
        }, 800);
    }
    
    // Efecto de aparición para las descripciones
    const descriptions = document.querySelectorAll('.main-description, .secondary-description');
    descriptions.forEach((desc, index) => {
        setTimeout(() => {
            desc.style.opacity = '1';
            desc.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
}

// Función para inicializar eventos
function initializeEvents() {
    // Evento del botón de retorno
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', handleBackButton);
        
        // Efectos de hover mejorados
        backBtn.addEventListener('mouseenter', () => {
            backBtn.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        backBtn.addEventListener('mouseleave', () => {
            backBtn.style.transform = 'translateY(-2px) scale(1)';
        });
    }
    
    // Evento de redimensionamiento para reposicionar estrellas
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Evento para manejar el scroll (si es necesario)
    window.addEventListener('scroll', handleScroll);
}

// Función para manejar el botón de retorno
function handleBackButton() {
    // Crear efecto de ripple
    createRippleEffect(event, this);
    
    // Animación de salida
    const card = document.querySelector('.notification-card');
    if (card) {
        card.style.animation = 'fadeOut 0.5s ease-in forwards';
        
        setTimeout(() => {
            // Navegar al inicio
            window.location.href = '../index.html';
        }, 500);
    } else {
        // Fallback si no hay animación
        window.location.href = '../index.html';
    }
}

// Función para manejar el redimensionamiento
function handleResize() {
    // Recrear estrellas si es necesario
    const stars = document.getElementById('stars');
    if (stars && stars.children.length > 0) {
        // Limpiar estrellas existentes
        stars.innerHTML = '';
        // Crear nuevas estrellas
        createStars();
    }
}

// Función para manejar el scroll
function handleScroll() {
    const scrollY = window.scrollY;
    const stars = document.querySelectorAll('.star');
    
    // Efecto parallax sutil para las estrellas
    stars.forEach((star, index) => {
        const speed = (index % 3 + 1) * 0.1;
        star.style.transform = `translateY(${scrollY * speed}px)`;
    });
}

// Función para inicializar animaciones
function initializeAnimations() {
    // Animación de entrada para la tarjeta
    const card = document.querySelector('.notification-card');
    if (card) {
        // Observador de intersección para animaciones
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(card);
    }
}

// Función para crear efecto ripple
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        font-size: 0.875rem;
        z-index: 1000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        background: ${colors[type] || colors.info};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Función debounce para optimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para detectar el dispositivo
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para detectar movimiento reducido
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Función para optimizar rendimiento
function optimizePerformance() {
    if (isMobile() || prefersReducedMotion()) {
        // Reducir número de estrellas en dispositivos móviles
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index > 100) {
                star.remove();
            }
        });
    }
}

// Función para precargar recursos
function preloadResources() {
    // Precargar logo
    const logo = new Image();
    logo.src = 'public/logo.png';
    
    // Precargar íconos de Font Awesome
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    link.as = 'style';
    document.head.appendChild(link);
}

// Manejo de errores globales
window.addEventListener('error', (e) => {
    console.error('Error en aviso.js:', e.error);
    // Mostrar notificación de error si es necesario
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promesa rechazada:', e.reason);
});

// Añadir estilos CSS dinámicos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
    
    .animate-in {
        animation: fadeInUp 1s ease-out forwards;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .notification-card {
            animation: none !important;
        }
        
        .star {
            animation: none !important;
        }
        
        .back-button {
            transition: none !important;
        }
    }
`;
document.head.appendChild(style);

// Ejecutar optimizaciones al cargar
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    preloadResources();
});

// Limpiar recursos al descargar la página
window.addEventListener('beforeunload', () => {
    // Limpiar timers y eventos si es necesario
    const stars = document.getElementById('stars');
    if (stars) {
        stars.innerHTML = '';
    }
});