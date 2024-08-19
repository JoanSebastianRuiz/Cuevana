var paginaPopular=1;
var paginaCartelera=1;

const anteriorPopular = document.querySelector(".anteriorPopular");
const siguientePopular = document.querySelector(".siguientePopular");

const peliculasPopular = document.querySelector(".peliculasPopular");
const peliculasCartelera = document.querySelector(".peliculasCartelera")

anteriorPopular.addEventListener("click", ()=>{
    if (paginaPopular>1){
        paginaPopular-=1;
        cargarPeliculasPopular();
    }
});

siguientePopular.addEventListener("click", ()=>{
    if (paginaPopular<1000){
        paginaPopular+=1;
        cargarPeliculasPopular();
    }
});

const cargarPeliculasPopular = async () =>{
    try{
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=37772fbbed8ae8b3b85b21c49571730c&page=${paginaPopular}`;
        const cabeceras = new Headers();
        cabeceras.set("Content-type", "application/json");
        const opciones = {
            method: "GET",
            headers: cabeceras
        }

        const respuesta = await fetch(url, opciones);

        if (respuesta.ok){
            let datos = await respuesta.json();
            let elementosInsertar="";

            for (pelicula of datos["results"]){
                elementosInsertar+=
                `<li class="peliculaPopular">
                <img class="imagenPopular" src=https://image.tmdb.org/t/p/w500/${pelicula["poster_path"]}>
                </li>`;
            } 
            peliculasPopular.innerHTML=elementosInsertar; 
        }
    } catch(error){
        console.error(error);
    }
}

const cargarPeliculasCartelera = async () =>{
    try{
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=37772fbbed8ae8b3b85b21c49571730c&page=${paginaCartelera}`;
        const cabeceras = new Headers();
        cabeceras.set("Content-type", "application/json");
        const opciones = {
            method: "GET",
            headers: cabeceras
        }

        const respuesta = await fetch(url, opciones);

        if (respuesta.ok){
            let datos = await respuesta.json();
            let elementosInsertar="";

            for (pelicula of datos["results"]){
                elementosInsertar+=
                `<li class="peliculaCartelera">
                <img class="imagenCartelera" src=https://image.tmdb.org/t/p/w500/${pelicula["poster_path"]}>
                </li>`;
            } 
            peliculasCartelera.innerHTML=elementosInsertar; 
        }
    } catch(error){
        console.error(error);
    }
}

cargarPeliculasCartelera();
cargarPeliculasPopular();
