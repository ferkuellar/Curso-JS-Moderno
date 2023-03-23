const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const fromulario = document.querySelector('#fromulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});


function buscarClima(e) {
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    console.log(ciudad);
    console.log(pais);

    if (ciudad === '' || pais === ''){
        // hubo eun erro
        mostrarError('Ambos campos son obligatorios');
        return;
    };

    // Consultar la API
    consultarAPI(ciudad, pais);
};

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){

        // crear una alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class = "font-bold">Error!</strong>
            <span class = "block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        // se elimine la alerta despues de 5 seg

        setTimeout (() => {
            alerta.remove();
        }, 5000);
    
    };

};

function consultarAPI(ciudad, pais) {
        
    // Leer la URL y agregar el API key
    const appId = 'f34b9745e8ea33c5e911fd9933a2349a';
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}, ${pais}&appid=${appId}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}, ${pais}&appid=${appId}`;

    // query con fetch API
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos)
            if(datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
            }
        })
    
};