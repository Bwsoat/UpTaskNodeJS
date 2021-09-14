import swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");

if(btnEliminar){
    //boton de eliminar
    btnEliminar.addEventListener("click", e =>{
        //hacemos referencia a la url que almacenamos en el boton
        const urlProyecto = e.target.dataset.proyectoUrl;
        swal.fire({
            title: "Estas seguro?",
            text: "Los cambios no se podran deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar proyecto!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                //enviar peticion a axios
                const url =`${location.origin}/proyectos/${urlProyecto}`;

                axios.delete(url, { params: {urlProyecto}})
                    .then(function(respuesta){
                        swal.fire(
                            "Eliminado!",
                            respuesta.data,
                            "success"
                        );
                        //redirecciona a al inicio despues de 3 segundos
                        setTimeout(()=>{
                            window.location.href ="/"
                        }, 3000);
                });
            }
        })
    });
}
export default btnEliminar;