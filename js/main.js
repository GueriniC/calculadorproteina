/*PARTE 1: CALCULADORA*/
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let nombre = capitalizeFirstLetter(document.getElementById('nombre').value);
    let peso = parseFloat(document.getElementById('peso').value);
    let genero = document.getElementById('genero').value;
    let estiloVida = document.getElementById('estiloVida').value;
    let objetivo = document.getElementById('objetivo').value;

    // Mostrar saludo basado en el género
    let saludo;
    if (genero === "masculino") {
        saludo = `Bienvenido ${nombre}`;    
    } else if (genero === "femenino") {
        saludo = `Bienvenida ${nombre}`;
    } else {
        saludo = `Hola ${nombre}`;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    document.getElementById("saludo").innerText = saludo;

    // Calcular la proteína total
    let proteinaTotal = calcularProteina(peso, genero, estiloVida, objetivo);

    // Mostrar el resultado
    document.getElementById("resultado").innerHTML = `${nombre}, necesitas consumir aproximadamente <span class="proteinatexto">${proteinaTotal.toFixed(2)} gramos de proteína</span> al día.`;
});

function calcularProteina(peso, genero, estiloVida, objetivo) {
    // primero: genero
    let calculadoraGenero;
    if (genero === "masculino") {
        calculadoraGenero = 1.80;
    } else if (genero === "femenino") {
        calculadoraGenero = 1.70;
    } else {
        calculadoraGenero = 1.75;
    }

    // segundo: estilo de vida
    const calculoEstiloVida = estiloVida => estiloVida === "sedentario" ? 1.0 : 1.2;
    let calculadoraEstiloVida = calculoEstiloVida(estiloVida);

    // tercero: objetivo
    let calculadoraObjetivo;
    switch (objetivo) {
        case "perder peso":
            calculadoraObjetivo = 1.2;
            break;
        case "mantener peso":
            calculadoraObjetivo = 1.0;
            break;
        case "ganar músculo":
            calculadoraObjetivo = 1.5;
            break;
    }

    // Cálculo con todas las variables
    let proteinaTotal = peso * calculadoraGenero * calculadoraEstiloVida * calculadoraObjetivo;
    return proteinaTotal;
}


////////////////////////////////////////////

/*PARTE 2: E-commerce*/
// Lista de productos   
const productosProteina = [
            {
                id: 1,
                marca: "Isopure",
                nombre: "Isopure Protein Powder Plant based",
                precio: 70776,
                peso: 521,
                imagen: "assets/isopure_plantbased.webp"
            },
            {
                id: 2,
                marca: "Isopure",
                nombre: "Isopure Zero Carb Protein",
                precio: 55009,
                peso: 454,
                imagen: "assets/isopure_zerocarbs.webp"
            },
            {
                id: 3,
                marca: "Isopure",
                nombre: "Isopure Protein Powder infusions",
                precio: 76107,
                peso: 454,
                imagen: "assets/isopure_powderinfusions.webp"

            },
            {
                id: 4,
                marca: "BSN",
                nombre: "Whey Protein BSN Syntha-6",
                precio: 131112,
                peso: 2268,
                sabores: ["vainilla", "Strawberry"],
                imagen: "assets/bsn_wp6.webp",
            },
            {
                id: 5,
                marca: "BSN",
                nombre: "Whey Protein BSN Syntha-6 Edge",
                precio: 139859,
                peso: 1814,
                sabores: ["vainilla", "Strawberry"],
                imagen: "assets/bsn_wp6-edge.webp",
            },
            {
                id: 6,
                marca: "Optimum Nutrition",
                nombre: "Whey Protein ON 100% Whey Gold",
                precio: 109071,
                peso: 907,
                sabores: ["Cookies and Cream", "Strawberry", "Mocha Capuccino"],
                imagen: "assets/on-gold.webp",

            },
            {
                id: 7,
                marca: "Muscletech",
                nombre: "Nitro Tech 100% Whey Gold Protein",
                precio: 83335,
                peso: 907,
                sabores: ["Double Rich Chocolate", "Milk Chocolate", "Strawberry Shortcake"],
                imagen: "assets/nitro-wheygold.webp",
            }
];

