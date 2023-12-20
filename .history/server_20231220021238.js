// server.js
import express from "express";
import cors from "cors";
import { obtenerPosts, agregarPost } from "./consultas";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Ruta GET para obtener todos los posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta POST para agregar un nuevo post
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    const nuevoPost = await agregarPost(titulo, img, descripcion);

    res.status(201).json({ message: "Post agregado con éxito", nuevoPost });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto 3000 ${PORT}`);
});
