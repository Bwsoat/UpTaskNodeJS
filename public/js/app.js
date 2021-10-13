import tareas from "./modules/tareas";

import menuDesplegable from "./modules/menudesplegable"

import {actualizarProgreso} from "./funciones/barraAvance";

import {btnLoginGoogle, btnCerrarSesion, btnRegister, btnResetPassword, btnDeleteProyect} from "./modules/btnsController";

document.addEventListener("DOMContentLoaded", ()=>{
    actualizarProgreso();
    btnLoginGoogle();
    btnCerrarSesion();
    btnRegister();
    btnResetPassword();
    btnDeleteProyect();
})