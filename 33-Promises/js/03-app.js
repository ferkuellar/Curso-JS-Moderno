const aplicarDescuento = new Promise((resolve, reject) => {
    const descuento = true;
    // const descuento = false;

    if(descuento) {
        resolve('Descuento Aplicado');
    } else {
        reject('No se pudo aplicar el descuento');
    };
});

// aplicarDescuento
//     .then(resultado => {
//         console.log(resultado);
//     })
//     .catch(error => {
//         console.log(error);
//     });

    // es lo mismo que el de arriba pero mas simplificado

    // aplicarDescuento
        // .then(resultado => console.log(resultado))
        // .catch(error => console.log(error));
    
    
    aplicarDescuento
        .then(resultado => descuento(resultado))
        .catch(error => console.log(error));


// console.log(aplicarDescuento);

//  hay 3 valores posibles...
// fufilled - el promise se cumplio
// rejected - el promise no se cumplio
// pending - aun no se ha cumplido y tampoco fue rechazado

function descuento(mensaje) {
    console.log(mensaje);
};