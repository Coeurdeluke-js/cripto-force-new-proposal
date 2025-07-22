// Función para alternar los detalles de Zoomex
function toggleZoomexDetails() {
    const details = document.getElementById('zoomexDetails');
    const btn = document.getElementById('toggleBtn');
    
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        details.classList.add('visible');
        btn.setAttribute('aria-expanded', 'true');
    } else {
        details.classList.remove('visible');
        details.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
    }
}

// Intersection Observer para animaciones (equivalente al useEffect)
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(
        '.zwtc-header, .zwtc-description, .zwtc-text, .zwtc-benefits, .zwtc-dates, .key-points, .video-guide, .opportunity-section'
    );

    elements.forEach((el) => observer.observe(el));
});

// Función para actualizar meta tags según el tema del usuario
function updateSocialMediaMetaTags() {
    // Detectar el tema del usuario
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Seleccionar el logo apropiado según el tema
    const logoImage = isDarkMode ? 'public/images/logo-dark-theme.png' : 'public/images/logo-white-theme.png';
    const logoAlt = isDarkMode ? 'Crypto Force - Logo Tema Oscuro' : 'Crypto Force - Logo Tema Claro';
    
    // Actualizar meta tags de Open Graph
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    
    if (ogImage) {
        ogImage.setAttribute('content', logoImage);
    }
    
    if (ogImageAlt) {
        ogImageAlt.setAttribute('content', logoAlt);
    }
    
    // Actualizar meta tags de Twitter
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    const twitterImageAlt = document.querySelector('meta[name="twitter:image:alt"]');
    
    if (twitterImage) {
        twitterImage.setAttribute('content', logoImage);
    }
    
    if (twitterImageAlt) {
        twitterImageAlt.setAttribute('content', logoAlt);
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateSocialMediaMetaTags();
    
    // Escuchar cambios en el tema del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        updateSocialMediaMetaTags();
    });
});
