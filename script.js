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