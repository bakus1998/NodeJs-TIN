const userRepository = require('../repository/mysql2/userRepository');
const authUtil = require('../util/authUtils');


exports.login = (req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;
    // console.log(req.body.login);
    // console.log(req.body.password);
    authUtil.hashPassword(password);
    userRepository.findByLoginT(login)
        .then(emp => {
            if(!emp) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy email lub hasło"
                })
            } else if(authUtil.comparePasswords(password, emp.password) === true) {

                console.log("Zalogowano!");
                req.session.loggedUser = emp;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}

