const tabla = document.getElementById("tabla-tareas");
const mensaje = document.getElementById("mensaje");
const contenedor = document.getElementById("contenedor-info");
//get datos

let hoy = new Date().toISOString().split("T")[0];
console.log("Fehca de hoy", hoy);
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/tareas")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const tareashoy = data.filter(t => t.fecha ===hoy)
      const urgentes = data.filter(t => t.tipo==="Urgente")
      let tareasMostrar;

      if(tareashoy.length>0){
        console.log("Hay tareas para la fecha");
        tareasMostrar= tareashoy;
        tabla.style.display= "table"
      }else if (urgentes.length>0){
        tareasMostrar= urgentes;
        tabla.style.display = "table";
      }else{
        mensaje.innerHTML="<p>No hay tareas para hoy</p>"
      }

      tareasMostrar.forEach((tarea, index) => {
          contenedor.innerHTML += `
                         <tr>
                            <td>${index + 1}</td>
                            <td>${tarea.tarea}</td>
                            <td>${tarea.tipo}</td>
                         </tr>                   
                   
                `;
      });
    });
});
