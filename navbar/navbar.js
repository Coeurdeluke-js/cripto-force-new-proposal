// navbar.js - Navegación interna para estructura sin carpeta estatica
function setupNavbarNavigation(container = document) {
    const pageRoutes = {
        index: 'index.html',
        intro: 'intro/intro.html',
        quienessomos: 'quienessomos/quienessomos.html',
        servicios: 'servicios/servicios.html',
        contacto: 'contacto/contacto.html',
        game: 'game/game.html'
    };
    function getRelativeBase() {
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        if (pathParts.length <= 1) return '';
        let base = '';
        for (let i = 1; i < pathParts.length; i++) base += '../';
        return base;
    }
    function navigateTo(page) {
        if (pageRoutes[page]) {
            window.location.href = getRelativeBase() + pageRoutes[page];
        }
    }
    function handleNavigation(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        if (page) navigateTo(page);
    }
    const navSelectors = [
        '.nav-link',
        '.nav-mobile-icon',
        '.mobile-nav-link',
        '.game-button',
        '.mobile-game-button'
    ];
    navSelectors.forEach(selector => {
        container.querySelectorAll(selector).forEach(element => {
            element.removeEventListener('click', handleNavigation);
            element.addEventListener('click', handleNavigation);
        });
    });
}

// Exportar función para uso global
window.setupNavbarNavigation = setupNavbarNavigation;