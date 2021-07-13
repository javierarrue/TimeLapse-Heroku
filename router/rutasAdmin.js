const express = require('express');
const router = express.Router();
const Statistic = require('../models/statistic');
const Sale = require('../models/sale');
const Product = require('../models/product');
const Users = require('../models/user');
const multer = require('multer');


//UZAMOS LA DEPENDENCIA MULTER PARA ALMACENAR UNA IMAGEN EN LA CARPETA PRODUCT
const upload = multer({
    storage: multer.diskStorage({
      destination:'./public/images/products',
      filename: (req, file, cb)=>{
        cb(null,file.originalname)
        }
        })
  });


// Rutas admin
router.get('/panelControl',isAuthenticated, async (req, res) => {

    try {
        //LLAMO A TODOS LOS CURSOS SIN FILTRAR
        const panelPrincipal = await Product.find({}); 

        //ENVIO LA INFORMACION DE LOS CURSOS A administrarCursos
        //Pequeña validacion para que un CLIENTE no ingrese a esta ruta.
        if(req.user.role != 'client'){ 
            res.render('admin/panelControl',{
                panelPrincipal
            });
        }else{
            res.redirect('/');
        }

        } catch (err) {
            console.log(err);
        }
});



router.get('/usuariosRegistrados', isAuthenticated, async(req, res) => {

    try {
        //LLAMO A TODOS LOS CURSOS SIN FILTRAR
        const usuariosRegistrados = await Users.find({role: "client"}); 

        //ENVIO LA INFORMACION DE LOS CURSOS A administrarCursos
        //Pequeña validacion para que un CLIENTE no ingrese a esta ruta.
        if(req.user.role != 'client'){ 
            res.render('admin/usuariosRegistrados',{
                usuariosRegistrados
            });
        }else{
            res.redirect('/');
        }

        } catch (err) {
            console.log(err);
        }

});




router.get('/usuariosRegistrados/eliminarUsuario', async (req, res) => {
    
    try {
        const id= req.query.idUsuario;
        
        await Users.remove({_id:id});
        req.flash('mensajeUserEliminado','El Usuario se elimino correctamente.');//ENVIAMOS UN MENSAJE DE RETROALIMENTACION
        
        //RECARGAMOS LA PAGINA PARA VER EL CAMBIO
        res.redirect('/usuariosRegistrados');
         
    } catch (err) {
        console.log("No se puedo eliminar el Usuario: "+err);
        req.flash('mensajeUserNoEliminado','El Usuario no se pudo eliminar.');
        //RECARGAMOS LA PAGINA PARA VER EL CAMBIO
         res.redirect('/usuariosRegistrados');
    }

});



router.get('/ganancias', isAuthenticated, async (req, res) => {

    try {
        //------------- Estadisticas ----------------
    //Query para recibir las estadisticas de la Coleccion 'Statistics'
    const stats = await Statistic.find({});

    //------------- Ventas ----------------
    const año = (new Date()).getFullYear();//Año actual
    const sales = await Sale.find({'year':año});

    //Cacular las VENTAS por MES del año actual
    const sales_per_month = monthSales(sales);
    
    //------------ VENTAS POR PRODUCTOS------------
    /*
        Hubiera querido poner esto en una funcion aparte,
        pero no logre hacerlo, al final tuve que colocarlo todo
        aqui mismo
     */
    //Recibo la lista de productos que existen en la tienda
    const productNames = await Product.find({}).select('name -_id');
    //Creo un arreglo donde guardare el conteo de cuantas veces
    //se ha comprado un determinado curso.
    var sales_by_product = []

    //Recorro la lista de nombres de productos en la tienda
    for (const element of productNames) {
        //Busco en la coleccion de venta, los productos con el nombre dado.
        const query = await Sale.find({'products': element.name});
        //Determino el tamaño de el objeto recibido de la BD
        count = Object.keys(query).length
        //Hago un objeto en donde guardo el nombre del curso y las veces que se ha comprado.
        var product = {
            name: element.name,
            count: count
        }
        //Lo agrego al arreglo que se ha declarado anteriormente.
        sales_by_product.push(product);
        
    }
    //Pequeña validacion para que un CLIENTE no ingrese a esta ruta.
    if(req.user.role != 'client'){ 
        res.render('admin/ganancias',{stats,sales_per_month,sales_by_product});
    }
    else{
        res.redirect('/');
    }

    } catch (error) {
        console.log(error);
    }
});

