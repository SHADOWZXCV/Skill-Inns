const express = require('express')
const SignupAuth = express.Router()

// hand-made stuff
const { validateSchema, Schemas } = require('../check/validate')
const { insert } = require('../../model/connectDB')

// needed stuff
const { json } = require('body-parser')
const rand = require('csprng')
const argon2 = require('argon2')

// validate function 
const validate = (req,res,next)=> {
    
    console.log('now on signupAuth, data is: ' + JSON.stringify(req.body) + '\n' )
    
    const result = validateSchema(req.body, Schemas.newUserSchema)
    
    // short figure-out-what
    if (result == 200) {
        console.log('okay, data is validated!')
        next()
    }
    else {
        res.status(403).send({
            
            errors: result.map((error)=> {
                const errorP = {}
                errorP[error.path[0]] = error.type
                return errorP
            })
        })
    }
    
}

// hash the secure
const hash = (req,res,next)=> {
    const salt = rand(128,36)
    const hashedP = argon2.hash(req.body.password, {salt: Buffer.from(salt, "utf-8"), type: argon2.argon2id}).then((res)=> {
        const user = {
            "first-name": req.body["first-name"],
            "last-name": req.body["last-name"],
            "Email": req.body["Email"],
            "username": req.body["username"],
            "password": res,
            "sugar": salt
        }
        req.body = user
        next()
    })
}

// insert data
const insertUser = (req,res,next)=> {
    insert({
        user: req.body,
        collection: "users"
    },(result)=> {
        if(result == 200){
            res.status(200).send({
                message: 'okay, data is validated & inserted!',
                errors: null
            })
        }
        else if(result == 1){
            res.status(409).send({
                errors: [{
                    status: "User with this username or email already exist!"
                }]
            })   
        }
        else {
            console.log("something went wrong")
        }
    })
}

SignupAuth.use('/' , validate, hash, insertUser)
module.exports = SignupAuth