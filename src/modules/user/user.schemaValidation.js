import Joi from "joi";

export const signupValidation = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    rePassword: Joi.valid(Joi.ref('password')).required()

})

export const signinValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
})