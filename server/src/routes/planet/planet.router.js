const express = require('express')

const {httpGetAllPlanet} = require('./planet.controller');
const planetRoute = express.Router();

planetRoute.get('/', httpGetAllPlanet);


module.exports =
    {planetRoute}
