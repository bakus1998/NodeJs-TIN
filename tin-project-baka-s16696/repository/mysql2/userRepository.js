const db = require('../../config/mysql2/db');
const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

exports.findByLogin= (login) =>{
    const sql = 'SELECT login, password FROM Mechanik WHERE login= ?'
    console.log("findByLogin: " + login)
    return db.promise().execute(sql, [login]);
};


exports.findByLoginT = (login) =>{
    const query = 'SELECT Imie,login, password FROM Mechanik WHERE login= ?'

    return db.promise().query(query, [login])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const User = {
            imie: firstRow.Imie,
            login: firstRow.login,
            password: firstRow.password,
        }
        return User;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};


exports.createUser = (newUserData) => {
    const vRes = empSchema.validate(newUserData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    const Email = newUserData.login;
    const pass = authUtil.hashPassword(newUserData.password);

    const sql = 'INSERT into User (login, password) VALUES (?, ?)'
    return db.promise().execute(sql, [Email, pass]);
};