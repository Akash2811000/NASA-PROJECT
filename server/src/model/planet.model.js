const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const planets = require('../model/planet.mongoose');

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetData() {
    return new Promise((resolve, rejects) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    //result.push(data);
                    savePlanet(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                rejects(err);
            })
            .on('end', (data) => {
            
                console.log('done');
                resolve();
            })
    })
}

async function getAllPlanet() {
    // console.log()
    // console.log(result);
    return await planets.find({});
}

async function savePlanet(planet) {
    try {
        console.log(planet.kepler_name)
        await planets.updateOne({
            kaplerName: planet.kepler_name
        }, { kaplerName: planet.kepler_name },
            { upsert: true })
    } catch (error) {
        console.log(`mongose update err ${error}`)
    }
    
}



module.exports = {
    loadPlanetData,
    
    getAllPlanet
}