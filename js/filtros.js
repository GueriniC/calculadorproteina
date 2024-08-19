// Función de búsqueda
document.getElementById("search").onchange = () => {
    const inputValue = document.getElementById("search").value.trim().toLowerCase();
    const productosSearch = productosProteina.filter(producto => 
        producto.nombre.toLowerCase().includes(inputValue) || 
        producto.marca.toLowerCase().includes(inputValue) || 
        producto.descripcion.toLowerCase().includes(inputValue)
    );
    mostrarProductos(productosSearch);
};

// Inicializar filtros
function aplicarFiltros() {
    const filtroNombre = document.getElementById('filtroNombre').value.toLowerCase();
    const filtroMarca = document.getElementById('filtroMarca').value.toLowerCase();

    const productosFiltrados = productosProteina.filter(producto => {
        return (filtroNombre === "" || producto.nombre.toLowerCase().includes(filtroNombre)) &&
               (filtroMarca === "" || producto.marca.toLowerCase().includes(filtroMarca));
    });

    mostrarProductos(productosFiltrados);
}

function inicializarFiltros() {
    const filtroNombre = document.getElementById('filtroNombre');
    const filtroMarca = document.getElementById('filtroMarca');

    filtroNombre.innerHTML = '<option value="">Nombre producto</option>';
    filtroMarca.innerHTML = '<option value="">Marca</option>';

    // Filtrar por nombre
    const nombres = [...new Set(productosProteina.map(producto => producto.nombre.toLowerCase()))];
    nombres.forEach(nombre => {
        const option = document.createElement('option');
        option.value = nombre;
        option.textContent = capitalizeFirstLetter(nombre);
        filtroNombre.appendChild(option);
    });

    // Filtrar por marca
    const marcas = [...new Set(productosProteina.map(producto => producto.marca.toLowerCase()))];
    marcas.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = capitalizeFirstLetter(marca);
        filtroMarca.appendChild(option);
    });

    // Añadir eventos de cambio a los filtros
    filtroNombre.addEventListener('change', aplicarFiltros);
    filtroMarca.addEventListener('change', aplicarFiltros);
}


