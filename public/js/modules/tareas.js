import swal from "sweetalert2";
import axios from "axios";


const tareas = document.querySelector(".listado-pendientes");

if(tareas){
    tareas.addEventListener("click", e => {
        if(e.target.classList.contains("fa-check-circle")){
            const icono = e.target;
            //hacemos referencia al hijo del hijo y extraemos los datos de dataset
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            const url = `${location.origin}/tareas/${idTarea}`;
            console.log(url);

            axios.patch(url, { idTarea })
                .then(function(respuesta){
                    if(respuesta.status === 200){
                        icono.classList.toggle("completo");
                    }
                });
        }
    })
}
export default tareas;