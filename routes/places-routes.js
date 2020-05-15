const express = require('express');

const {check} = require('express-validator');

const router = express.Router();



const placesController = require('../models/places-controller');

router.get('/:pid', placesController.getPlaceById);

router.get('/user/:uid', placesController.getPlaceByUser);

router.post(
    '/', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({min: 6}),
        check('address').not().isEmpty()
    ]
    ,
placesController.createPlace);

//ruta para editar un place
router.patch('/:pid', 
[
    check('title').not().isEmpty(),
    check('description').isLength({min: 6}),

]
,placesController.updatePlace );

router.delete('/:pid', placesController.deletePlace);

module.exports = router;