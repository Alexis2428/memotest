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

