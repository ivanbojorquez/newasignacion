const express = require('express');
const bodyParser =  require('body-parser');
const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/user-routes');

const HttpError = require('./models/http-error');

//creamos la aplicacion 
const app = express();

app.use(bodyParser.json());



//middleware
app.use('/api/places', placesRoutes);

app.use('/api/users' , userRoutes);


//manejo de error
app.use((req, res, next) => {
    const error = new HttpError('No se encontro la ruta' , 404);
    throw error;
});

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code  || 500);
    res.json({errorMessage: error.message}  || 'Ha ocurrido un error inesperado');

});



app.listen(5000);