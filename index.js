// Inicializa el contador de vistas en 0
let contadorVistas = 0;

// Selecciona el botón y el párrafo de "vistas" en el HTML
const boton = document.getElementById('clickButton');
const vistasTexto = document.getElementById('vistas');

// Añade un evento para el botón que incremente el contador y actualice el texto
boton.addEventListener('click', function() {
    contadorVistas++; // Incrementa el contador
    vistasTexto.innerText = 'Vistas: ' + contadorVistas; // Actualiza el texto en la página
});
