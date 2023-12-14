let peliculas = [];

function agregarPelicula(id, titulo, director, genero, añoEstreno, precio, imagen) {
    const nuevaPelicula = { id, titulo, director, genero, añoEstreno, precio, imagen};
    peliculas.push(nuevaPelicula);
}

agregarPelicula(1, "Toy Story", "John Lasseter", "Animación", 1995, 250, '/img/toy-story.webp');
agregarPelicula(2, "Shrek", "Andrew Adamson, Vicky Jenson", "Animación", 2001, 250, '/img/shrek.jpg');
agregarPelicula(3, "Buscando a Nemo", "Andrew Stanton, Lee Unkrich", "Animación", 2003, 250, 'img/buscando-a-nemo.jpg');
agregarPelicula(4, "Avengers: Endgame", "Anthony Russo, Joe Russo", "Acción", 2019, 300, 'img/avengers.webp');
agregarPelicula(5, "Joker", "Todd Phillips", "Drama", 2019, 300, 'img/joker.jpg');
agregarPelicula(6, "Spider-Man: No Way Home", "Jon Watts", "Acción", 2021, 300, 'img/spider-man.jpg');


peliculas.sort((a, b) => {
    if (a.titulo < b.titulo) {
        return -1;
    }
    if (a.titulo > b.titulo) {
        return 1;
    }
    return 0;
});

export { peliculas};

