// navbar-loader.js - Adaptado para estructura sin carpeta estatica
let navbarLoaded = false;

async function loadNavbar() {
    if (navbarLoaded) return;
    try {
        const container = document.getElementById('navbar-container');
        if (!container) return;
        // Siempre carga desde la raíz relativa
        const navbarPath = getNavbarPath();
        const response = await fetch(navbarPath);
        if (!response.ok) throw new Error('No se pudo cargar la navbar');
        const navbarHTML = await response.text();
        container.innerHTML = navbarHTML;
        navbarLoaded = true;
        setTimeout(() => {
            if (typeof setupNavbarNavigation === 'function') {
                setupNavbarNavigation(container);
            }
            initializeNavbar();
        }, 50);
    } catch (error) {
        console.error('Error al cargar la navbar:', error);
    }
}

function getNavbarPath() {
    // Calcula la ruta relativa a partir de la ubicación actual
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length <= 1) {
        return 'navbar/navbar.html';
    } else {
        let rel = '';
        for (let i = 1; i < pathParts.length; i++) rel += '../';
        return rel + 'navbar/navbar.html';
    }
}

// Cargar la navbar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}

function initializeNavbar() {
    console.log('=== INICIALIZANDO NAVBAR ===');
    
    // Elementos del DOM
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenuBtn = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    const navMobileCollapsed = document.querySelector('.nav-mobile-collapsed');
    const navMobileIcons = document.querySelector('.nav-mobile-icons');
    const body = document.body;
    
    // Verificar que los elementos existen
    if (!mobileMenuBtn || !closeMobileMenuBtn || !mobileMenu) {
        console.error('Elementos clave de la navbar no encontrados');
        console.log('mobileMenuBtn:', mobileMenuBtn);
        console.log('closeMobileMenuBtn:', closeMobileMenuBtn);
        console.log('mobileMenu:', mobileMenu);
        return;
    }
    
    console.log('Elementos de navbar encontrados correctamente');
    
    // Variables de estado
    let isMenuOpen = false;
    let isNavbarExpanded = false;
    let touchStartY = 0;
    let touchEndY = 0;
    let expandTimer = null;
    let lastScrollTop = 0;
    let inactivityTimer = null;
    
    // ========== FUNCIONES DE CONTROL DEL MENÚ MÓVIL ==========
    
    function expandMobileNavbar() {
        if (isNavbarExpanded || window.innerWidth >= 768) return;
        
        isNavbarExpanded = true;
        if (navMobileCollapsed) {
            navMobileCollapsed.classList.add('expanded');
        }
        
        clearTimeout(expandTimer);
        expandTimer = setTimeout(() => {
            collapseMobileNavbar();
        }, 3000);
    }
    
    function collapseMobileNavbar() {
        if (!isNavbarExpanded) return;
        
        isNavbarExpanded = false;
        if (navMobileCollapsed) {
            navMobileCollapsed.classList.remove('expanded');
        }
        clearTimeout(expandTimer);
    }
    
    function openMobileMenu() {
        if (isMenuOpen) return;
        
        isMenuOpen = true;
        mobileMenu.classList.add('active');
        if (mobileBackdrop) mobileBackdrop.classList.add('active');
        mobileMenuBtn.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        body.classList.add('mobile-menu-open');
        
        setTimeout(() => {
            if (closeMobileMenuBtn) {
                closeMobileMenuBtn.focus();
            }
        }, 300);
        
        animateMenuItems();
    }
    
    function closeMobileMenu() {
        if (!isMenuOpen) return;
        
        isMenuOpen = false;
        mobileMenu.classList.remove('active');
        if (mobileBackdrop) mobileBackdrop.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        body.classList.remove('mobile-menu-open');
        
        setTimeout(() => {
            if (mobileMenuBtn) {
                mobileMenuBtn.focus();
            }
        }, 300);
    }
    
    function toggleMobileMenu() {
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function animateMenuItems() {
        const menuItems = document.querySelectorAll('.mobile-nav-link, .mobile-game-button');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${(index + 1) * 0.1}s`;
        });
    }
    
    // ========== EVENT LISTENERS ==========
    
    // Botón de menú móvil
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });
    
    // Botón de cerrar menú móvil
    closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    closeMobileMenuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeMobileMenu();
        }
    });
    
    // Backdrop del menú móvil
    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Navbar móvil colapsada
    if (navMobileCollapsed) {
        navMobileCollapsed.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 768) return;
            expandMobileNavbar();
        });
        
        navMobileCollapsed.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 768) return;
            clearTimeout(expandTimer);
            expandTimer = setTimeout(() => {
                collapseMobileNavbar();
            }, 1000);
        });
        
        navMobileCollapsed.addEventListener('touchstart', (e) => {
            if (window.innerWidth >= 768) return;
            touchStartY = e.touches[0].clientY;
            expandMobileNavbar();
        });
    }
    
    // Iconos móviles
    const mobileIcons = document.querySelectorAll('.nav-mobile-icon');
    mobileIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            expandMobileNavbar();
            clearTimeout(expandTimer);
            expandTimer = setTimeout(() => {
                collapseMobileNavbar();
            }, 1500);
        });
    });
    
    // Enlaces del menú móvil
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-game-button');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                closeMobileMenu();
            }, 100);
        });
    });
    
    // Scroll con throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = Math.abs(scrollTop - lastScrollTop);
            
            if (scrollDelta > 10 && window.innerWidth < 768) {
                expandMobileNavbar();
            }
            
            lastScrollTop = scrollTop;
        }, 10);
    }, { passive: true });
    
    // Resize de ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            closeMobileMenu();
        }
        if (window.innerWidth >= 768 && isNavbarExpanded) {
            collapseMobileNavbar();
        }
    });
    
    // Hacer la función closeMobileMenu disponible globalmente
    window.closeMobileMenu = closeMobileMenu;
    
    // ========== INICIALIZACIÓN DE NAVEGACIÓN ==========
    
    // Configurar la navegación
    if (typeof setupNavbarNavigation === 'function') {
        setupNavbarNavigation(document);
        console.log('Navegación configurada con setupNavbarNavigation');
    } else {
        console.warn('setupNavbarNavigation no está disponible, usando fallback');
        // Fallback: configurar navegación básica
        setupBasicNavigation();
    }
    
    // Inicializar estado según pantalla
    if (window.innerWidth < 768) {
        collapseMobileNavbar();
    }
    
    console.log('Navbar inicializada correctamente');
    console.log('=============================');
}

// Función de navegación básica como fallback
function setupBasicNavigation() {
    console.log('=== CONFIGURANDO NAVEGACIÓN BÁSICA ===');
    
    const pageRoutes = {
        index: 'index.html',
        intro: 'intro/intro.html',
        quienessomos: 'quienessomos/quienessomos.html',
        servicios: 'servicios/servicios.html',
        contacto: 'contacto/contacto.html',
        game: 'game/game.html'
    };
    
    // Función para obtener la base URL relativa
    function getRelativeBase() {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter(Boolean);
        
        console.log('getRelativeBase - currentPath:', currentPath);
        console.log('getRelativeBase - pathParts:', pathParts);
        
        // Remover el archivo HTML del final si existe
        let cleanPathParts = [...pathParts];
        if (cleanPathParts.length > 0 && cleanPathParts[cleanPathParts.length - 1].includes('.html')) {
            cleanPathParts.pop();
        }
        
        console.log('getRelativeBase - cleanPathParts:', cleanPathParts);
        
        let base = '';
        const estaticaIndex = cleanPathParts.indexOf('estatica');
        
        if (estaticaIndex !== -1) {
            // Estamos dentro de estatica, subir hasta la carpeta estatica
            const levelsFromEstatica = cleanPathParts.length - (estaticaIndex + 1);
            console.log('getRelativeBase - levelsFromEstatica:', levelsFromEstatica);
            
            for (let i = 0; i < levelsFromEstatica; i++) {
                base += '../';
            }
        } else {
            // No estamos en estatica, subir los niveles necesarios
            for (let i = 0; i < cleanPathParts.length; i++) {
                base += '../';
            }
        }
        
        console.log('getRelativeBase - base calculada:', base);
        return base;
    }
    
    function navigateTo(page) {
        if (pageRoutes[page]) {
            const baseUrl = getRelativeBase();
            const fullUrl = baseUrl + pageRoutes[page];
            
            console.log('=== NAVEGANDO (BÁSICA) ===');
            console.log('Página:', page);
            console.log('Ruta:', pageRoutes[page]);
            console.log('Base:', baseUrl);
            console.log('URL completa:', fullUrl);
            console.log('==========================');
            
            window.location.href = fullUrl;
        } else {
            console.error('Página no encontrada:', page);
        }
    }
    
    // Configurar event listeners
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) {
                navigateTo(page);
                if (typeof window.closeMobileMenu === 'function') {
                    setTimeout(window.closeMobileMenu, 100);
                }
            }
        });
    });
    
    console.log('Navegación básica configurada');
    console.log('=====================================');
}

// ========== FUNCIÓN DE RETRY ==========
function retryLoadNavbar(maxRetries = 3, currentRetry = 0) {
    if (currentRetry >= maxRetries) {
        console.error('No se pudo cargar la navbar después de', maxRetries, 'intentos');
        showNavbarError();
        return;
    }
    
    setTimeout(() => {
        console.log(`Reintentando cargar navbar (intento ${currentRetry + 1}/${maxRetries})...`);
        navbarLoaded = false;
        loadNavbar().catch(() => {
            retryLoadNavbar(maxRetries, currentRetry + 1);
        });
    }, 1000 * (currentRetry + 1)); // Delay incremental
}

// ========== CARGA AUTOMÁTICA ==========
function initializeNavbarLoader() {
    console.log('=== INICIALIZANDO NAVBAR LOADER ===');
    console.log('URL actual:', window.location.href);
    console.log('Pathname:', window.location.pathname);
    
    // Verificar si ya existe el contenedor
    const container = document.getElementById('navbar-container');
    if (!container) {
        console.warn('Contenedor navbar-container no encontrado, reintentando...');
        setTimeout(initializeNavbarLoader, 500);
        return;
    }
    
    console.log('Contenedor navbar-container encontrado');
    
    if (document.readyState === 'loading') {
        console.log('DOM cargándose, esperando DOMContentLoaded');
        document.addEventListener('DOMContentLoaded', () => {
            loadNavbar().catch(() => {
                retryLoadNavbar();
            });
        });
    } else {
        console.log('DOM ya cargado, iniciando navbar');
        loadNavbar().catch(() => {
            retryLoadNavbar();
        });
    }
    
    console.log('==================================');
}

// ========== FUNCIÓN DE DEBUG ==========
function debugNavbarPaths() {
    console.log('=== DEBUG NAVBAR PATHS ===');
    console.log('window.location.pathname:', window.location.pathname);
    console.log('window.location.href:', window.location.href);
    console.log('Calculated navbar path:', determineNavbarPath());
    console.log('Document ready state:', document.readyState);
    console.log('Navbar loaded:', navbarLoaded);
    
    // Verificar estructura de archivos
    console.log('=== VERIFICANDO ESTRUCTURA ===');
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    console.log('Path parts:', pathParts);
    
    const estaticaIndex = pathParts.indexOf('estatica');
    if (estaticaIndex !== -1) {
        console.log('Carpeta estatica encontrada en índice:', estaticaIndex);
    } else {
        console.log('No se encontró carpeta estatica');
    }
    
    console.log('===============================');
}

// Exponer funciones de debug globalmente
window.debugNavbarPaths = debugNavbarPaths;
window.loadNavbar = loadNavbar;
window.determineNavbarPath = determineNavbarPath;

// Ejecutar solo si no se ha cargado ya
if (!navbarLoaded) {
    initializeNavbarLoader();
}