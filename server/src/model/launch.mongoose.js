const mongoose = require('mongoose');
const launchSchema = new mongoose.Schema(
    {
        flightNumber: {
            type: Number,
            required: true
        },
        mission: {
            type: String,
            required: true
        },
        rocket: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            
        },
        customer: {
            type: [
                String
            ],
            
        },
        launchDate: {
            type: Date,
            required: true,
        },
        upcoming: {
            type: Boolean,
            required: true,
            default: true
        },
        sucess: {
            type: Boolean,
            required: true,
            default: true
        }
    }
)

module.exports = mongoose.model('launch',launchSchema);