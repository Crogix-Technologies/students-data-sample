import * as   Joi from "joi";

export const studentRequestValidator = Joi.object().keys({
    rollNumber: Joi.number().required(),
    name: Joi.string().required(),
    fatherName: Joi.string(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
});