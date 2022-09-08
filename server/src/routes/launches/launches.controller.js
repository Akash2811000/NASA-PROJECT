const { getAllLaunch , schedualNewlaunch , existLaunchWithId , abortLaunchById} = require('../../model/launch.model');
const {getPagination} = require('../../services/query');

async function getAllLaunches(req, res){
    const {skip , limit } = getPagination(req.query);
    const launches = await getAllLaunch(skip,limit)
    return res.status(200).json(launches);
}

 async function addNewLunch(req, res){
    const launch = req.body;
    if(!launch.mission || !launch.destination || !launch.launchDate || !launch.destination){
        return res.status(400).json({
            error : "missing require property"
        })
    }

    launch.launchDate = new Date(launch.launchDate)
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error : "invalid date"
        })
    }
    await schedualNewlaunch(launch);
    return res.status(201).json(launch);
}

async function abortLaunch(req, res){
    const launchId = Number(req.params.id);
    const existLaunch = await existLaunchWithId(launchId);
    if(!existLaunch){
        return res.status(404).json({
            error : "launch not found"
        })
    }
    const aborted = await abortLaunchById(launchId);
    
    if(!aborted){
        return res.status(400).json({
            error: "Launch not update"
        })
    }
    return res.status(200).json(aborted);
}


module.exports = {
    getAllLaunches,
    addNewLunch,
    abortLaunch
}