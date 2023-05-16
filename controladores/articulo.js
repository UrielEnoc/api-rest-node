const validator = require("validator");
const Articulo = require("../modelos/Articulo");

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de artículos",
    });
};
const cursos = (req, res) => {
    console.log("Se ha ejecutado el endpoint 'probando'.");

    return res.status(200).json([
        {
            curso: "Master en React",
            autor: "Victor Robles Web",
            url: "victorroblesweb.es/master-react",
        },
        {
            curso: "Master en PHP",
            autor: "Victor Robles Web",
            url: "victorroblesweb.es/master-php",
        },
    ]);
};

const crear = (req, res) => {
    // Recoger los parámetros por post a guardar
    let parametros = req.body;

    // Validar los datos
    try {
        let validar_titulo =
            !validator.isEmpty(parametros.titulo) &&
            validator.isLength(parametros.titulo, {
                min: 5,
                max: undefined,
            });
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("No se ha validado la información");
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar",
            parametros,
        });
    }

    // Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    // Asignar valores a objeto basado en el modelo (manual o automático)
    // articulo.titulo = parametros.titulo

    // Guardar el artículo en la base de datos
    articulo
        .save()
        .then((articuloGuardado) => {
            if (!articuloGuardado) {
                return res.status(400).json({
                    status: "error",
                    mensaje: "No se ha guardado el artículo",
                });
            }

            return res.status(200).json({
                status: "success",
                articulo: articuloGuardado,
                mensaje: "Artículo creado con éxito!!",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

const listar = (req, res) => {
    let consulta = Articulo.find({});

    if (req.params.ultimos) {
        consulta.limit(3);
    }

    consulta
        .sort({ fecha: -1 })
        .then((articulos) => {
            if (!articulos) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se han encontrado articulos",
                });
            }
            return res.status(200).send({
                status: "success",
                parametro: req.params.ultimos,
                articulos,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: "error",
                mensaje: "Ha ocurrido un error al listar los articulos",
                error: error.message,
            });
        });
};

const uno = (req, res) => {
    // Recoger un id por la url
    let id = req.params.id;

    // Buscar el artículo
    Articulo.findById(id, (error, articulo) => {
        // Si no existe, devolver error
        if (error || !articulos) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado articulo",
            });
        }

        // Devolver resultado
        return res.status(200).json({
            status: "success",
            articulo
        });
    });
};

module.exports = {
    prueba,
    cursos,
    crear,
    listar,
    uno,
};
