const SI = 'si';
const NO = 'no';

let nombre;
let nombrepelicula;
let precioentrada=250;
let cantidad;
let total=0;
let fila;
let continuar;
let email;
let ticket = 'Pelicula   Precio   Cant.   Subtotal \n';

nombre = prompt('Bienvenido a Cine del Este!\n Ingrese su nombre: ');
do{
    nombrepelicula = prompt('Ingrese la película que desea ver: ');
    cantidad = +prompt('Cantidad de entradas: ');

    fila = `${nombrepelicula}   $${precioentrada}  ${cantidad}  $${cantidad*precioentrada} \n`;
    ticket = ticket + fila;
    total = total+ precioentrada * cantidad;

    continuar = prompt('Desea comprar entradas para otra película? si/no') .toLowerCase();
}while (continuar === SI);

ticket = ticket + `Total: $${total}`;
alert(ticket);

email = prompt('Desea recibir nuestra cartelera via email? si/no');
if(email === SI){
    prompt('Ingrese su correo electrónico: ');
    alert('Recibirá nuestra cartelera mensual\n Gracias por elegirnos, disfrute la película!');
}else{
    alert('Gracias por elegirnos, disfrute la película!');
}