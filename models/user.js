const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
 
//Esquema de la tabla Usuario
const userSchema = new Schema({
    name: String,
    lastname: String,
    user: {
        type: String,
        unique: true,
        require: true
    },
    profile: {
        type: String,
        default: 'profile-default.png'
    },
    password: {
        type: String,
        require: true
    },
    cursos: {
        type: Array
    },
    role: {
        type: String,
        default: 'client'
    }
})

//Encriptar contraseña
userSchema.methods.encrypthPassword = (password) =>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
}

//Comparar contraseña ingresada por el usuario
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports =  mongoose.model('users',userSchema);
