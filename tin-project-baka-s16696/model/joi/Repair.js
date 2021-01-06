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
            case "number.base":
                    err.message = "Pole jest wymagane";
                break;
            case "date.max":
                    err.message = "Data nie może być z przyszłości";
                break;
            case "date.base":
                    err.message = "Pole jest wymagane";
                break;
            default:
                break;
        }
    });
    return errors;
}

const eSchema = Joi.object({
    id_Naprawa: Joi.number()
        .optional()
        .allow(""),
    OpisUszkodzenia: Joi.string()
        .min(10)
        .max(300)
        .required()
        .error(errMessages),
    id_Pojazd: Joi.number()
        .required()
        .error(errMessages),
    id_mechanik: Joi.number()
        .error(errMessages),
    KosztNaprawy: 
    Joi.number()
        .required()
        .error(errMessages),
    DataNaprawy: Joi.date()
        .required()
        .max("now")
        .error(errMessages),
    allEmps: Joi.number()
        .optional()
        .allow("")
        .error(errMessages),
    allDepts: Joi.number()
        .optional()
        .allow("")
        .error(errMessages),
});

module.exports = eSchema;