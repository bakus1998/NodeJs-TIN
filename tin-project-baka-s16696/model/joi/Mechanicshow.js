const Joi = require('joi');

const empSchema = Joi.object({
    Imie: Joi.string()
        .min(2)
        .max(60)
        .required(),
    Nazwisko: Joi.string()
        .min(2)
        .max(60)
        .required(),
    Doswiadczenie: Joi.string()
        .max(100)
        .required()
});

module.exports = empSchema;