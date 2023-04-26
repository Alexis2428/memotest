document.querySelector('#comenzar').onclick = comenzarJuego;

document.querySelector('#reiniciar').onclick = reiniciarJuego;

function comenzarJuego() {
    ocultarElemento('titulo');
    alternarEstadoBoton('comenzar', 'visible');
    mostrarElemento('tablero');

    inicializarJuego();
    manejarEventos();
}

function reiniciarJuego() {
    alternarEstadoBoton('reiniciar', 'visible');
    ocultarElemento('texto-fin-juego');
    mostrarElemento('titulo');
    alternarEstadoBoton('comenzar', 'oculto');
}

function mostrarElemento(elemento) {
    document.querySelector(`#${elemento}`).classList.remove('oculto');
}

function ocultarElemento(elemento) {
    document.querySelector(`#${elemento}`).classList.add('oculto');
}

function alternarEstadoBoton(boton, estado) {   // la función recibe el estado actual del botón como parametro
    const $boton = document.querySelector(`#${boton}`);

    if (estado === 'oculto') {
        $boton.classList.add('d-grid');
        $boton.classList.remove('oculto');
    } else {
        $boton.classList.add('oculto');
        $boton.classList.remove('d-grid');
    }
}
