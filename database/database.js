const mongoose = require('mongoose');
DB = process.env.DB

//Conexion a la base de datos
mongoose.connect(DB,{useUnifiedTopology: true,  useNewUrlParser: true  })
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log('Error: ',err));


