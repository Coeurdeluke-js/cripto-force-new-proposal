// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initGame();
});

// Función principal de inicialización
function initGame() {
    loadNavbar();
    setupHoverEffects();
}

// Cargar navbar existente
function loadNavbar() {
    // Aquí cargas tu navbar existente
    // Ejemplo: fetch('navbar.html').then(response => response.text()).then(html => {
    //     document.getElementById('navbar-container').innerHTML = html;
    // });
    
    // Por ahora, solo marcamos como cargado
    console.log('Navbar container ready');
}

// Configurar efectos hover simples
function setupHoverEffects() {
    const gameCard = document.querySelector('.game-card');
    
    if (gameCard) {
        gameCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        gameCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
}

// Función para volver atrás
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/';
    }
}

// Función para integrar con navbar existente
function integrateNavbar() {
    // Marcar enlace activo si existe
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.textContent.includes('Sith') || link.textContent.includes('Game')) {
            link.classList.add('active');
        }
    });
}