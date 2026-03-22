const form = document.getElementById("datos-form");
const table = document.getElementById("table-notas");
const contenedor = document.getElementById("contenedor-tareas");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const descripcion= document.getElementById("descripcion-nota").value;
    console.log(descripcion)
    const nota={
        id: Date.now(),
        nota : descripcion
    }
    fetch("http://localhost:3000/notas",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nota),
    })
    .then((res)=> res.json())
    .then((data)=>{
        console.log("Datos obtenidos",data)
    })
})

document.addEventListener("DOMContentLoaded", ()=>{
    fetch("http://localhost:3000/notas")
    .then((res)=> res.json())
    .then((data)=>{
      
        if(data.length>0){
            table.style.display="table";
        }
    data.forEach((nota, index) => {
        contenedor.innerHTML += `
            <tr>
                <td>${index +1}</td>
                <td>${nota.nota}</td>
                <td><button>Editar</button></td>
                <td><button>Eliminar</button></td>

            </tr>
        `
        
    });
        console.log("llego", data);
        
    })
        
})