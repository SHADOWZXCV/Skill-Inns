const SigninAuth = require('express').Router()
const passport = require('passport'), localStrat = require('passport-local').Strategy

const { validateData, findUser, compare } = require('../middleware/signinSteps')

SigninAuth.use('/',validateData , (req,res,next)=> {
    passport.authenticate('local',(err,user,info)=> {
        console.log(info.status + user)
        if(err){
            next(err)
        }
        if(info.status == 404){
            res.status(404).json({
                errors: [{
                    // "This email is not associated with any existing account!"
                    status: 0
                }]
            })
        }
        else if (info.status == 401){
            res.status(401).json({
                errors: [{
                    // "This email is not associated with any existing account!"
                    status: 0
                }]
            })
        }
        else if (user && info.status == 200) {
            console.log(JSON.stringify(user))
            res.status(200).redirect('/dashboard')
        }
        
        
    })(req,res,next)
})
module.exports = {
    SigninAuth: SigninAuth,
    passportInit: passport.initialize(),
    passportSession: passport.session(),
    serializeUser: ()=> {
        passport.serializeUser((user,done)=> {
            done(null,user.id)
        })
    },

    useLocalStrat: ()=> {
        passport.use(new localStrat({ 
            usernameField: 'Email',
            passwordField: 'password'
        }, (email,password,done)=> {

            findUser(email, (pData)=> {
                if(!pData){
                    return done(null, false, { status: 404 })
                }
                console.log('comparing passwords :')
                compare(password, pData, (res2)=> {
                    if(!res2) {
                        console.log('nope, password is wrong')
                        return done(null, false, { status: 401 })
                    }
                    if(res2 == 1){
                        console.log('password matches')
                        return done(null, {
                            id: pData.username,
                            name: pData['first-name'],
                            email: email
                        }, { status: 200 })
                    }
                })
            })
        }))
    }
}