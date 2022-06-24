var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/',function (req,res,next) {

  res.render('home');
});


/* GET categorias page. */
router.get('/categorias',function (req,res,next) {

  res.render('categorias');
});

/* GET nosotros page. */
router.get('/nosotros',function (req,res,next) {

  res.render('nosotros');
});

/* GET mostrarPro page. */
router.get('/mostrarPro',function (req,res,next) {

  res.render('mostrarPro');
});



module.exports = router;
