const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Users = require('../models/user');


router.get('/API/cursos', async (req, res) => {
    
    try {
        const cursos = await Product.find({}).select({ 
            "name": 1,
            "price":1,
            "_id": 0
        });
        
            res.send({cursos});
        } catch (err) {
            console.log(err);
        }

});


router.get('/API/usuarios', async (req, res) => {
    
    try {
        
        const usuarios = await Users.find({role: "client"}).select({ 
            "name": 1,
            "lastname":1,
            "_id": 0
        });

        
            res.send({usuarios});
        } catch (err) {
            console.log(err);
        }

});

  module.exports = router;