// CARRITO de compras
let carrito = [];

// Cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        updateCart();
    }
}

// Guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


function agregarProducto(productoID) {
    const product = productosProteina.find(p => p.id === productoID);
    const saborSelect = document.getElementById(`sabores-${productoID}`);
    const sabor = saborSelect ? saborSelect.value : null;

    if (product) {
        const productoExistente = carrito.find(item => item.id === productoID && item.sabor === sabor);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            const productoConID = { ...product, sabor, cantidad: 1, uniqueId: Date.now() };
            carrito.push(productoConID);
        }
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

function vaciarCarrito() {
    carrito = [];
    updateCart();
}

    
document.getElementById('cerrar-carrito').addEventListener('click', function() {
    document.getElementById("background-cart-items").style.display = "none";
    document.getElementById("cart-items").style.display = "none";
});

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const cartContador = document.getElementById("cart-contador");

    cartItems.innerHTML = '';

    let total = 0;
    let totalItems = 0;

    if (carrito.length === 0) {
        cartItems.innerHTML = '<p>Tu carrito está vacío</p>';
    } else {
        const cartItemsContenedor = document.createElement("div");
        cartItemsContenedor.className = "cart-item-products-contenedor";
        cartItems.appendChild(cartItemsContenedor);

        carrito.forEach(product => {
            const cantidad = product.cantidad || 0;
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item-product";
            cartItem.innerHTML = `
                <div>
                    <p>${product.nombre}</p>
                    <p>${product.sabor ? `Sabor: ${product.sabor}` : ''}</p>
                    <p>Cantidad: ${cantidad}</p>
                </div>
                <div>
                    <button class="btn-eliminar" data-id="${product.uniqueId}">X</button>
                    <p>$${(product.precio * cantidad).toFixed(2)}</p>
                </div>
            `;
            cartItemsContenedor.appendChild(cartItem);
            total += product.precio * cantidad;
            totalItems += cantidad;
        });

        // Crear contenedor para los botones del carrito
        const cartItemsBotones = document.createElement("div");
        cartItemsBotones.className = "cart-items-botones";

        // Crear elemento para mostrar el total
        const totalElement = document.createElement("p");
        totalElement.className = "cart-total";
        totalElement.innerHTML = `
            <span>Total: </span>
            <span>$${total.toFixed(2)}</span>`;
        cartItemsBotones.appendChild(totalElement);

        // Crear botón de "Finalizar compra"
        const finalizarCompraBtn = document.createElement("button");
        finalizarCompraBtn.id = "finalizar-compra";
        finalizarCompraBtn.innerText = "Comprar";
        finalizarCompraBtn.onclick = PopUpCompra;
        cartItemsBotones.appendChild(finalizarCompraBtn);
        
        // Crear botón de "Vaciar carrito"
        const vaciarCarritoBtn = document.createElement("button");
        vaciarCarritoBtn.id = "vaciar-carrito";
        vaciarCarritoBtn.innerText = "Vaciar carrito";
        vaciarCarritoBtn.onclick = vaciarCarrito;
        cartItemsBotones.appendChild(vaciarCarritoBtn);

        // Añadir el contenedor de botones al carrito
        cartItems.appendChild(cartItemsBotones);
    }

    totalPrice.innerText = `$${total.toFixed(2)}`;
    cartContador.innerText = `${totalItems}`;

    // Guardar carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Añadir evento para eliminar producto
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-eliminar')) {
        const uniqueId = parseInt(event.target.dataset.id);
        eliminarProducto(uniqueId);
    }
});

// Función para mostrar/ocultar el carrito
const botondeCarrito = document.getElementById("carrito-header");
botondeCarrito.addEventListener("click", () => {
    const cartItems = document.getElementById("cart-items");
    const backgroundCartItems = document.getElementById("background-cart-items");

    if (cartItems.style.display === "block") {
        cartItems.style.display = "none";
        backgroundCartItems.style.display = "none";
    } else {
        cartItems.style.display = "block";
        backgroundCartItems.style.display = "block";
    }
});

// Cargar el carrito al iniciar la página
cargarCarrito();

/*COMPRA*/
function PopUpCompra() {
    let carritoContenido = '';
    carrito.forEach(product => {
        carritoContenido += `
            <p><strong>${product.nombre}</strong> (${product.sabor ? `${product.sabor}` : 'Sin sabor'}) - Cantidad: ${product.cantidad} - Precio: $${(product.precio * product.cantidad).toFixed(2)}</p>
           `;
    });

    function mostrarResumenCompra() {
        Swal.fire({
            title: 'Resumen de tu compra',
            html: carritoContenido,
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'carrito-popup'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                mostrarFormularioCompra();
            }
        });
    }

    function mostrarFormularioCompra() {
        Swal.fire({
            customClass: {
                popup: 'carrito-popup2'
            },
            title: 'Completa tu información',
            html: `
                <input type="text" id="modal-nombre" class="swal2-input" placeholder="Nombre">
                <input type="email" id="modal-email" class="swal2-input" placeholder="Correo Electrónico">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Atrás',
            preConfirm: () => {
                const nombre = document.getElementById('modal-nombre').value.trim();
                const email = document.getElementById('modal-email').value.trim();

                if (!nombre || !email) {
                    Swal.showValidationMessage('Completá ambos campos');
                    return false;  
                }

                if (email.indexOf('@') === -1) {
                    Swal.showValidationMessage('Ingresá un correo electrónico válido');
                    return false;
                }

                return { nombre: nombre, email: email }; 
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { nombre, email } = result.value;
                console.log(`Nombre: ${nombre}, Email: ${email}`);
                carrito = [];  // Vaciar el carrito después de la compra
                updateCart();  // Actualizar el carrito en la interfaz
                Swal.fire('Compra completada', '¡Gracias por tu compra, ' + nombre + '!', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Si el usuario presiona "Atrás", volvemos al resumen de compra
                mostrarResumenCompra();
            }
        }).catch((error) => {
            console.error('Error procesando el formulario:', error);
        });
    }

    mostrarResumenCompra();
}
