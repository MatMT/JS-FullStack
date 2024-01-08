import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

// Inicialización de la app del servidor
const app = express();
// Habilitación de parámetros mediante JSON
app.use(express.json());

// Función para leer archivo .ENV
dotenv.config();

// Declaración de Conexión a MongoDB 
conectarDB();

// Asignación de rutas de petición para VETERINARIO =====
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

// Declaración del puerto del servidor
const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(`http://localhost:${PORT}`);
});