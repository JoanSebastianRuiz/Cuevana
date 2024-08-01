var pagina=1;
const anterior = document.querySelector(".anterior");
const siguiente = document.querySelector(".siguiente");
const peliculas = document.querySelector(".peliculas");

anterior.addEventListener("click", ()=>{
    if (pagina>1){
        pagina-=1;
        cargarPeliculas();
    }
});

siguiente.addEventListener("click", ()=>{
    if (pagina<1000){
        pagina+=1;
        cargarPeliculas();
    }
})

const cargarPeliculas = async () =>{
    try{
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=37772fbbed8ae8b3b85b21c49571730c&page=${pagina}`;
        const cabeceras = new Headers();
        cabeceras.set("Content-type", "application/json");
        const opciones = {
            method: "GET",
            headers: cabeceras
        }

        const respuesta = await fetch(url, opciones);

        if (respuesta.ok){
            let datos = await respuesta.json();
            console.log(datos);
            let elementosInsertar="";

            for (pelicula of datos["results"]){
                elementosInsertar+=
                `<li class="pelicula">
                <img class="imagen" src=https://image.tmdb.org/t/p/w500/${pelicula["poster_path"]}>
                <figcaption class="titulo">${pelicula["title"]}</figcaption>
                </li>`;
            } 
            peliculas.innerHTML=elementosInsertar; 
        }
    } catch(error){
        console.error(error);
    }
}

cargarPeliculas();