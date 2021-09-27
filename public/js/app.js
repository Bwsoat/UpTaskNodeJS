import proyectos from "./modules/proyectos";

import tareas from "./modules/tareas";

import cerrarSesion from "./modules/cerrarSesion"

import {actualizarProgreso} from "./funciones/barraAvance";

document.addEventListener("DOMContentLoaded", ()=>{
    actualizarProgreso();
})