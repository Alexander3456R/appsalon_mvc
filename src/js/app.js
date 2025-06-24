let paso = 1;
const pasoIncial = 1;
const pasoFinal = 3;

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion(); // Muestra la seccion del paso actual
    tabs(); // Cambia las secciones al dar click en los tabs
    botonesPaginador(); // Agrega o quita los botones de paginacion
    paginaSiguiente(); // Agrega el evento al boton siguiente
    paginaAnterior(); // Agrega el evento al boton anterior
}

function mostrarSeccion() {
    // Ocultar las secciones que tengan la clase 'mostrar'
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior) {
        // Si hay una seccion anterior, la ocultamos
        seccionAnterior.classList.remove('mostrar');
    }


    // Seleccionar la seccion con el paso
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    // Eliminar la clase 'actual' de los tabs
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior) {
        tabAnterior.classList.remove('actual');
    }
    // Resaltar el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador(); // Actualiza los botones de paginacion
        });
    })
}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if(paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function(){
        if(paso <= pasoIncial) return;
        paso--;
        botonesPaginador();
    });
}
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function(){
        if(paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    });
}