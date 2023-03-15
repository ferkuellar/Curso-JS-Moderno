window.addEventListener('online', actualizarEstado);
window.addEventListener('offline', actualizarEstado);

function actualizarEstado() {
    if(navigator.onLine) {
        console.log('Si esta conectado')
    } else {
        console.log('No esta conectado...')
    };
};