// Mostrar productos (producto con sus datos + boton para agregar producto)
function mostrarProductos(productos) {
    let productList = document.getElementById("product-list");
    productList.innerHTML = ''; 

    productos.forEach((producto) => {
        let contenedor = document.createElement("div");
        contenedor.className = "card";
        contenedor.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p class="productoMarca">${producto.marca}</p>
            <h3>${producto.nombre}</h3>
            <p class="productoCantidad">Cantidad: ${producto.peso}gr</p>
            <p>$${producto.precio}</p>
            ${producto.sabores ? 
                `<label for="sabores-${producto.id}">Sabores:</label>
                <select id="sabores-${producto.id}">
                    ${producto.sabores.map(sabor => `<option value="${sabor}">${sabor}</option>`).join('')}
                </select>` 
                : ""}
            <button onclick="agregarProducto(${producto.id})">Agregar</button>
        `;
        productList.appendChild(contenedor);
    });
}
// Llamar a prodcutos(mostrarProductos) al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productosProteina);
});



/*FILTROS*/
document.getElementById('filtroNombre').addEventListener('change', aplicarFiltros);
document.getElementById('filtroMarca').addEventListener('change', aplicarFiltros);

function aplicarFiltros() {
    let filtroNombre = document.getElementById('filtroNombre').value.toLowerCase();
    let filtroMarca = document.getElementById('filtroMarca').value;

    let productosFiltrados = productosProteina.filter(producto => {
        return (filtroNombre === "" || producto.nombre.toLowerCase().includes(filtroNombre)) &&
               (filtroMarca === "" || producto.marca === filtroMarca)
            });

        mostrarProductos(productosFiltrados);
    }

function inicializarFiltros() {
    let filtroNombre = document.getElementById('filtroNombre');
    let filtroMarca = document.getElementById('filtroMarca');

    // Nombre
    let nombres = [...new Set(productosProteina.map(producto => producto.nombre))];
    nombres.forEach(nombre => {
        let option = document.createElement('option');
        option.value = nombre.toLowerCase();
        option.textContent = nombre;
        filtroNombre.appendChild(option);
    });

    // Marca
    let marcas = [...new Set(productosProteina.map(producto => producto.marca))];
    marcas.forEach(marca => {
        let option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        filtroMarca.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', inicializarFiltros);


//CARRITO de compras
let carrito = [];

function agregarProducto(productoID){
    const product = productosProteina.find(p => p.id === productoID);
    const saborSelect = document.getElementById(`sabores-${productoID}`);
    const sabor = saborSelect ? saborSelect.value : null;

    if (product) {
        const productoConID = { ...product, sabor, uniqueId: Date.now() };
        carrito.push(productoConID);
        updateCart();
        mostrarNotificacionProductoAgregado(product.nombre); 
    }
}

function mostrarNotificacionProductoAgregado(nombreProducto) {
    const notificacionDiv = document.getElementById("product-agregado");

    if (notificacionDiv) {
        notificacionDiv.innerText = `${nombreProducto} agregado`;
        notificacionDiv.style.display = "block";

        setTimeout(() => {
            notificacionDiv.style.display = "none";
        }, 3000);
    }
}

function eliminarProducto(uniqueId) {
    carrito = carrito.filter(producto => producto.uniqueId !== uniqueId);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const cartContador = document.getElementById("cart-contador");

    cartItems.innerHTML = '';
    let total = 0;
    let totalItems = carrito.length;

    if (totalItems === 0) {
        cartItems.innerHTML = '<p>No hay productos en el carrito</p>';
    } else {
        carrito.forEach(product => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
            <div>
                <div>
                    <p>${product.nombre}</p>
                    <p>${product.sabor ? `Sabor: ${product.sabor}` : ''}</p>
                </div>
                $${product.precio}
                <button onclick="eliminarProducto(${product.uniqueId})">X</button>
            </div>
            `;
            cartItems.appendChild(cartItem);
            total += product.precio; 
        });

        const totalElement = document.createElement("div");
        totalElement.className = "cart-total";
        totalElement.innerHTML = `
            <p>Total: $${total}</p>
        `;
        cartItems.appendChild(totalElement);
    }

    const closeButton = document.createElement("button");
    closeButton.innerText = "Cerrar";
    closeButton.onclick = function() {
        cartItems.style.display = "none";
    };
    cartItems.appendChild(closeButton);

    totalPrice.innerText = `$${total.toFixed(2)}`;
    cartContador.innerText = `${totalItems}`;

    // Guardar carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}



function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        updateCart();
    }
}

// Llamar a cargarCarrito al cargar la página
window.onload = cargarCarrito;

// Función para mostrar/ocultar el carrito
let botondeCarrito = document.getElementById("botonCarritoID");
botondeCarrito.addEventListener("click", botonCarrito);

function botonCarrito() {
    const cartItems = document.getElementById("cart-items");
    if (cartItems.style.display === "block") {
        cartItems.style.display = "none";
    } else {
        cartItems.style.display = "block";
    }
}

