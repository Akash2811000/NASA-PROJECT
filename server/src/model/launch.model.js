const launchDatabase = require('../model/launch.mongoose');
const planets = require('../model/planet.mongoose');
const axios = require('axios');

defaultFlightNumber = 100;

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

async function populateLaunches() {
    console.log("downoading data");
    const response = await axios.post(SPACEX_API_URL,
        {
            query: {},
            options: {
                pagination: false,
                populate: [
                    {
                        path: 'rocket',
                        select: {
                            name: 1
                        }
                    },
                    {
                        path: 'payloads',
                        select: {
                            'customers': 1
                        }
                    }
                ]
            }
        }
    );

    if(response.status !== 200){
        console.log('Problem to downloading data');
        throw new Error('problem to downloading data')
    }
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        payloads.forEach((payload) => {
            ncus = payload['customers']
        })
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket'].name,
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: ncus
        }
        console.log(`${launch.flightNumber} ${launch.mission}`)
        await saveLaunch(launch);
    }

}

async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    });
    if (firstLaunch) {
        console.log('Launch data alredy loaded');

    } else {
        await populateLaunches();
    }

}
async function findLaunch(filter) {
    console.log(filter)
    const data = await launchDatabase.findOne(filter);
    console.log(`this is ${data}`)
    return await launchDatabase.findOne(filter);
}

async function existLaunchWithId(launchId) {

    return await findLaunch({ flightNumber: launchId })
}
async function getAllLaunch(skip,limit) {
    return await launchDatabase.find({})
    .sort({flightNumber : 1})
    .skip(skip)
    .limit(limit);
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchDatabase.findOne().sort('-flightNumber');
    if (!latestLaunch) {
        return defaultFlightNumber;
    }

    return latestLaunch.flightNumber;
}



async function saveLaunch(launch) {
   
    await launchDatabase.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

async function schedualNewlaunch(launch) {

    const planet = await planets.findOne({
        kaplerName: launch.destination
    });

    if (!planet) {
        throw new Error('No matching found')
    }
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        sucess: true,
        upcoming: true,
        customer: ['sky', 'akash'],
        flightNumber: newFlightNumber
    });

    saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
    const aborted = await launchDatabase.updateOne({ flightNumber: launchId }, {
        upcoming: false,
        sucess: false
    })

    return aborted.modifiedCount === 1;

}

module.exports = {
    existLaunchWithId,
    abortLaunchById,
    getAllLaunch,
    loadLaunchData,
    schedualNewlaunch,

}