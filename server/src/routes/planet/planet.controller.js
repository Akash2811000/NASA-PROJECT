const { getAllPlanet } = require('../../model/planet.model');

async function httpGetAllPlanet(req, res) {
 
    return res.status(200).json( await getAllPlanet());
}

module.exports = {
    httpGetAllPlanet
}