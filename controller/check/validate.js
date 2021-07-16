// validtion
const Joi = require('joi')

module.exports = {
    Schemas: {
        newUserSchema: Joi.object().keys({
            "first-name": Joi.string().trim().required(),
            "last-name": Joi.string().trim().required(),
            "Email": Joi.string().email().required(),
            "username": Joi.string().regex(/^[A-Za-z0-9_-]+$/i).min(5).trim().required(),
            "password": Joi.string().min(10).max(24).trim().required()
        }).options({abortEarly: false}),
        
        signinUserSchema: Joi.object().keys({
            "Email": Joi.string().email().required(),
            "password": Joi.string().min(10).max(24).trim().required()
        }).options({abortEarly: false})
    },

    validateSchema: (body, schema)=> {
        const result = schema.validate(body)
        if(result.error) return result.error.details
        else return 200
    }
}
