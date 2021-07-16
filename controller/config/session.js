// session & session store on server
const session = require('express-session')
const redis = require('redis')
const redisStore = require('connect-redis')(session)
const redisClient = redis.createClient()

redisClient.on('error', (err)=> {
    console.log("An error on redis cache: " + err)
})

module.exports = {
        session: session({
            secret: process.env.SESSION_S,
            store: new redisStore({ host: 'localhost' , port: '6379', client: redisClient }),
            cookie: {
                secure: false,
                sameSite :true,
                httpOnly: false,
                maxAge: 60000 * 2,
            },
            saveUninitialized: true,
            resave: false    
        })
}

