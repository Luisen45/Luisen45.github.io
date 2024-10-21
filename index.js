const upload = document.getElementById('upload');
const excelContainer = document.getElementById('excel-container');
const exportBtn = document.getElementById('export');

let workbook;

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
