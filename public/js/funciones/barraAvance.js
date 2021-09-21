export const actualizarProgreso = () =>{
    //Seleccionar las tareas existentes
    const tareas = document.querySelectorAll("li.tarea");

    if(tareas.length){
        //Seleccionar las tareas completas
        const tareasCompletas = document.querySelectorAll("i.completo");

        //calcular avance y redondeamos con Math.round
        const avance = Math.round((tareasCompletas.length/ tareas.length)*100);

        //mostrar avance
        const porcentaje = document.querySelector("#porcentaje");
        porcentaje.style.width = avance+"%";
    }
}