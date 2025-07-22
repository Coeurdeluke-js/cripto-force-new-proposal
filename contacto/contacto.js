// Contacto - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Cargar navbar
    loadNavbar();
    
    // Inicializar efectos
    initializeEffects();
    
    // Observador de intersección para animaciones
    initializeIntersectionObserver();
    
    // Inicializar eventos de hover
    initializeHoverEffects();
    
    // Inicializar eventos de botones
    initializeButtonEvents();
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
                if (link.getAttribute('href') === '../contacto/contacto.html' || 
                    link.textContent.trim().toLowerCase() === 'contacto') {
                    link.classList.add('active');
                }
            });
        })
        .catch(error => {
            console.error('Error cargando navbar:', error);
        });
}

// Función para inicializar efectos
function initializeEffects() {
    // Efecto de aparición suave para el título
    const title = document.querySelector('.main-title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Efecto de aparición para la descripción
    const description = document.querySelector('.main-description');
    if (description) {
        description.style.opacity = '0';
        description.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            description.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            description.style.opacity = '1';
            description.style.transform = 'translateY(0)';
        }, 400);
    }
}

// Función para inicializar el observador de intersección
function initializeIntersectionObserver() {
    const cards = document.querySelectorAll('.contact-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach((card, index) => {
        // Configurar estado inicial
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(card);
    });
}

// Función para inicializar efectos de hover
function initializeHoverEffects() {
    const cards = document.querySelectorAll('.contact-card');
    
    cards.forEach(card => {
        const icon = card.querySelector('.contact-icon');
        
        card.addEventListener('mouseenter', () => {
            // Efecto de partículas (simulado con pseudo-elementos)
            createHoverEffect(card);
        });
        
        card.addEventListener('mouseleave', () => {
            // Limpiar efectos
            removeHoverEffect(card);
        });
        
        // Efecto de click para dispositivos táctiles
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// Función para inicializar eventos de botones
function initializeButtonEvents() {
    const buttons = document.querySelectorAll('.contact-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
            
            // Log del evento para analytics
            const cardTitle = this.closest('.contact-card').querySelector('.contact-title').textContent;
            console.log(`Botón clickeado: ${cardTitle}`);
            
            // Mostrar notificación
            if (this.getAttribute('href').includes('mailto:')) {
                showNotification('Abriendo cliente de correo...', 'info');
            } else if (this.getAttribute('href').includes('wa.me')) {
                showNotification('Abriendo WhatsApp...', 'success');
            } else if (this.getAttribute('href').includes('instagram')) {
                showNotification('Abriendo Instagram...', 'info');
            }
        });
        
        // Efecto de hover mejorado
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Función para crear efecto hover
function createHoverEffect(card) {
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    ripple.style.position = 'absolute';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.background = 'radial-gradient(circle, rgba(236, 77, 88, 0.3) 0%, transparent 70%)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 1s linear infinite';
    ripple.style.top = Math.random() * rect.height + 'px';
    ripple.style.left = Math.random() * rect.width + 'px';
    
    card.appendChild(ripple);
    
    // Crear múltiples partículas
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            if (card.contains(ripple)) {
                const particle = ripple.cloneNode();
                particle.style.top = Math.random() * rect.height + 'px';
                particle.style.left = Math.random() * rect.width + 'px';
                particle.style.animationDelay = Math.random() * 0.5 + 's';
                card.appendChild(particle);
                
                setTimeout(() => {
                    if (card.contains(particle)) {
                        card.removeChild(particle);
                    }
                }, 1000);
            }
        }, i * 200);
    }
}

// Función para remover efecto hover
function removeHoverEffect(card) {
    const ripples = card.querySelectorAll('[style*="ripple"]');
    ripples.forEach(ripple => {
        if (card.contains(ripple)) {
            ripple.style.animation = 'ripple-out 0.3s ease-out forwards';
            setTimeout(() => {
                if (card.contains(ripple)) {
                    card.removeChild(ripple);
                }
            }, 300);
        }
    });
}

// Función para crear efecto ripple en botones
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
        animation: button-ripple 0.6s ease-out;
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

// Función para detectar el dispositivo
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para optimizar rendimiento en dispositivos móviles
function optimizeForMobile() {
    if (isMobile()) {
        // Reducir efectos en dispositivos móviles
        const cards = document.querySelectorAll('.contact-card');
        cards.forEach(card => {
            card.style.transition = 'transform 0.2s ease';
        });
    }
}

// Función para copiar email al clipboard
function copyEmailToClipboard(email) {
    navigator.clipboard.writeText(email).then(() => {
        showNotification('Email copiado al portapapeles', 'success');
    }).catch(() => {
        showNotification('Error al copiar email', 'error');
    });
}

// Eventos de redimensionamiento
window.addEventListener('resize', () => {
    optimizeForMobile();
});

// Añadir estilos CSS dinámicos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes ripple-out {
        0% {
            transform: scale(1);
            opacity: 0.3;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
    
    @keyframes button-ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .contact-card.active {
        transform: scale(1.02);
        box-shadow: 0 10px 30px rgba(236, 77, 88, 0.2);
    }
    
    @media (prefers-reduced-motion: reduce) {
        .contact-card {
            animation: none !important;
            transition: none !important;
        }
        
        .contact-icon {
            transition: none !important;
        }
        
        .contact-button {
            transition: none !important;
        }
    }
`;
document.head.appendChild(style);

// Inicializar optimizaciones
document.addEventListener('DOMContentLoaded', () => {
    optimizeForMobile();
});

// Manejo de errores globales
window.addEventListener('error', (e) => {
    console.error('Error en contacto.js:', e.error);
});

// Función para precargar recursos
function preloadResources() {
    // Precargar íconos de Font Awesome si es necesario
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    link.as = 'style';
    document.head.appendChild(link);
}

// Ejecutar precarga
preloadResources();