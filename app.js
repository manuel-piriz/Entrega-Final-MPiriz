import { peliculas } from './peliculas.js';

const SI = 'si';
const NO = 'no';

let carrito = [];
let total = 0;

const carritoItems = document.getElementById('carritoItems');
const totalCarrito = document.getElementById('totalCarrito');
const botonComprar = document.getElementById('botonComprar');

// cargar el carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoLocalStorage = localStorage.getItem('carrito');
    const totalLocalStorage = localStorage.getItem('total');

    carrito = carritoLocalStorage ? JSON.parse(carritoLocalStorage) : [];
    total = totalLocalStorage ? parseFloat(totalLocalStorage) : 0;

    mostrarCarrito();
}

cargarCarritoDesdeLocalStorage();

// mostrar el carrito
function mostrarCarrito() {
    carritoItems.innerHTML = '';

    carrito.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.titulo} - $${item.precio} x ${item.cantidad}`;
        carritoItems.appendChild(listItem);
    });

    totalCarrito.textContent = total;
}

// agregar una pelicula al carrito
function agregarAlCarrito(pelicula, cantidad) {
    const itemExistente = carrito.find(item => item.id === pelicula.id); // para ver si la pelicula ya esta en el carrito

    if (itemExistente) {
        itemExistente.cantidad += cantidad; // si esta le suma 1
    } else {
        carrito.push({ // sino agrega la nueva pelicula
            id: pelicula.id,
            titulo: pelicula.titulo,
            precio: pelicula.precio,
            cantidad: cantidad,
        });
    }

    total += pelicula.precio * cantidad;

    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total);

    // actualizar el carrito
    mostrarCarrito();
}

// confirmar la compra
function confirmarCompra() {

    const mostrarTicket = carrito.map(item => `${item.titulo} - $${item.precio} x ${item.cantidad}`).join('\n');
    const totalTicket = `Total: $${total}`;
    const ticket = `${mostrarTicket}\n${totalTicket}`;

    // mostrar el ticket
    alert(`Compra realizada. Gracias por elegirnos.\n\nDetalle de la compra:\n${ticket}`);

    // limpiar carrito al terminar la compra
    carrito = [];
    total = 0;
    mostrarCarrito();

    localStorage.removeItem('carrito');
    localStorage.removeItem('total');
}

botonComprar.addEventListener('click', confirmarCompra);

// mostrar peliculas disponibles
const mostrarPeliculas = document.getElementById('mostrarPeliculas');

peliculas.forEach(pelicula => {
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

    // evento para agregar al carrito
    const agregarAlCarritoBtn = peliculaElement.querySelector('.agregarAlCarritoBtn');
    agregarAlCarritoBtn.addEventListener('click', () => {
        const cantidadInput = document.getElementById(`cantidad-${pelicula.id}`);
        const cantidad = parseInt(cantidadInput.value);
        agregarAlCarrito(pelicula, cantidad);
    });

    mostrarPeliculas.appendChild(peliculaElement);
});