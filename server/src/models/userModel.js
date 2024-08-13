const { Schema, model } = require('mongoose')


const userSchema = new Schema({
    first_name: { type: String, required: true, min: 3, max: 30 },
    last_name: { type: String, default: '' },
    profile_pic: { type: String, default: '' },
    dob: { type: Date, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, default: '' }
})


const User = model('user', userSchema)
module.exports = User;