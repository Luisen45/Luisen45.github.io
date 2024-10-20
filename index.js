// Selecciona elementos del DOM
const boton = document.getElementById('clickButton');
const vistasTexto = document.getElementById('vistas');
const toggleThemeButton = document.getElementById('toggleTheme');
const contactForm = document.getElementById('contactForm');

// Manejo del contador de vistas utilizando localStorage
let contadorVistas = parseInt(localStorage.getItem('contadorVistas')) || 0;

// Actualiza el texto al cargar la página
vistasTexto.innerText = 'Vistas: ' + contadorVistas;

// Evento para incrementar el contador y actualizar el texto
boton.addEventListener('click', function() {
    if (contadorVistas < 100) {
        contadorVistas++; // Incrementa el contador
        vistasTexto.innerText = 'Vistas: ' + contadorVistas; // Actualiza el texto en la página
        localStorage.setItem('contadorVistas', contadorVistas); // Guarda el contador en localStorage

        if (contadorVistas === 100) {
            alert('¡Gracias, visitante número 100!');
        }
    } else {
        alert('Ya hemos alcanzado el límite de 100 visitas. ¡Gracias!');
    }
});

// Manejo del cambio de tema (oscuro y claro)
let currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme + '-mode');

toggleThemeButton.addEventListener('click', function() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    // Actualiza la clase del body
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    // Guarda el tema actual en localStorage
    localStorage.setItem('theme', currentTheme);
});

// Manejo del envío del formulario de contacto
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío real del formulario
    alert('Gracias por contactarnos, ' + document.getElementById('nombre').value + '!');
    contactForm.reset(); // Resetea el formulario
});
