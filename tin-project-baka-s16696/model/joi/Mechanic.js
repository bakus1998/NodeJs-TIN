const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "string.email":
                err.message = `Pole powinno zawierać prawidłowy adres email`;
                break;
            default:
                break;
        }
    });
    return errors;
}


const empSchema = Joi.object({
    id_mechanic: Joi.number()
        .optional()
        .allow(""),
    Imie: Joi.string()
        .min(2)
        .max(60)
        .required().error(errMessages),
    Nazwisko: Joi.string()
        .min(2)
        .max(60)
        .required().error(errMessages),
    Doswiadczenie: Joi.string()
        .min(1)
        .max(100)
        .error(errMessages),
    login: Joi.string()
        .email()
        .max(100).error(errMessages),
    password: Joi.string()
        .min(3)
        .error(errMessages)
});

module.exports = empSchema;