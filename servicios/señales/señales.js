document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad del botón de regreso
    const backButton = document.getElementById('backButton');
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Intenta ir hacia atrás en el historial del navegador
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Si no hay historial, redirige a la página principal
                window.location.href = '../index.html';
            }
        });
    }
    
    // Efectos de hover mejorados para botones
    const buttons = document.querySelectorAll('.whatsapp-button, .back-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animación de aparición progresiva para las listas
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
    
    // Observar elementos para animaciones
    const listItems = document.querySelectorAll('.benefits-list li, .trust-list li');
    listItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Animación de escritura para el título principal
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
        
        setTimeout(typeWriter, 300);
    }
    
    // Efecto de pulso para el botón de WhatsApp
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        setInterval(() => {
            whatsappButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                whatsappButton.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
    
    // Contador de beneficios visible
    const benefitItems = document.querySelectorAll('.benefits-list li');
    let visibleBenefits = 0;
    
    const benefitObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                visibleBenefits++;
                entry.target.classList.add('counted');
                
                // Agregar efecto de destacado
                entry.target.style.background = 'linear-gradient(90deg, rgba(236, 77, 88, 0.1), transparent)';
                entry.target.style.borderLeft = '3px solid #ec4d58';
                entry.target.style.paddingLeft = '1rem';
                entry.target.style.borderRadius = '0 4px 4px 0';
                
                setTimeout(() => {
                    entry.target.style.background = 'transparent';
                    entry.target.style.borderLeft = 'none';
                    entry.target.style.paddingLeft = '1.5rem';
                    entry.target.style.borderRadius = '0';
                }, 2000);
            }
        });
    }, { threshold: 0.5 });
    
    benefitItems.forEach(item => {
        benefitObserver.observe(item);
    });
    
    // Efecto de partículas en el fondo (sutil)
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = 'rgba(236, 77, 88, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
    
    // Crear partículas ocasionalmente
    setInterval(createParticle, 5000);
    
    // Efecto de smooth scroll mejorado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});