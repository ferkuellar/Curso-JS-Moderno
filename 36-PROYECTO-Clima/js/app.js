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

            console.log(datos);

            // Limpiar el HTML previo
            limpiarHTML();

            if(datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
                return;
            };

            // imprime la respuesta en el html
            mostrarClima(datos);
        });
    
};

function mostrarClima(datos) {
    const {name, main: {temp, temp_max, temp_min} } = datos;

    const centigrados = kelvinAcentigrados(temp);
    const max = kelvinAcentigrados(temp_max);
    const min = kelvinAcentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');
    
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451`;
    tempMaxima.classList.add('text-xl');
    
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    
    resultado.appendChild(resultadoDiv);
};

const kelvinAcentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    };
};