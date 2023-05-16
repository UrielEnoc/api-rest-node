const {
    conexion
} = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("App de node arrancada");

// Conectar a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configurar cors (middleware, se ejecuta antes de una ruta)
app.use(cors());

// Convertir body a objeto JS
app.use(express.json()); // Recibir datos con content-type app/json
app.use(express.urlencoded({ // Recibiendo daros que llegan por form-urlencoded
    extended: true
}));

// RUTAS
const rutas_articulo = require("./rutas/articulo");

// Cargo las rutas
app.use("/api", rutas_articulo);

// Rutas de pruebas hardcoreadas
app.get("/probando", (req, res) => {
    console.log("Se ha ejecutado el endpoint 'probando'.");

    return res.status(200).json([{
            curso: "Master en React",
            autor: "Victor Robles Web",
            url: "victorroblesweb.es/master-react"
        },
        {
            curso: "Master en PHP",
            autor: "Victor Robles Web",
            url: "victorroblesweb.es/master-php"
        }
    ]);
});
app.get("/", (req, res) => {
    return res.status(200).send(`
        <h1>Empezando a crear un api rest con node</h1>`);
});

// Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
})