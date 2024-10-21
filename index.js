// Selecciona elementos del DOM
const boton = document.getElementById('clickButton');
const vistasTexto = document.getElementById('vistas');
const toggleThemeButton = document.getElementById('toggleTheme');
const contactForm = document.getElementById('contactForm');
const upload = document.getElementById('upload');
const excelContainer = document.getElementById('excel-container');
const exportBtn = document.getElementById('export');

let workbook;

// Manejo del contador de vistas utilizando localStorage
let contadorVistas = parseInt(localStorage.getItem('contadorVistas')) || 0;

// Actualiza el texto al cargar la página
vistasTexto.innerText = 'Vistas: ' + contadorVistas;

// Evento para incrementar el contador y actualizar el texto
boton.addEventListener('click', function() {
    contadorVistas++; // Incrementa el contador
    vistasTexto.innerText = 'Vistas: ' + contadorVistas; // Actualiza el texto en la página
    localStorage.setItem('contadorVistas', contadorVistas); // Guarda el contador en localStorage

    if (contadorVistas === 100) {
        alert('¡Gracias, visitante número 100!');
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

// Función para leer y mostrar el archivo de Excel
upload.addEventListener('change', function(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convierte la hoja de cálculo a HTML y la inserta en el contenedor
        const html = XLSX.utils.sheet_to_html(worksheet);
        excelContainer.innerHTML = html;
    };
    
    reader.readAsArrayBuffer(file);
});

// Función para exportar el archivo modificado
exportBtn.addEventListener('click', function() {
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convierte el HTML modificado a un nuevo archivo Excel
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Crea un archivo de descarga
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'archivo_modificado.xlsx';
    link.click();
});
