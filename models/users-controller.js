const HttpError =  require('../models/http-error');
const {validationResult} = require('express-validator');
const {v4:uuidv4} = require('uuid');



let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Ronald Alvarado',
        email: 'riabojorquez99@gmaiil.com',
        password: 'rb1'
    }

];

const getUsers = (req, res, next) => {
    res.status(200).json({user: DUMMY_USERS});

};

const generarUID = (req, res, next) =>{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
};


const signup = (req, res, next) => {

    //console.log(generarUID());
    const error = validationResult(req);
    if(!(error.isEmpty())){
        throw new HttpError('Argumentos del usuario invalidos' , 422);
    }

    //const id = generarUID();
    const {name, email, password} = req.body;
    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    }
    DUMMY_USERS.push(createdUser);

    res.json({user:createdUser});
    res.status(201).json({message: 'Se agrego al usuario exitosamente'});

};

const login = (req,res, next) => {
    const {email,password} = req.body;
    const identifiedUser = DUMMY_USERS.find(u => (u.email === email));
    if((!identifiedUser) || (identifiedUser.password !== password)){
        throw new HttpError('No se identifico al usuario, las credenciales no son correctas');
    }
    res.json({message: 'TRUE'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login; 


