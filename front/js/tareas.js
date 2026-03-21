const form = document.querySelector(".datos");

form.addEventListener("submit", (e) => {
  // e.preventDefault();
  console.log("Submit interceptado");
  /*Obtener valores*/
  const tarea = document.querySelector("#tarea").value;
  const tipo = document.querySelector("#tipo").value;
  const fecha = document.querySelector("#fecha").value;

  /*Agrupación de datos mediante un obj*/

  const nuevaTarea = {
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
      console.log(data);
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
      data.forEach((tarea) => {
        contenedor.innerHTML += `
        <tr>
          <td>${tarea.tarea}</td>
          <td>${tarea.tipo}</td>
          <td>${tarea.fecha}</td>
          <td><button>Eliminar</button>
          <td><button>Editar</button>
        </tr>
    `;
      });
    });
});
