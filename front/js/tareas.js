const form = document.querySelector(".datos");

form.addEventListener("submit", (e) => {
  //e.preventDefault();
  console.log("Submit interceptado");
  /*Obtener valores*/
  const tarea = document.querySelector("#tarea").value;
  const tipo = document.querySelector("#tipo").value;
  const fecha = document.querySelector("#fecha").value;

  /*Agrupación de datos mediante un obj*/

  const nuevaTarea = {
    id: Date.now(),
    tarea: tarea,
    tipo: tipo,
    fecha: fecha,
  };

  fetch("http://localhost:3000/tareas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaTarea),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Post",data);
    })
    .catch((err) => {
      console.error("Error en el fetch:", err);
    });
});

//obtener datos
document.addEventListener("DOMContentLoaded", () => {
  
  fetch("http://localhost:3000/tareas")
    .then((res) => res.json())
    .then((data) => {
     
      console.log(data);
      const contenedor = document.querySelector("#contenedor");
      //recorrer datos
      data.forEach((tarea, index) => {
        contenedor.innerHTML += `
        <tr>
          <td>${index+1}</td>
          <td>${tarea.tarea}</td>
          <td>${tarea.tipo}</td>
          <td>${tarea.fecha}</td>
          <td><button class="eliminar" data-id="${tarea.id}">Eliminar</button>
          <td><button class="editar" data-id="${tarea.id}">Editar</button></td>
        </tr>
    `;
      });
    });
});

let idEditar = null;
//para editar 
document.addEventListener("click", (e)=>{
  if(e.target.classList.contains("editar")){
    const id = e.target.dataset.id;
    idEditar = id;
    console.log("Editar ID", id);
    fetch(`http://localhost:3000/tareas/${id}`)
    .then(res => res.json())
    .then(data=>{
      console.log(data);

      document.getElementById("edit-tarea").value = data.tarea;
      document.getElementById("edit-tipo").value = data.tipo;
      document.getElementById("edit-fecha").value = data.fecha;

      document.getElementById("modal-editar").style.display = "block";


    })
  }
})
function guardarcambios(){
  console.log("Función guardar cambios")
  const tarea = document.getElementById("edit-tarea").value;
  const tipo = document.getElementById("edit-tipo").value;
  const fecha = document.getElementById("edit-fecha").value;
  fetch(`http://localhost:3000/tareas/${idEditar}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
      //JSON.stringify(tareas) convierte el obj/array a txtjson
    body:JSON.stringify({tarea,tipo,fecha})
  })
  .then(()=>{
    document.getElementById("modal-editar").style.display="none";
    location.reload();
  })
  


}


//capturar el id al hacer click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar")) {
    //target elemento al que se le hizo click btn 
    const id = e.target.dataset.id;
    console.log(id);

    fetch(`http://localhost:3000/tareas/${id}`, {
      method: "DELETE",
    })
    .then(() => location.reload());
  }
});


