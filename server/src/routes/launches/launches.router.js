const express = require('express');

const {getAllLaunches , addNewLunch , abortLaunch} = require('./launches.controller');

const launchRoute = express.Router();

launchRoute.get('/',getAllLaunches);
launchRoute.post('/',addNewLunch);
launchRoute.delete('/:id',abortLaunch);

module.exports = {launchRoute}