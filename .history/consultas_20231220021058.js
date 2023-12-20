// consultas.js
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "32387925",
  database: "likeme",
  port: 5432,
  allowExitOnIdle: true,
});

const obtenerPosts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
  } catch (error) {
    console.error("Error al obtener los posts:", error.message);
    throw error;
  }
};

const agregarPost = async (titulo, img, descripcion) => {
  try {
    if (!titulo || !img || !descripcion) {
      throw new Error("Titulo, imagen y descripción son campos requeridos.");
    }

    const result = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, img, descripcion, 0]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error al agregar el post:", error.message);
    throw error;
  }
};

export { obtenerPosts, agregarPost };
