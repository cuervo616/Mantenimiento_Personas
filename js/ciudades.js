const ciudadesPorPais = {
    1: ["Quito", "Cuenca"],
    2: ["Bogotá", "Medellín"],
    3: ["Lima", "Cusco"]
};
const paisSelect = document.getElementById('pais_user');
const ciudadSelect = document.getElementById('ciudad_user');

function actualizarCiudades() {
    const paisSeleccionado = parseInt(paisSelect.value);

    // Limpiar opciones actuales
    ciudadSelect.innerHTML = '<option value="0">Seleccionar Ciudad</option>';

    if (ciudadesPorPais[paisSeleccionado]) {
        // Agregar nuevas opciones
        ciudadesPorPais[paisSeleccionado].forEach((ciudad, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = ciudad;
            ciudadSelect.appendChild(option);
        });
    }
}

paisSelect.addEventListener("change",actualizarCiudades);
