const Joi = require('joi');


const empSchema = Joi.object({
    Przebieg: Joi.number()
        .required(),
    Marka: Joi.string()
        .min(2)
        .max(20)
        .required(),
    Tablica_Rejestracyjna: Joi.string()
        .min(1)
        .max(10)
        .required(),
});

module.exports = empSchema;