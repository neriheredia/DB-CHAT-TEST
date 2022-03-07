//EXPRESS para el server
const express = require('express')
const app = express()
const port = process.env.PORT || 8300

//Config
const dotenv = require('dotenv')
const cors = require('cors')
//MONGOOSE para la connection de la DB
const mongoose = require('mongoose')
//ROUTES PARA EL SERVER
const allRoutes = require('./routes/routes')

//CONFIG BASIC
dotenv.config()
app.use(cors())
app.use(express.json())
//CONNECT DATABASE
mongoose.connect(
    process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is Connect'))
    .catch((err) => console.log(err))

//USE ALL ROUTES
app.use('/api', allRoutes)


//POR ONLINE
app.listen(port, () => {
    console.log(`Server On Port ${port}`);
})