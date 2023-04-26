const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const registrosPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
};

function validarFormulario(e){
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === ''){
        // Mensaje de error
        mostrarAlerta('Agregar un termino de busqueda');
        return;
    };

    buscarImagenes();
};

function mostrarAlerta(mensaje){

    const existeAlerta = document.querySelector('.bg-red-100');

    if(!existeAlerta){
        const alerta = document.createElement('p');

        alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded",  "max-w-lg", "mx-auto", "mt-6", "text-center" );

        alerta.innerHTML = `
                <strong class="font-bold">Error!</strong>
                <span class="block sm:inline">${mensaje}</span>
        `;

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    };
    
};

function buscarImagenes(){

    const termino = document.querySelector('#termino').value;

    const key = '35704188-a651f7e7dbf8bbaa9a4f3e9db';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado=>{
            totalPaginas = calcularPaginas(resultado.totalHits);
            mostrarImagenes(resultado.hits);
        });
};

// Generador que va aregistrar la cantidad de elementos de acuerdo a las paginas

function *crearPaginador(total) {
    console.log(total);
    for (let i = 1; i <= total; i++){
        yield i;
    };
};

function calcularPaginas(total) {
    return parseInt(Math.ceil( total / registrosPorPagina ));
};

function mostrarImagenes(imagenes){
    // console.log(imagenes);

    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    // Iterar sobre el arreglo de imagenes y cosntruir el HTML
    imagenes.forEach(imagen => {

        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `

            <div class="w-1/2 md:1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">

                    <div class="p-4">
                        <p>${likes} <span class="font-light"> Me Gusta </span> </p>
                        <p>${views} <span class="font-light"> Veces vista </span> </p>

                        <a 
                            class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"   
                            href="${largeImageURL}" target="_balnk" rel="noopener noreferrer"
                        >
                            Ver Imagen
                        </a>
                    </div>
                <div class="bg-white">
            </div>
        `;

    });

    // Limpiar el paginador previo
    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild)
    };

    // Generamos el nuevo HTML

    imprimirPaginador();

};

function imprimirPaginador() {
    iterador = crearPaginador(totalPaginas);

    // console.log(iterador.next().value); //Value nos trae el valor registrado con el yield
    // console.log(iterador.next().done); //Done nos dice si ya recorrimos todo el iterador

    while (true) {
        const{value, done} = iterador.next();
        if(done) return;

        // Caso contrario, genera un boton por cada elemento en el generador 

        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent= value;
        boton.classList.add('siguente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');

        boton.onclick = () => {
            paginaActual = value;

            buscarImagenes();
        }

        paginacionDiv.appendChild(boton);
    };
};