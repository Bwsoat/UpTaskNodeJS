import swal from "sweetalert2";
import axios from "axios";
import {actualizarProgreso} from "../funciones/barraAvance";


const tareas = document.querySelector(".listado-pendientes");

if(tareas){
    tareas.addEventListener("click", e => {
        if(e.target.classList.contains("fa-check-circle")){
            const icono = e.target;
            //hacemos referencia al hijo del hijo y extraemos los datos de dataset
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea })
                .then(function(respuesta){
                    if(respuesta.status === 200){
                        icono.classList.toggle("completo");
                        actualizarProgreso();
                    }
                });
        }
        if(e.target.classList.contains("fa-trash-alt")){
            const tareaHTML = e.target.parentElement.parentElement, 
                  idTarea = tareaHTML.dataset.tarea;
                  swal.fire({
                    title: "Estas seguro?",
                    text: "Los cambios no se podran deshacer!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar tarea!",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if(result.value){
                        const url = `${location.origin}/tareas/${idTarea}`;
                        //enviar el delete por medio de axios
                        axios.delete(url, {params:{ idTarea }})
                            .then(function(respuesta){
                                if(respuesta.status === 200){
                                    tareaHTML.parentElement.removeChild(tareaHTML);
                                    //alerta 
                                    swal.fire(
                                        "Tarea eliminada",
                                        respuesta.data,
                                        "success"
                                    );
                                    actualizarProgreso();
                                }
                            })
                    }
                })
        }
    })
}
export default tareas;