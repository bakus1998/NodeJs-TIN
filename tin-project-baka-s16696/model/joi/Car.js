const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "number.base":
                    err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "number.min":
                    err.message = `Przebieg musi wynosić powyżej ${err.local.limit}`;
                    break;
            case "number.max":
                    err.message = `Przebieg musi wynosić poniżej ${err.local.limit}`;
                    break;
            default:
                break;
        }
    });
    return errors;
}


const empSchema = Joi.object({
    Przebieg: Joi.number()
        .min(1).max(2000000)
        .required().error(errMessages),
    Marka: Joi.string()
        .min(2)
        .max(20)
        .required().error(errMessages),
    Tablica_Rejestracyjna: Joi.string()
        .min(1)
        .max(10)
        .required().error(errMessages),
        Jednostka_KmMil: Joi.string(),
    id_Pojazd:Joi
    .optional()
    .allow(""),

});



module.exports = empSchema;