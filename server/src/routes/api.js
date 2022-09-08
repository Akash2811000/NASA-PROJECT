const  express = require('express')
const api = express.Router();
const {planetRoute} = require('../routes/planet/planet.router');
const {launchRoute} = require('../routes/launches/launches.router');
api.use('/planet', planetRoute);
api.use('/launch', launchRoute);
module.exports = api