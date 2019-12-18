const mongoose = require('mongoose');

const types = mongoose.Schema.Types;


const userSchema = new mongoose.Schema({

    _id: types.ObjectId,
    email: {
        type: types.String,
        require: true
    },
    password: {
        type: types.String,
        require: true
    }
})

module.exports = mongoose.model('User', userSchema)