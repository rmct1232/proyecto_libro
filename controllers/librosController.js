var conexion = require("../config/conexion");
var libro = require("../model/libro");
var borrar = require("fs");

module.exports = {
    
    index: function (req, res) {

        libro.obtener(conexion, function (err, datos) {
            console.log(datos);

            res.render('libros/index', { title: 'PROYECTO FINAL', libros: datos });
        });

    },

    crearlibro: function (req, res) {
        res.render('libros/crearlibro');
    },

    guardar: function (req, res) {
        console.log(req.body);
        console.log(req.file.filename)

        libro.insertar(conexion, req.body, req.file, function (err) {
            res.redirect('/libros');
        });


    },

    eliminar: function (req, res) {
        console.log("Recepcion de Datos");
        console.log(req.params.id);

        libro.retornarDatosID(conexion, req.params.id, function (err, registros) {
            var nombreImagen = "public/images/" + (registros[0].imagen);

            if (borrar.existsSync(nombreImagen)) {
                borrar.unlinkSync(nombreImagen);
            }

            libro.borrar(conexion, req.params.id, function (err) {
                res.redirect('/libros');
            });
        });


    },

    editar: function (req, res) {

        libro.retornarDatosID(conexion, req.params.id, function (err, registros) {
            console.log(registros[0]);
            res.render('libros/editar', { libro: registros[0] });
        });

    },

    actualizar: function (req, res) {
        console.log(req.body.titulo);
        console.log(req.body.descripcion);
        console.log(req.body.categoria);

        if (req.body.titulo && req.body.descripcion && req.body.categoria) {
            libro.actualizar(conexion, req.body, function (err) {
            });
        }

        if (req.file) {
            if (req.file.filename) {
                libro.retornarDatosID(conexion, req.body.id, function (err, registros) {
                    var nombreImagen = "public/images/" + (registros[0].imagen);

                    if (borrar.existsSync(nombreImagen)) {
                        borrar.unlinkSync(nombreImagen);
                    }

                    libro.actualizarArchivo(conexion, req.body, req.file, function (err) {

                    });
                });
            }
        }

        res.redirect('/libros');
    }


}