// Funcionalidad de la página de Mentoría

// Función para manejar el botón de volver
function handleBackButton() {
    // Navegar hacia atrás en el historial del navegador
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Si no hay historial, redirigir a la página principal
        window.location.href = '/';
    }
}

// Función para agregar efectos de hover a las listas
function addHoverEffects() {
    const listItems = document.querySelectorAll('li');
    
    listItems.forEach(item => {
        // Agregar efecto de desplazamiento al hacer hover
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('schedule-item') && !this.classList.contains('contact-item')) {
                this.style.transform = 'translateX(5px)';
                this.style.color = '#ffffff';
            }
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '#d1d5db';
        });
    });
}

// Función para agregar efectos de pulso al botón de WhatsApp
function addPulseEffect() {
    const whatsappButton = document.getElementById('whatsappButton');
    
    if (whatsappButton) {
        setInterval(() => {
            whatsappButton.style.transform = 'scale(1.05)';
            whatsappButton.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                whatsappButton.style.transform = 'scale(1)';
            }, 300);
        }, 4000);
    }
}

// Función para agregar efectos de animación escalonada
function addStaggeredAnimation() {
    const sections = [
        '.details-section',
        '.requirements-section', 
        '.program-section',
        '.resources-section',
        '.schedule-section',
        '.contact-section'
    ];
    
    sections.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'all 0.6s ease';
            }, 300 + (index * 100));
        }
    });
}

// Función para agregar efectos de scroll
function handleScrollEffects() {
    const sections = document.querySelectorAll('.details-section, .requirements-section, .program-section, .resources-section, .schedule-section, .contact-section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('animate-in');
        }
    });
}

// Función para mostrar información adicional al hacer hover en elementos clave
function addInfoTooltips() {
    const programItems = document.querySelectorAll('.program-list li');
    
    programItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Agregar un brillo sutil
            this.style.background = 'rgba(236, 77, 88, 0.1)';
            this.style.borderRadius = '4px';
            this.style.padding = '4px 8px';
            this.style.margin = '2px 0';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.padding = '0';
            this.style.margin = '0';
        });
    });
}

// Función para tracking de interacciones
function trackUserInteraction() {
    let interactionCount = 0;
    let sectionsViewed = new Set();
    
    // Tracking de clics
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
            interactionCount++;
            console.log(`Interacción ${interactionCount}: ${e.target.textContent}`);
        }
    });
    
    // Tracking de secciones vistas
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionClass = entry.target.className.split(' ')[0];
                sectionsViewed.add(sectionClass);
                
                if (sectionsViewed.size >= 3) {
                    console.log('Usuario muestra alto interés en la mentoría');
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.details-section, .requirements-section, .program-section').forEach(section => {
        observer.observe(section);
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const backgroundColor = type === 'success' ? '#16a34a' : '#ec4d58';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${backgroundColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para copiar información de contacto
function addCopyToClipboard() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.setAttribute('title', 'Clic para copiar');
        
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('Información copiada al portapapeles');
                }).catch(() => {
                    showNotification('Error al copiar', 'error');
                });
            } else {
                // Fallback para navegadores más antiguos
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showNotification('Información copiada al portapapeles');
                } catch (err) {
                    showNotification('Error al copiar', 'error');
                } finally {
                    document.body.removeChild(textArea);
                }
            }
        });
    });
}

// Event listeners principales
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botón de volver
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', handleBackButton);
    }
    
    // Agregar estilos CSS dinámicos
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .details-section,
        .requirements-section,
        .program-section,
        .resources-section,
        .schedule-section,
        .contact-section {
            opacity: 0;
            transform: translateY(20px);
        }
    `;
    document.head.appendChild(style);
    
    // Inicializar efectos
    addHoverEffects();
    addPulseEffect();
    addInfoTooltips();
    addCopyToClipboard();
    trackUserInteraction();
    
    // Animaciones de entrada
    setTimeout(() => {
        document.querySelector('.main-title').classList.add('animate-in');
        setTimeout(() => {
            document.querySelector('.info-card').classList.add('animate-in');
            setTimeout(() => {
                addStaggeredAnimation();
            }, 300);
        }, 200);
    }, 100);
});

// Agregar efecto de scroll
window.addEventListener('scroll', handleScrollEffects);

// Función para mostrar/ocultar detalles adicionales
function toggleDetails(sectionClass) {
    const section = document.querySelector(sectionClass);
    if (section) {
        section.classList.toggle('expanded');
    }
}