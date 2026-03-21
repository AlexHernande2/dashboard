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
        return res.status(500).json({ error: "Error al leer archivo" });
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

//puerto
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
