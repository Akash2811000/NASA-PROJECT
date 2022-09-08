const  mongoose  = require("mongoose");

const planetSchema = mongoose.Schema({
    kaplerName : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('planet', planetSchema);