const mongoose = require("mongoose");

const conexion = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog");

        // Parámetros a pasar dentro de objeto (solo en caso de aviso)
        // useNewUrlParser: true
        // useUnifiedTopology: true
        // useCreateIndex: true

        console.log("Conectado a la base de datos 'mi_blog' de forma correcta");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos.");
    }
}

module.exports = {
    conexion
}