router.get('/administrarCursos', isAuthenticated, async (req, res) => {
    
    try {
        //LLAMO A TODOS LOS CURSOS SIN FILTRAR
        const administrarCursos = await Product.find({}); 

        //ENVIO LA INFORMACION DE LOS CURSOS A administrarCursos
        //Pequeña validacion para que un CLIENTE no ingrese a esta ruta.
        if(req.user.role != 'client'){ 
            res.render('admin/administrarCursos',{
                administrarCursos
            });
        }else{
            res.redirect('/');
        }

        } catch (err) {
            console.log(err);
        }

});

//Funcion para calcular las VENTAS por MES del año actual
function monthSales(sales){

    //Inicializacion de arreglo con 12 indices (12 meses)
    sales_per_months = [0,0,0,0,0,0,0,0,0,0,0,0]

    sales.forEach(sale => {
        //Suma + 1 debido a que los meses se almacenan del 0 al 11
        month = sale.month + 1;

        switch(month){
            case 1:
                sales_per_months[0] += sale.total_purchased
            break;
            case 2:
                sales_per_months[1] += sale.total_purchased
            break;
            case 3:
                sales_per_months[2] += sale.total_purchased
            break;
            case 4:
                sales_per_months[3] += sale.total_purchased
            break;
            case 5:
                sales_per_months[4] += sale.total_purchased
            break;
            case 6:
                sales_per_months[5] += sale.total_purchased
            break;
            case 7:
                sales_per_months[6] += sale.total_purchased
            break;
            case 8:
                sales_per_months[7] += sale.total_purchased
            break;
            case 9:
                sales_per_months[8] += sale.total_purchased
            break;
            case 10:
                sales_per_months[9] += sale.total_purchased
            break;
            case 11:
                sales_per_months[10] += sale.total_purchased
            break;
            case 12:
                sales_per_months[11] += sale.total_purchased
            break;
        }

    });
    return sales_per_months;
}

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}


router.post('/administrarCursos/agregar', upload.single('logo'), async (req, res) => {

    try {
        const cursoNuevo = await new Product(req.body); //OBTENEMOS TODOS LOS DATOS
        cursoNuevo.logo = req.file.originalname //ASIGNAMOS UN NUEVO CAMPO LLAMADO LOGO AL JSON Y LE AGREGAMOS EL NOMBRE DEL LOGO
        console.log(cursoNuevo);
        cursoNuevo.save(); //GUARDAMOS LOS DATOS EN LA BD
        req.flash('mensajeAgregado','El curso se agrego correctamente.'); //ENVIAMOS UN MENSAJE DE RETROALIMENTACION
        res.redirect('/administrarCursos')
    } catch (err) {
        req.flash('mensajeNoAgregado','El curso no se pudo agregar.');
        res.redirect('/administrarCursos')
        console.log("NO SE PUDO AGREGAR EL CURSO: "+err);
    }
})

router.get('/administrarCursos/eliminar', async (req, res) => {
    
    try {
        const id= req.query.idEliminar;
        
        await Product.remove({_id:id});
        req.flash('mensajeEliminado','El curso se elimino correctamente.');//ENVIAMOS UN MENSAJE DE RETROALIMENTACION
        //RECARGAMOS LA PAGINA PARA VER EL CAMBIO
         res.redirect('/administrarCursos');
         
    } catch (err) {
        console.log("No se puedo eliminar el curso: "+err);
        req.flash('mensajeNoEliminado','El curso no se pudo eliminar.');
        //RECARGAMOS LA PAGINA PARA VER EL CAMBIO
         res.redirect('/administrarCursos');
    }

});


router.post('/administrarCursos/editar',  upload.single('logoEditar'), async (req, res) => {
    
    try {
      
        const datos=req.body;
        console.log(req.body);
 
        if(req.file != undefined){
            datos.logo = req.file.originalname;
        };

        await Product.updateOne({_id:req.body.idEditar},datos);//HACEMOS LA COMPARACION DE ID Y ACTUALIZAMOS LOS DATOS
 
        req.flash('mensajeEditado','El curso se edito correctamente.'); //ENVIAMOS UN MENSAJE DE RETROALIMENTACION
        //RECARGAMOS LA PAGINA PARA VER EL CAMBIO
        res.redirect('/administrarCursos');

        console.log("=============Se actualizo correctamente el curso===================");
    } catch (err) {
        req.flash('mensajeNoEditado','El curso no se pudo editar');
        res.redirect('/administrarCursos');
        console.log("No se puedo editar el curso============ "+err);
    }

});





module.exports = router;