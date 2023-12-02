import { peliculas } from './peliculas.js';

const SI = 'si';
const NO = 'no';

let nombre;
let precioEntrada = 250;
let cantidad;
let total = 0;
let continuar;
let email;
let ticket = '';

nombre = prompt('Bienvenido a Cine del Este!\n\nIngrese su nombre: ');

do {
    const opcionesPeliculas = peliculas.map(pelicula => pelicula.titulo).join('\n');

    const PeliculaUsuario = prompt(`Ingrese el título de la película que desea ver ${nombre}:\n\n${opcionesPeliculas}\n`);
    const tituloflexy = PeliculaUsuario.toLowerCase();

    const peliculaElegida = peliculas.find((pelicula) => {
        const tituloPelicula = pelicula.titulo.toLowerCase();
        return tituloPelicula.includes(tituloflexy);
    });

    if (peliculaElegida && peliculas.includes(peliculaElegida)) {
        cantidad = +prompt('Cantidad de entradas: \n');

        const fila = `Pelicula: ${peliculaElegida.titulo}\nEntrada: $${precioEntrada}\nCantidad: ${cantidad}\nSubtotal: $${cantidad * precioEntrada}\n\n`;
        ticket += fila;
        total += precioEntrada * cantidad;

        continuar = prompt('Desea comprar entradas para otra película? si/no\n').toLowerCase();
    } else {
        alert('Título de película inválido. Por favor, elija un título de película válido.\n');
        continuar = SI;
    }
} while (continuar === SI);

ticket += `Total: $${total}`;
alert(ticket);

email = prompt('Desea recibir nuestra cartelera via email? si/no\n');
if (email === SI) {
    prompt('Ingrese su correo electrónico: \n');
    alert(`Recibirá nuestra cartelera mensual.\n\nGracias por elegirnos ${nombre}, disfrute la película!`);
} else {
    alert(`Gracias por elegirnos ${nombre}, disfrute la película!`);
}