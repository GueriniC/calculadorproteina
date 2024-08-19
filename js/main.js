let productosProteina = [];

// Cargar productos desde JSON
fetch('./db/data.json')
    .then(response => response.json())
    .then(productos => {
        productosProteina = productos;
        mostrarProductos(productos);
        inicializarFiltros(); 
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });

// Mostrar productos (producto con sus datos + botón para agregar producto)
function mostrarProductos(productos) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; 

    productos.forEach(producto => {
        const contenedor = document.createElement("div");
        contenedor.className = "card";
        contenedor.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p class="productoMarca">${producto.marca}</p>
            <h3>${producto.nombre}</h3>
            <p class="productoCantidad">Cantidad: ${producto.peso}gr</p>
            <p class=productoPrecio>$ ${producto.precio}</p>
            ${producto.sabores ? 
                `<label for="sabores-${producto.id}"></label>
                <select id="sabores-${producto.id}">
                    ${producto.sabores.map(sabor => `<option value="${sabor}">${sabor}</option>`).join('')}
                </select>` 
                : ""}
            <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
        `;
        productList.appendChild(contenedor);
    });

    document.querySelectorAll('.btn-agregar').forEach(button => {
        button.addEventListener('click', function() {
            agregarProducto(parseInt(this.dataset.id));
        });
    });
}

// Función para capitalizar la primera letra
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


