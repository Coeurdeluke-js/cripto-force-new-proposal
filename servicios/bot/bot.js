// Funcionalidad del Bot de Trading

// Función para manejar el botón de WhatsApp
function handleWhatsAppRedirect() {
    window.open('https://chat.whatsapp.com/JQJT3H0KE4u7WNiVc8QqxU', '_blank');
}

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

// Función para agregar efectos de animación al hacer scroll
function handleScrollEffects() {
    const elements = document.querySelectorAll('.info-card, .main-title');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// Función para agregar efectos de hover a las listas
function addHoverEffects() {
    const listItems = document.querySelectorAll('li');
    
    listItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Función para agregar efectos de pulso al botón de WhatsApp
function addPulseEffect() {
    const whatsappButton = document.getElementById('whatsappButton');
    
    setInterval(() => {
        whatsappButton.style.transform = 'scale(1.05)';
        whatsappButton.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            whatsappButton.style.transform = 'scale(1)';
        }, 300);
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botón de WhatsApp
    const whatsappButton = document.getElementById('whatsappButton');
    whatsappButton.addEventListener('click', handleWhatsAppRedirect);
    
    // Configurar botón de volver
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', handleBackButton);
    
    // Agregar efectos de hover
    addHoverEffects();
    
    // Agregar efecto de pulso al botón de WhatsApp
    addPulseEffect();
    
    // Agregar clase para animaciones CSS
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
        
        .info-card {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .main-title {
            opacity: 0;
            transform: translateY(30px);
        }
    `;
    document.head.appendChild(style);
    
    // Activar animaciones iniciales
    setTimeout(() => {
        document.querySelector('.main-title').classList.add('animate-in');
        setTimeout(() => {
            document.querySelector('.info-card').classList.add('animate-in');
        }, 200);
    }, 100);
});

// Agregar efecto de scroll suave
window.addEventListener('scroll', handleScrollEffects);

// Función para mostrar notificación de éxito (opcional)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #16a34a;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para validar si el usuario está interesado (opcional)
function trackUserInteraction() {
    let interactionCount = 0;
    
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'LI') {
            interactionCount++;
            
            if (interactionCount >= 3) {
                // Usuario parece interesado
                console.log('Usuario muestra interés en el bot de trading');
            }
        }
    });
}