// esperamos a que el HTML cargue antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
    cargarPeliculas();
    cargarCarritoDesdeLocalStorage();
});

//inicializamos el carrito y su valor en 0
const carrito = [];
let total = 0;

const carritoItems = document.getElementById('carritoItems');
const totalCarrito = document.getElementById('totalCarrito');
const botonComprar = document.getElementById('botonComprar');
const mostrarPeliculas = document.getElementById('mostrarPeliculas');

//funcion para cargar las peliculas desde JSON
async function cargarPeliculas() {
    try {
        const response = await fetch('./peliculas.json');
        const peliculasData = await response.json();
        mostrarPeliculas.innerHTML = '';
        peliculasData.forEach(pelicula => {
            const peliculaElement = generarHTMLPelicula(pelicula);
            mostrarPeliculas.appendChild(peliculaElement);
        });
    } catch (error) {
        console.error('Error cargando datos:', error);
    }
}

//funcion para generar el HTML de las peliculas disponibles
function generarHTMLPelicula(pelicula) {
    const peliculaElement = document.createElement('div');
    peliculaElement.innerHTML = `
        <h3>${pelicula.titulo}</h3>
        <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
        <p>Director: ${pelicula.director}</p>
        <p>Género: ${pelicula.genero}</p>
        <p>Año de Estreno: ${pelicula.añoEstreno}</p>
        <p>Precio: $${pelicula.precio}</p>
        <label>Cantidad: <input type="number" id="cantidad-${pelicula.id}" min="1" value="1"></label>
        <button class="agregarAlCarritoBtn" data-id="${pelicula.id}">Agregar al Carrito</button>`;
    
        //evento para el boton "agregar al carrito"
    const agregarAlCarritoBtn = peliculaElement.querySelector('.agregarAlCarritoBtn');
    agregarAlCarritoBtn.addEventListener('click', async function () {
        const cantidadInput = peliculaElement.querySelector(`#cantidad-${pelicula.id}`);
        const cantidad = parseInt(cantidadInput.value);
        agregarAlCarrito(pelicula, cantidad);
    });

    return peliculaElement;
}

//evento para el boton "comprar"
botonComprar.addEventListener('click', function () {
    confirmarCompra();
});

//mostrar detalles de la compra y restablecer el carrito
function confirmarCompra() {
    const mostrarTicket = carrito.map(item => `${item.titulo} - $${item.precio} x ${item.cantidad}`).join('<br>');
    const totalTicket = `Total: $${total}`;
    const ticket = `${mostrarTicket}<br><br>${totalTicket}`;

    const mensajeCompra = `Detalle de la compra:<br><br>${ticket}`;

    Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        html: mensajeCompra,
    });

    limpiarCarrito();
}

//agregar una pelicula y la cantidad de entradas al carrito de compras
function agregarAlCarrito(pelicula, cantidad) {
    const itemExistente = carrito.find(item => item.id === pelicula.id);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: pelicula.id,
            titulo: pelicula.titulo,
            precio: pelicula.precio,
            cantidad: cantidad,
        });

        Toastify({
            text: `${cantidad} entrada/s ${pelicula.titulo} agregada/s al carrito`,
            duration: 1500,
            gravity: 'top',
            position: 'right',
            close: true,
        }).showToast();
    }

    total += pelicula.precio * cantidad;

    mostrarCarrito();

    guardarCarritoEnLocalStorage();
}

//mostrar el carrito actualizado
function mostrarCarrito() {
    carritoItems.innerHTML = '';

    carrito.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.titulo} - $${item.precio} x ${item.cantidad}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = ' X ';
        deleteBtn.className = 'eliminarDelCarritoBtn';
        deleteBtn.addEventListener('click', () => eliminarDelCarrito(item.id));

        listItem.appendChild(deleteBtn);
        carritoItems.appendChild(listItem);
    });

    totalCarrito.textContent = total;
}

//eliminar un elemento del carrito de compras
function eliminarDelCarrito(id) {
    const itemIndex = carrito.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        const item = carrito[itemIndex];
        total -= item.precio * item.cantidad;
        carrito.splice(itemIndex, 1);
        mostrarCarrito();
    }


    guardarCarritoEnLocalStorage();
}

//limpiar todos los elementos del carrito
function limpiarCarrito() {
    carrito.length = 0;
    total = 0;
    mostrarCarrito();

    localStorage.removeItem('carrito');
    localStorage.removeItem('total');
}

//evento para el boton "limpiar carrito"
const limpiarCarritoBtn = document.getElementById('limpiarCarritoBtn');
limpiarCarritoBtn.addEventListener('click', function () {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción limpiará todo el carrito de compras',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Limpiar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            limpiarCarrito();
            Swal.fire('Carrito limpiado', '', 'success');
        }
    });
});

//cargar el carrito desde el local storage al cargar la pagina
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    const totalGuardado = parseFloat(localStorage.getItem('total'));

    if (carritoGuardado && totalGuardado) {
        carrito.push(...carritoGuardado);
        total = totalGuardado;
        mostrarCarrito();
    }
}

//guardar el carrito en local storage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toString());
}