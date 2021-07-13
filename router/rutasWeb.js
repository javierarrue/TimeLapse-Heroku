const express = require('express');
const product = require('../models/product');
const router = express.Router();

// Rutas de inicio
router.get('/', (req, res) => {
    res.render('index');
});

// Rutas de tienda
router.get('/tienda', async (req, res) => {
    let search = {};
    try {

        if(req.query.curso != null && req.query.curso !== ''){
            search.name = new RegExp(req.query.curso, 'i')
        }
        const cursos = await product.find(search); 

        res.render('pages/tienda',{
            cursos: cursos,
            search: req.query
        });
    } catch (err) {
        console.log(err);
    }

});

// Rutas de tienda -- ver detalles de producto
router.get('/tienda/:name', async (req, res) => {

    try {
        const productName = await product.find({name:req.params.name});

        productName.forEach(element => {
            productDetails = element
        });
        
        res.render('pages/producto',{productDetails});
    } catch (err) {
        console.log(err);
    }

});

// Rutas de carrito
router.get('/carrito', (req, res) => {
    res.render('pages/carrito'/* ,{cartShop} */);
});

router.get('/checkout', (req, res) => {
    res.render('pages/checkout');
});

router.get('/sobreNosotros', (req, res) => {
    res.render('pages/sobreNosotros');
});

router.get('/politicaPrivacidad', (req, res) => {
    res.render('pages/politicaPrivacidad');
});

module.exports = router;