// JS para la página del curso teórico

document.addEventListener('DOMContentLoaded', function() {
    // Animación simple de aparición para los bloques de clase
    const classBlocks = document.querySelectorAll('.class-block');
    classBlocks.forEach((block, i) => {
        block.style.opacity = 0;
        block.style.transform = 'translateY(30px)';
        setTimeout(() => {
            block.style.transition = 'opacity 0.7s, transform 0.7s';
            block.style.opacity = 1;
            block.style.transform = 'translateY(0)';
        }, 200 + i * 120);
    });

    // Desplegar/ocultar objetivos de cada clase (si se desea hacer interactivo)
    document.querySelectorAll('.toggle-objetivos').forEach(btn => {
        btn.addEventListener('click', function() {
            const objetivos = this.parentElement.querySelector('.objetivos');
            if (objetivos) {
                objetivos.classList.toggle('hidden');
                this.textContent = objetivos.classList.contains('hidden') ? 'Mostrar objetivos' : 'Ocultar objetivos';
            }
        });
    });
});