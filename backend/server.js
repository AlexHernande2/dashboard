const express = require("express");
const app = express();
const cors = require("cors");
//para manejar archivos
const fs = require("fs");

// app.use(express.static("../front"));
//Convierte lo que llega en json a obj js
app.use(express.json());
//permite conexiones externas
app.use(cors());

app.post("/tareas", (req, res) => {
  //leer archivo
  fs.readFile("tareas.json", "utf-8", (err, data) => {
    let tareas = [];
    if (err) {
      console.log("Error al leer", err);
      return res.status(500).json({ error: "Error al leer archivo" });
    }
    //convertir datos a obje
    tareas = JSON.parse(data);
    //agregar tarea
    tareas.push(req.body);

    //Guardar en json
    //JSON.stringify(tareas) convierte el obj/array a txtjson
    fs.writeFile("tareas.json", JSON.stringify(tareas), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al escribir archivo" });
      }
      res.json({ mensaje: "Tarea guardada" });
    });
    console.log(req.body);
  });
});

//obtener datos
app.get("/tareas", (req, res) => {
  fs.readFile("tareas.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Error al leer", err);
      return;
    }
    const tareas = JSON.parse(data);
    res.json(tareas);
  });
});

//obtener uno en especifico 
app.get("/tareas/:id", (req, res) => {
  const id= req.params.id;
  fs.readFile("tareas.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo" });
    }

    const tareas = JSON.parse(data);
    //buscar uno en especifico 
    const tarea= tareas.find((t)=> t.id ==id);
    res.json(tarea);
  });
});


//delete
app.delete("/tareas/:id", (req, res) => {
  const id = req.params.id;
  //leer archivo
  fs.readFile("tareas.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo" });
    }
    let tareas = JSON.parse(data);
    tareas = tareas.filter((t) => t.id != id);
    fs.writeFile("tareas.json", JSON.stringify(tareas), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al leer archivo" });
      }
      res.json({ mensaje: "Tarea guardada" });
    });
    console.log(req.body);
  });
});


//actualizar datos 
app.put("/tareas/:id", (req,res)=>{
  const id = req.params.id;

  fs.readFile("tareas.json", "utf-8", (err,data)=>{
    if(err){
      return res.status(500).json({ errror: "Error al leer el archivo PUT"});
    }
    //convertir datos a obje js
    let tareas = JSON.parse(data);
    //map recorre todo el array y devuelve uno nuevo con lo que se reemplace
    tareas= tareas.map(t=>{
      if(t.id == id){
        return { ...t, ...req.body};
      }
      return t;
    });
    fs.writeFile("tareas.json", JSON.stringify(tareas), ()=>{
      res.json({mensaje: "Tarea Actualizada"});
    })
  })
})

//---------------NOTAS--------------//
app.post("/notas", (req, res)=>{
  fs.readFile("notas.json", "utf-8", (err,data)=>{
    let notas =[];
    if(err){
      console.log("Error al leer el archivo notas.json", err);
      return res.status(500).json({error:"Error al leer el archivo"});
    }
    //convertir datos a objetos 
    notas= JSON.parse(data);
    notas.push(req.body);

    //guardar
    fs.writeFile("notas.json", JSON.stringify(notas), (err)=>{
      if(err){
        return res.status(500).json({error: "Error al escribir en el archivo"});
      }
      res.json({mensaje: "Nota guardada"})
    })
  })
})


//get
app.get("/notas", (req,res)=>{
  fs.readFile("notas.json", "utf-8", (err,data)=>{
    if(err){
      return res.status(500).json({error:"Error al leer el archivo"})
    }
    const notas= JSON.parse(data);
    res.json(notas);
  })
})

//DELETE
app.delete("/notas/:id", (req, res)=>{
  const id = req.params.id;
  fs.readFile("notas.json", "utf-8", (err,data)=>{
    if(err){
      return res.status(500).json({error: "Error al leer el archivo"})
    }
    let notas = JSON.parse(data)
    notas= notas.filter((t)=> t.id != id);
    fs.writeFile("notas.json", JSON.stringify(notas), (err)=>{
      if(err){
        return res.status(500).json({error:"No se pudo eliminar el usuario"})
      }
      res.json({mensaje: "Nota Eliminada"})
    })
  })
})


/**app.delete("/tareas/:id", (req, res) => {
  const id = req.params.id;
  //leer archivo
  fs.readFile("tareas.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo" });
    }
    let tareas = JSON.parse(data);
    tareas = tareas.filter((t) => t.id != id);
    fs.writeFile("tareas.json", JSON.stringify(tareas), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al leer archivo" });
      }
      res.json({ mensaje: "Tarea guardada" });
    });
    console.log(req.body);
  });
}); */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
