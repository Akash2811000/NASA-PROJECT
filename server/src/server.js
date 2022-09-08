const http = require('http');
require('dotenv').config();
const app = require('./app');
const { loadPlanetData } = require('./model/planet.model');
const {loadLaunchData} = require('./model/launch.model');
const { mongooseConnect } = require('./services/mongose');
console.log(`process env ${process.env.PORT}`)
const port = process.env.PORT
//const MONGO_URL = 'mongodb://localhost:27017/nasa'

var server = http.createServer(app);

async function loaddata() {
    await mongooseConnect();
    await loadPlanetData();
    await loadLaunchData();
   
    console.log(`port ${port}`)
    server.listen(port)
}

loaddata();


console.log(`${port}`);