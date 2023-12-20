import express from "express";
import cors from "cors";
import pkg from 'pg';

const { Pool } = pkg;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Habilitacion de CORS

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "32387925",
  database: "likeme", 
  port: 5432,
  allowExitOnIdle: true,
});

// Ruta GET para obtener todos los posts en consulta
app.get("/posts", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los posts:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta POST para agregar un nuevo post
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;

    if (!titulo || !img || !descripcion) {
      return res
        .status(400)
        .json({ error: "Titulo, imagen y descripción son campos requeridos." });
    }

    //Ruta POST con Express que recibe y almacena en PostgreSQL un nuevo registro.
    const result = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, img, descripcion, 0]
    );

    res
      .status(201)
      .json({ message: "Post agregado con éxito", nuevoPost: result.rows[0] });
  } catch (error) {
    console.error("Error al agregar el post:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Interaccion con base de datos mediante pg package
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
