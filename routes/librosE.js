var express = require('express');
var router = express.Router();
var multer = require('multer');
const libroE = require('../model/libroE');
const librosElectronicaController = require('../controllers/librosElectronicaController');
var fecha = Date.now();

var rutaAlmacen = multer.diskStorage({
    destination:function (request, file, callback) {
        callback(null,'./public/images/')
    },

    filename:function (request, file, callback) {
        console.log(file);
        callback(null, fecha + "_" + file.originalname);
    }
});

var cargar = multer({storage:rutaAlmacen});

/* GET home page. */
router.get('/',librosElectronicaController.index);
router.get('/crear',librosElectronicaController.crearlibro);
router.post('/',cargar.single("imagen"),librosElectronicaController.guardar);
router.get('/editar/:id',librosElectronicaController.editar);
router.post('/actualizar',cargar.single("imagen"),librosElectronicaController.actualizar);
router.post('/eliminar/:id',librosElectronicaController.eliminar);



module.exports = router;