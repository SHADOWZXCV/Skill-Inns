const path = require('path')
const express = require('express')
const app = express()


// configs from env file
const dotenv = require('dotenv').config()

//session config
const { session } = require('./controller/config/session')
app.use(session)

// authentication config 
const {passportInit, passportSession, useLocalStrat, serializeUser } = require('./controller/routers/AuthRoute')
app.use(passportInit)
app.use(passportSession)
useLocalStrat()
serializeUser()

// routers
const {SigninAuth} = require('./controller/routers/AuthRoute')
const SignupAuth = require('./controller/routers/SignupRoute')

//middlewares 
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({credentials: true, origin: '*'}))





//handling routes 
app.post('/signin', SigninAuth)
app.post('/signup', SignupAuth)

// react config
app.use(express.static(path.join(__dirname, './src/views')))
app.get('/', (req,res,next)=> {
    console.log('sending user to the react app!')
    res.sendFile(path.join(__dirname,'./src/views/index.html'))
})

app.listen(process.env.MODE === 'DEVELOPMENT' ? process.env.DEV_PORT : process.env.PROD_PORT, ()=> {
    console.log(`Listening to port ${process.env.MODE === 'DEVELOPMENT' ? process.env.DEV_PORT : process.env.PROD_PORT}`);
})