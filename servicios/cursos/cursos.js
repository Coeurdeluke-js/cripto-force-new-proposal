// Funcionalidad del botón de regreso
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Intenta ir hacia atrás en el historial del navegador
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Si no hay historial, redirige a la página principal
                window.location.href = '/';
            }
        });
    }
    
    // Agregar efectos de hover adicionales con JavaScript
    const courseButtons = document.querySelectorAll('.course-button');
    
    courseButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efecto de aparición suave para las tarjetas
    const courseCards = document.querySelectorAll('.course-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    courseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Efecto de escritura para el título principal
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const titleText = mainTitle.textContent;
        mainTitle.textContent = '';
        mainTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < titleText.length) {
                mainTitle.textContent += titleText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
});