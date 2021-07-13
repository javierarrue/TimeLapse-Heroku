const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const port = process.env.PORT;

//Inicializaciones
require('./database/database'); //Conexion a base de datos
require('./passport/local-auth'); //Autenticaciones

//---------------- Middlewares- ------------------
//Estos son los servicios y funciones para que el login y registro funcione
//Configuracion de sesion
app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({extended : false}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

//Variables de sesion y mensajes de error y exito
app.use((req,res,next) => {
    //MENSAJES DE RETROALIMENTACION PARA EL LOGIN Y REGISTRO
    app.locals.mensajeRegistro = req.flash('mensajeRegistro');
    app.locals.mensajeRegistroAuto = req.flash('mensajeRegistroAuto');
    app.locals.mensajeLogin = req.flash('mensajeLogin');
    app.locals.registroExito = req.flash('registroExito');
    app.locals.user = req.user;
    //MENSAJES DE RETROALIMENTACION DEL CRUD PARA EL ADMIN
    app.locals.mensajeEliminado = req.flash('mensajeEliminado');
    app.locals.mensajeNoEliminado = req.flash('mensajeNoEliminado');
    app.locals.mensajeEditado = req.flash('mensajeEditado');
    app.locals.mensajeNoEditado = req.flash('mensajeNoEditado');
    app.locals.mensajeAgregado = req.flash('mensajeAgregado');
    app.locals.mensajeNoAgregado = req.flash('mensajeNoAgregado');
    //MENSAJES DE RETROALIMENTACION PARA ELIMINAR USUARIO
    app.locals.mensajeUserEliminado = req.flash('mensajeUserEliminado');
    app.locals.mensajeUserNoEliminado = req.flash('mensajeUserNoEliminado');
    next();
});

// Rutas Web
app.use('/', require('./router/rutasWeb'));

// Rutas Usuario
app.use('/', require('./router/rutasUsuario'));

// Rutas Admin
app.use('/', require('./router/rutasAdmin'));

// Rutas Cursos
app.use('/', require('./router/rutasCursos'));

//Rutas Login
app.use('/', require('./router/rutasLoginRegistro'));

//Rutas Pago
app.use('/', require('./router/rutasPago'));

app.use('/', require('./API/routes'));


app.listen(port, () => console.log('el servidor está corriendo en el puerto', port));