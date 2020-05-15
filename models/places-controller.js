const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');

const {v4:uuidv4} = require('uuid');

let DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State",
        description: "El rascacileos mas famoso del mundo",
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: "20 W 24th St, New York, NY, 10001",
        creator: "u1"

    }
];

//controlador para retornar place
const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.filter(p => {
        return(p.id === placeId);
    });
    
    if(!place){
        
        throw new HttpError('No se encontro el place solicitado', 404);
    }

    res.json({place:place});
};


//controlador para retornar place en funcion del usuario
const getPlaceByUser = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.filter(p => (p.creator === userId));
    
    
    if(!place){
        
        throw new HttpError('No se encontro el place solicitado', 404);
    }
    res.json({place:place});
};

const createPlace = (req, res, next) => {

    const error = validationResult(req);
    if(!(error.isEmpty())){
        console.log(error);
        throw new HttpError('Argumentos de la ruta invalidos' , 422);
    }


    const {title, description, coordinates, address, creator} = req.body;
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createdPlace);
    //res.status(201).json({message: 'Se agrego al place exitosamente'});
    res.status(201).json({place:createdPlace});

};

const updatePlace = (req, res, next) => {

    const error = validationResult(req);

    if(!(error.isEmpty())){
        console.log(error);
        throw new HttpError('Argumentos invalidos');
    }



    const {title, description} = req.body;
    const placeId = req.params.pid;

    const updatedPlace = { ...DUMMY_PLACES.find(p => (p.id === placeId)) };
    const placeIndex = DUMMY_PLACES.findIndex(p =>(p.id === placeId));
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({message: 'Sitio modificado con exito.'});
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => (p.id !== placeId));
    res.status(200).json({message: 'Sitio eliminado con exito'});

};



//exportamos
exports.getPlaceById =  getPlaceById;
exports.getPlaceByUser= getPlaceByUser;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;