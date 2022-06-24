var conexion = require("../config/conexion");
var libroE = require("../model/libroE");
var borrar = require("fs");

module.exports = {
    
    
    index: function (req, res) {

        libroE.obtener(conexion, function (err, datosE) {
            console.log(datosE);

            res.render('librosE/index', {librosE: datosE });
        });

    },

    crearlibro: function (req, res) {
        res.render('librosE/crear');
    },

    guardar: function (req, res) {
        console.log(req.body);
        console.log(req.file.filename)

        libroE.insertar(conexion, req.body, req.file, function (err) {
            res.redirect('/librosE');
        });


    },

    eliminar: function (req, res) {
        console.log("Recepcion de Datos");
        console.log(req.params.id);

        libroE.retornardatosID(conexion, req.params.id, function (err, registros) {
            var nombreImagen = "public/images/" + (registros[0].imagen);

            if (borrar.existsSync(nombreImagen)) {
                borrar.unlinkSync(nombreImagen);
            }

            libroE.borrar(conexion, req.params.id, function (err) {
                res.redirect('/librosE');
            });
        });


    },

    editar: function (req, res) {

        libroE.retornardatosID(conexion, req.params.id, function (err, registros) {
            console.log(registros[0]);
            res.render('librosE/editar', { libroE: registros[0] });
        });

    },

    actualizar: function (req, res) {
        console.log(req.body.titulo);
        console.log(req.body.descripcion);
        console.log(req.body.categoria);

        if (req.body.titulo && req.body.descripcion && req.body.categoria) {
            libroE.actualizar(conexion, req.body, function (err) {
            });
        }

        if (req.file) {
            if (req.file.filename) {
                libroE.retornardatosID(conexion, req.body.id, function (err, registros) {
                    var nombreImagen = "public/images/" + (registros[0].imagen);

                    if (borrar.existsSync(nombreImagen)) {
                        borrar.unlinkSync(nombreImagen);
                    }

                    libroE.actualizarArchivo(conexion, req.body, req.file, function (err) {

                    });
                });
            }
        }

        res.redirect('/librosE');
    }


}