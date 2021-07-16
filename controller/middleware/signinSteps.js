// hand-made stuff
const { validateSchema, Schemas } = require('../check/validate')
const { getUser } = require('../../model/getUser')

// needed stuff
const { json } = require('body-parser')
const rand = require('csprng')
const argon2 = require('argon2')

module.exports = {
    // validate function 
    validateData : (req,res,next)=> {
    
        console.log('now on signinAuth, data is: ' + JSON.stringify(req.body) + '\n' )
        
        const result = validateSchema(req.body, Schemas.signinUserSchema)
        
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
    
},

// // insert data
//     findUser : (req,res,next)=> {
//         getUser({
//             user: req.body
//         },(result, data = {})=> {
//             if(result == 1){
//                 req.pData = data
//                 next()
//             }
//             else if(result == 0){
//                 res.status(404).json({
//                     errors: [{
//                         // "This email is not associated with any existing account!"
//                         status: 0
//                     }]
//                 })   
//             }
//             else {
//                 console.log("something went wrong")
//             }
//         })
//     },
// insert data
findUser : (email, callback)=> {
    console.log('calling findUser')
    getUser({
        email: email
    },(result, data = {})=> {
        if(result == 1){
            console.log('result on getUser is 1')
            callback(data)
        }
        else if(result == 0){
            console.log('no email like that')
            callback(null)
        }
        else {
            console.log("something went wrong")
        }
    })
},
    
    // // hash the secure
    // compare : (req,res,next)=> {

    //     argon2.verify(req.pData.hashed, req.body.password, {salt: Buffer.from(req.pData.sugar, "utf-8"), type: argon2.argon2id}).then((result,res)=> {
    //         console.log(`Does password match? ${result}`)
    //         if(result){
    //             console.log('so they match!!')
    //             next()
    //         }
    //         else {
    //             req.authenticated = 0
    //             next()
    //         }

    //     })

    // },

        // hash the secure
        compare : (password, pData, callback)=> {

            argon2.verify(pData.hashed, password, {salt: Buffer.from(pData.sugar, "utf-8"), type: argon2.argon2id}).then((result)=> {
                console.log(`Does password match? ${result}`)
                if(result){
                    console.log('so they match!!')
                    callback(1)
                }
                else {
                    callback(0)
                }
    
            })
    
        },


    session : (req,res,next)=> {
        if(req.authenticated == 0){
            res.status(403).json({
                errors: [{
                    // This password doesn't match!
                    status: 0 
                    }]
            }).end()
        }
        else {
            console.log('user authenticated!, sessionID is : ' + req.sessionID)
            req.session.key = "123456789secret123"
            res.status(200).json({
                data: req.pData['first-name']
            }).end()
        }
    }
}