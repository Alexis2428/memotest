const $tablero = document.querySelector('#tablero');

let $primerCuadro;
let turnos;

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

function inicializarJuego() {
    $primerCuadro = null;
    turnos = 0;

    configurarTablero();
    asignarColorCuadros(crearColores());
}

function configurarTablero() {
    $tablero.querySelectorAll('.columna').forEach(function($elemento) {
        $elemento.classList.remove('emparejado');
        $elemento.appendChild(crearCuadro());
    });
}

function crearCuadro() {
    const $cuadro = document.createElement('div');
    $cuadro.classList.add('h-100', 'cuadro');

    return $cuadro;
}

function crearColores() {
    const coloresCuadros = ['rojo', 'verde', 'azul', 'amarillo', 'negro', 'naranja', 'agua', 'rosa'];
    let coloresRepetidos = coloresCuadros.concat(coloresCuadros);
    coloresRepetidos.sort(function() {
        return 0.5 - Math.random();
    })

    return coloresRepetidos;
}

function asignarColorCuadros(colores) {
    $tablero.querySelectorAll('.cuadro').forEach(function($cuadro, i){
        $cuadro.classList.add(`${colores[i]}`);
    })
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
