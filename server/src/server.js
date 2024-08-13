const express = require('express')
const cors = require('cors')
const app = express();
require('dotenv').config();
require('./helpers/db')
const userRoute = require('./routes/userRoute')

const PORT = process.env.PORT;

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));
app.use('/user', userRoute)



app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})