const mongoose = require('mongoose')
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('connection established'))
    .catch((ex) => console.log(ex))