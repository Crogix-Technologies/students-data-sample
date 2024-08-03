import * as   Joi from "joi";

export const teacherRequestValidator = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    fatherName: Joi.string(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string(),
    subject: Joi.string().required()
});