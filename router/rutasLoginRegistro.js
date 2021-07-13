const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');

router.get('/userType',(req,res) => {
    console.log(req.body);
});

/* NO BORRAR - POR SI ACASO DESPUES ES NECESARIO o.o
router.post('/login',passport.authenticate('login',{
    successRedirect: '/perfil',
    failureRedirect: '/',
    passReqToCallback: true
})) 
*/

router.post('/login', (req,res,next) => {
    
    passport.authenticate('login',(err, user, info) => {
        
        if (err){
            console.error('Err: ',err);
            return res.redirect('/');  
        } 

        if (!user){
            return res.redirect('/');  
        }
        
        //Si el usuaro es encontrado:
        req.logIn(user, (err) => {
          if (err) { 
            return res.redirect('/'); 
           }
          
           if(req.user.role == 'client')
            return res.redirect('/perfil');

            if(req.user.role == 'admin')
            return res.redirect('/panelControl');

        })

    })(req,res,next)
}) 

router.get('/logout',(req,res) => {
    req.logout();
    res.redirect('/');
});

router.post('/register',passport.authenticate('register',{
    successRedirect: '/perfil',
    failureRedirect: '/',
    passReqToCallback: true
}));

router.post('/registerAuto',passport.authenticate('registerAuto',{
    successRedirect: '/perfil',
    failureRedirect: '/',
    passReqToCallback: true
}));


//Funcion para controlar el acceso a paginas
//Llamar esta funcion en la ruta de una pagina para controlar
//que el usuario haya iniciado sesion
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;