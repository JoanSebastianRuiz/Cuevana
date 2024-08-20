var paginaPopular=1;
var paginaCartelera=1;

const anteriorPopular = document.querySelector(".anteriorPopular");
const siguientePopular = document.querySelector(".siguientePopular");

const peliculasPopular = document.querySelector(".peliculasPopular");
const peliculasCartelera = document.querySelector(".peliculasCartelera")

const input = document.querySelector(".input");
const buscar = document.querySelector(".buscar");

const subtituloPopulares = document.querySelector(".subtituloPopulares");

const form = document.getElementById("form");

const botonCarrito = document.querySelector(".carritoCompras");

if (localStorage.getItem("carritoCompras")==null){
    const carritoCompras = [];
    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
}

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

buscar.addEventListener("click", ()=>{
    consultaPelicula();
});

botonCarrito.addEventListener("click", ()=>{
    verCarrito();
});

form.addEventListener("submit", ()=>{
    event.preventDefault();
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
                <img class="imagenPopular" onclick="informacionPelicula(${pelicula.id})" src=https://image.tmdb.org/t/p/w500/${pelicula["poster_path"]}>
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
                <img class="imagenCartelera" onclick="informacionPelicula(${pelicula.id})" src=https://image.tmdb.org/t/p/w500/${pelicula["poster_path"]}>
                </li>`;
            } 
            peliculasCartelera.innerHTML=elementosInsertar; 
        }
    } catch(error){
        console.error(error);
    }
}

const consultaPelicula = async () =>{
    try{
        const url = `https://api.themoviedb.org/3/search/movie?api_key=37772fbbed8ae8b3b85b21c49571730c&query=${input.value}`;
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
                if (pelicula.poster_path!==null){
                    elementosInsertar+=
                    `<li class="peliculaPopular">
                    <img class="imagenPopular" onclick="informacionPelicula(${pelicula.id})" src=https://image.tmdb.org/t/p/w500/${pelicula["poster_path"]}>
                    </li>`;
                }
            } 

            if (elementosInsertar!==""){
                peliculasPopular.innerHTML=elementosInsertar;
            }
            else{
                peliculasPopular.innerHTML=
                `<p class="texto">Lo sentimos, no se han encontrado resultados</p>`
            }
            subtituloPopulares.textContent="Resultados";
            anteriorPopular.classList.replace("boton","botonDesactivado");
            siguientePopular.classList.replace("boton","botonDesactivado");
        }
    } catch(error){
        console.error(error);
    }
}


const informacionPelicula = async (idPelicula) =>{
    try{
        const url = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=37772fbbed8ae8b3b85b21c49571730c`;
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
            peliculasPopular.classList.replace("peliculasPopular", "peliculaInformacion");

            peliculasPopular.innerHTML=
            `
            <img class="imagenInformacion" src=https://image.tmdb.org/t/p/w500/${datos.poster_path}>
            <div>
            <h2 class="texto">Release date</h2>
            <p class="texto">${datos.release_date}</p>
            <h2 class="texto">Overview</h2>
            <p class="texto">${datos.overview}</p>
            <h2 class="texto">Genre</h2>
            <p class="texto">${datos.genres[0].name}</p>
            <button class="carrito" onclick="agregarCarrito(${idPelicula})" >Add to cart</button>
            </div>`;

            subtituloPopulares.textContent=datos.title;
            subtituloPopulares.classList.add("tituloInformacion");
            anteriorPopular.classList.replace("boton","botonDesactivado");
            siguientePopular.classList.replace("boton","botonDesactivado");
        }
    } catch(error){
        console.error(error);
    }
}

const agregarCarrito = (idPelicula)=>{
    let carrito = JSON.parse(localStorage.getItem("carritoCompras"));
    if (carrito.includes(idPelicula)==false){
        carrito.push(idPelicula);
    }
    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
}

const verCarrito = async()=>{
    let carrito = JSON.parse(localStorage.getItem("carritoCompras"));
    let elementosInsertar="";
    let precioTotal=0;
    let padre = peliculasPopular.parentNode;
    padre.classList.add("spanCentrado");

    for (idPelicula of carrito){
        try{
            const url = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=37772fbbed8ae8b3b85b21c49571730c`;
            const cabeceras = new Headers();
            cabeceras.set("Content-type", "application/json");
            const opciones = {
                method: "GET",
                headers: cabeceras
            }

            const respuesta = await fetch(url, opciones);

            if (respuesta.ok){
                let datos = await respuesta.json();
                elementosInsertar+=
                `
                <li class="productoCarrito">
                    <img class="imagenCarrito" src=https://image.tmdb.org/t/p/w500/${datos.poster_path}>
                    <h2 class="texto textoCarrito">${datos.title}</h2>
                    <p class="texto precio">$30000</p>
                    <button class="boton eliminar" onclick="quitarCarrito(${idPelicula})" ><i class="fa-solid fa-trash"></i></button>
                </li>`;
                precioTotal+=30000;
            }
        } catch(error){
            console.error(error);
        }
    }

    elementosInsertar+=
    `
    <li class="productoCarrito">
        <div>
            <p class="texto precio">Total</p>
            <p class="texto precio">$${precioTotal}</p>
        </div>
        
        <button class="carrito" onclick="" >Pagar</button>
    </li>
    `;

    peliculasPopular.classList.replace("peliculasPopular", "productosCarrito");
    peliculasPopular.innerHTML=elementosInsertar;
    subtituloPopulares.textContent="Cart";
    subtituloPopulares.classList.add("tituloInformacion");
    anteriorPopular.classList.replace("boton","botonDesactivado");
    siguientePopular.classList.replace("boton","botonDesactivado"); 
}

const quitarCarrito = (idPelicula) =>{
    let carrito = JSON.parse(localStorage.getItem("carritoCompras"));
    if (carrito.includes(idPelicula)){
        carrito.splice(carrito.indexOf(idPelicula),1);
    }
    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
    verCarrito();
}

cargarPeliculasCartelera();
cargarPeliculasPopular();
