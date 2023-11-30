let peliculas = [];

function agregarPelicula(titulo, director, genero, añoEstreno) {
    const nuevaPelicula = { titulo, director, genero, añoEstreno };
    peliculas.push(nuevaPelicula);
}

agregarPelicula("Toy Story", "John Lasseter", "Animación", 1995);
agregarPelicula("Titanic", "James Cameron", "Romance", 1997);
agregarPelicula("Shrek", "Andrew Adamson, Vicky Jenson", "Animación", 2001);
agregarPelicula("Buscando a Nemo", "Andrew Stanton, Lee Unkrich", "Animación", 2003);
agregarPelicula("Avengers: Endgame", "Anthony Russo, Joe Russo", "Acción", 2019);
agregarPelicula("Joker", "Todd Phillips", "Drama", 2019);
agregarPelicula("Spider-Man: No Way Home", "Jon Watts", "Acción", 2021);


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

