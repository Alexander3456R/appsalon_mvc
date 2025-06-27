let paso = 1;
const pasoIncial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    const tienePasos = document.querySelector('#paso-1');
    if (!tienePasos) return;
    mostrarSeccion(); // Muestra la seccion del paso actual
    tabs(); // Cambia las secciones al dar click en los tabs
    botonesPaginador(); // Agrega o quita los botones de paginacion
    paginaSiguiente(); // Agrega el evento al boton siguiente
    paginaAnterior(); // Agrega el evento al boton anterior
    consultarAPI(); // Consulta la API en el backend de PHP
    idCliente(); // Añade el id del cliente al objeto cita
    nombreCliente(); // Añade el nombre del cliente al objeto cita
    seleccionarFecha(); // Añade la fecha de la cita al objeto cita
    seleccionarHora(); // Añade la hora de la cita al objeto cita
    mostrarReseumen(); // Muestra el resumen de la cita
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
        mostrarReseumen(); // Muestra el resumen de la cita
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

async function consultarAPI() {
    try {
        const url = '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error)
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const {id, nombre, precio} = servicio;
        
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;


        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

function seleccionarServicio(servicio) {
    const {id} = servicio;
    const {servicios} = cita;
    // Identificar al elemento que se seleccionó
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    // Comprobar si el servicio ya fue seleccionado
    if(servicios.some(agregado => agregado.id === id)) {
        // Eliminar
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    } else {
        // Agregar
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }

    
    
}

function idCliente() {
    cita.id = document.querySelector('#id').value;

}

function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;

}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e) {
        const dia = new Date(e.target.value).getUTCDay();

        if([6, 0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e) {
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if(hora < 10 || hora > 18) {
            e.target.value = '';
            mostrarAlerta('Hora no válida, selecciona una hora entre las 10:00 y las 18:00', 'error', '.formulario');
        } else {
            cita.hora = e.target.value;
        }
    });
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
    // Previene que se agreguen multiples alertas
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    }

    // Script para crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if(desaparece) {
        // Elimina la alerta despues de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function mostrarReseumen() {
    const resumen = document.querySelector('.contenido-resumen');
    // Limpiar el contenido previo
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    if(Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta('Faltan datos de servicios, fecha u hora', 'error', '.contenido-resumen', false);
        return;
    } 

    // Formatear el div de resumen
    const {nombre, fecha, hora, servicios} = cita;



    // Heading para servicios en resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    // Iterando y mostrando los servicios seleccionados
    servicios.forEach(servicio => {
        const {id, precio, nombre} = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });

    // Heading para cita en resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    // Formatear la fecha y hora
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2; // Se suma 2 para evitar el desfase de la zona horaria
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year, mes, dia)); 

    const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const fechaFormateada = fechaUTC.toLocaleDateString('es-CO', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    // Boton para crear la cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);
}

async function reservarCita() {
    const {nombre, fecha, hora, servicios, id} = cita;

    const idServicios = servicios.map(servicio => servicio.id);
    // console.log(idServicios);

    const datos = new FormData();
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);

    try {
         // Peticion a la API
    const url = '/api/citas';
    const respuesta = await fetch(url, {
        method: 'POST',
        body: datos
    });


    const resultado = await respuesta.json();

    if(resultado.resultado) {
        Swal.fire({
        icon: "success",
        title: "Cita Creada",
        text: "Tu cita fue creada correctamente, enseguida un asesor se comunicara con usted para confirmar su cita!",
        button: 'OK'
        }).then(() => {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })
    }
    } catch (error) {
        Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al guardar la cita!",
        });
    }

   
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.tipoAlerta !== 'undefined') {
        switch(window.tipoAlerta) {
            case 'creacion':
                Swal.fire({
                    title: "Servicio creado",
                    icon: "success",
                    text: "El servicio fue añadido correctamente",
                    confirmButtonText: "OK"
                });
                break;
            case 'actualizacion':
                Swal.fire({
                    title: "Servicio actualizado",
                    icon: "success",
                    text: "El servicio fue actualizado correctamente",
                    confirmButtonText: "OK"
                });
                break;
            case 'eliminacion':
                Swal.fire({
                    title: "Servicio eliminado",
                    icon: "success",
                    text: "El servicio fue eliminado correctamente",
                    confirmButtonText: "OK"
                });
                break;
            case 'cita_eliminada':
                Swal.fire({
                    icon: 'success',
                    title: 'Cita eliminada correctamente'
                });
                break;
        }
    }
});
