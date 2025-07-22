// Datos de los servicios
const servicios = [
    {
        icon: "fas fa-user-graduate",
        title: "Mentoría",
        description: "Recibe orientación personalizada de traders expertos que te guiarán en tu camino hacia el éxito en el trading de criptomonedas.",
        link: "/servicios/mentoria/mentoria.html",
        buttonText: "Más Información",
    },
    {
        icon: "fas fa-book-open",
        title: "Cursos",
        description: "Accede a nuestro contenido educativo completo sobre trading, análisis técnico y gestión de riesgos.",
        link: "/servicios/cursos/cursos.html",
        buttonText: "Ver Cursos",
    },
    {
        icon: "fas fa-chart-line",
        title: "Señales",
        description: "Recibe alertas y análisis de trading en tiempo real para aprovechar las mejores oportunidades del mercado.",
        link: "/servicios/señales/señales.html",
        buttonText: "Obtener Señales",
    },
    {
        icon: "fas fa-robot",
        title: "Bot de Trading",
        description: "Trading automático con rentabilidad dinámica de entre el 10% y 20% mensual. Funcionamiento las 24 horas, los 7 días de la semana. Mínimo 500 USDT. Descuentos en comisiones según nivel de fondeo.",
        link: "/servicios/bot/bot.html",
        buttonText: "Activar Bot",
    },
];

// Función para crear el HTML de una tarjeta de servicio
function createServiceCard(servicio, index) {
    return `
        <div class="service-card">
            <div class="service-card-bg"></div>
            <div class="service-card-content">
                <div>
                    <h3 class="service-title">${servicio.title}</h3>
                    <p class="service-description">${servicio.description}</p>
                </div>
                <a href="${servicio.link}" class="service-link">
                    <span>${servicio.buttonText}</span>
                    <i class="${servicio.icon}"></i>
                </a>
            </div>
        </div>
    `;
}

// Función para renderizar todos los servicios
function renderServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (servicesGrid) {
        servicesGrid.innerHTML = servicios.map((servicio, index) => 
            createServiceCard(servicio, index)
        ).join('');
    }
}

// Inicializar la página cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    renderServices();
});