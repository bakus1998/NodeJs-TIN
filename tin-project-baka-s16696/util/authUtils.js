const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    console.log("ZASZYFROWANE: " + passHashed);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if(loggedUser) {
        next();
    } else {
        res.render('index', { navLocation: 'main', komunikat: false,komunikatzaloguj:true });

        throw new Error('unauthorized access');
    }
}