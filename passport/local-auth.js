const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const Vonage = require('@vonage/server-sdk');
const apiKey = process.env.VONAGE_APIKEY;
const apiSecret = process.env.VONAGE_APISECRET;
const vonage = new Vonage({apiKey: apiKey, apiSecret: apiSecret});

const User = require('../models/user');

//Crear sesion del usuario en el servidor
passport.serializeUser((user,done) => {
   done(null, user.id)
});

passport.deserializeUser(async (id,done) => {
   const user = await User.findById(id);
   done(null, user);
});

//REGISTRO
//Este modulo resive los datos y los guarda en la BD
passport.use('register', new LocalStrategy(
 {
    //Estos son los campos con los cuales el usuario se va identificar
    //Usar los nombres de los campos que vengan del lado del cliente (del formulario)
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
 },
 async (req, user, password, done) =>{
   
      if(await User.findOne({user: user})){
         done(null, false, req.flash('mensajeRegistro','El usuario ya existe'));
      }else{
         const newUser = new User();
         newUser.name = req.body.nombre;
         newUser.lastname = req.body.apellido;
         newUser.user = user;
         newUser.password = newUser.encrypthPassword(password);
         await newUser.save();
         done(null,newUser,req.flash('registroExito','Usuario registrado'));
      }
 }
));

//Registro AUTOMATICO
//En este registro la contraseña del usuario es autogenerada.
passport.use('registerAuto', new LocalStrategy(
   {
      usernameField: 'user',
      passwordField: 'password',
      passReqToCallback: true
   },
   async (req, user, password, done) =>{
      number = req.body.celular
      string = req.body.apellido + '.' + number;
      user = string.toLowerCase();
      if(await User.findOne({user: user})){
         done(null, false, req.flash('mensajeRegistroAuto','Numero de celular ya esta registrado'));
      }else{
         const newUser = new User();
         newUser.user = user;
         //Contraseña autogenerada
         var password = Math.random().toString(36).slice(-8);
         newUser.password = newUser.encrypthPassword(password);
         newUser.name = req.body.nombre;
         newUser.lastname = req.body.apellido;
         await newUser.save();
         sendSMS(number, user, password);
         done(null,newUser,req.flash('registroExito','Usuario registrado'));
      }
  
   }   
  ));

//Autenticacion para el LOGIN
//Validacion del usuario en la BD
passport.use('login', new LocalStrategy(
   {
      usernameField: 'user',
      passwordField: 'password',
      passReqToCallback: true
   },
   async (req, user, password, done) => {
      const userDB = await User.findOne({user: user});
      if(!userDB){
         return done(null, false, /*{error: 'Usuario no encontrado'}*/req.flash('mensajeLogin','Usuario no encontrado. Intente nuevamente'));
      }
      if(!userDB.validatePassword(password)){
         return done(null, false,/* {error: 'Contraseña incorrecta'}*/ req.flash('mensajeLogin','Contraseña incorrecta. Intente nuevamente'));
      }
      done(null,userDB);
   }
));

function sendSMS(number,user,password){
   const from = "Vonage APIs"
   const to = '507' + number
   const message = 'Tus datos son los siguientes... Usuario: ' + user +' Contraseña: '+ password + ' ';


    vonage.message.sendSms(from, to, message, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${
                    responseData.messages[0]['error-text']
                }`);
            }
        }
    })
}