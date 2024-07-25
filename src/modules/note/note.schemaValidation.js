import Joi from "joi";

export const noteValidation = Joi.object({
    title: Joi.string().min(2).max(150).required(),
    contnet: Joi.string().min(5).max(2500)

})
export const noteUpdateValidation = Joi.object({
    title: Joi.string().min(2).max(150).required(),
    contnet: Joi.string().min(5).max(2500),
    id:Joi.string().hex().length(24).required()

})