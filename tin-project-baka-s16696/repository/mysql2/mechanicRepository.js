const db = require('../../config/mysql2/db');
const empSchema = require('../../model/joi/Mechanic');
const empSchemaa = require('../../model/joi/Mechanicshow');
const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');


exports.getMechanics = () =>{
    return db.promise().query('Select * From Mechanik')
    .then((result, fields) =>{
        console.log(result[0]);
        return result[0];
    }).catch(err =>{
        console.log(err);
        throw err;
    })
};



exports.deleteMechanic = (mechanicId) =>{
    const sql = 'DELETE FROM Naprawa WHERE id_mechanik = ?'
    return db.promise().query(sql, [mechanicId])
    .then( (results, fields) => {
      const sql2 = 'DELETE FROM Mechanik WHERE id_mechanik = ?'
      return db.promise().execute(sql2, [mechanicId]);
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createMechanicShow = () => {
    const vRes = empSchemaa.validate(null, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
}

exports.createMechanic = (newMechanicData) => {
    const vRes = empSchema.validate(newMechanicData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }

    return checkEmailUnique(newMechanicData.login)
    .then(emailErr => {
        if(emailErr) {

            return Promise.reject(emailErr);
        } else {
            const Imie = newMechanicData.Imie;
            const Nazwisko = newMechanicData.Nazwisko;
            const Doswiadczenie = newMechanicData.Doswiadczenie;
            const login = newMechanicData.login;
            const password = newMechanicData.password;
            const passHashed = authUtil.hashPassword(password);
            const sql = 'INSERT into Mechanik (Imie, Nazwisko, Doswiadczenie, login, password) VALUES (?, ?, ?,?,?)'
            return db.promise().execute(sql, [Imie, Nazwisko, Doswiadczenie, login,passHashed]);
        }
    })
    .catch(err => {
        console.log("TU WYWALA SIE");
        console.log();
        if (Object.keys(err).length === 0) {
            console.log("IF");
            const Imie = newMechanicData.Imie;
            const Nazwisko = newMechanicData.Nazwisko;
            const Doswiadczenie = newMechanicData.Doswiadczenie;
            const login = newMechanicData.login;
            const password = newMechanicData.password;
            const passHashed = authUtil.hashPassword(password);
            const sql = 'INSERT into Mechanik (Imie, Nazwisko, Doswiadczenie, login, password) VALUES (?, ?, ?,?,?)'
            return db.promise().execute(sql, [Imie, Nazwisko, Doswiadczenie, login,passHashed]);
        }else{
            console.log("else");
        }
        return Promise.reject(err);
    });
};

exports.getMechanicById = (mechanicId) =>{
    const query = 
    `SELECT m.Nazwisko, m.Imie, m.Doswiadczenie, n.OpisUszkodzenia,m.login,
    p.Tablica_Rejestracyjna, p.Przebieg, n.DataNaprawy, n.KosztNaprawy, n.id_Naprawa, p.id_Pojazd, m.id_mechanik, p.Jednostka_KmMil
    FROM Mechanik m
    JOIN Naprawa n
    ON n.id_mechanik = m.id_mechanik
    JOIN Pojazd p
    ON p.id_Pojazd=n.id_Pojazd
    WHERE m.id_mechanik= ?`

    const queryWithoutNaprawa = 
    `Select id_mechanik,Nazwisko, Imie, Doswiadczenie, login
    FROM Mechanik
    WHERE id_mechanik= ?`

return db.promise().query(query, [mechanicId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return db.promise().query(queryWithoutNaprawa, [mechanicId])
            .then( (results2, fields) => {
                const mechanic = {
                    id_mechanic: parseInt(mechanicId),
                    Imie: results2[0][0].Imie,
                    Nazwisko: results2[0][0].Nazwisko,
                    Doswiadczenie: results2[0][0].Doswiadczenie,
                    login: results2[0][0].login,
                    naprawy: []
                }

                return mechanic;
            
            }).catch(err => {
        console.log(err);
        throw err;
    });
        }
        const mechanic = {
            id_mechanic: parseInt(mechanicId),
            Imie: firstRow.Imie,
            Nazwisko: firstRow.Nazwisko,
            Doswiadczenie: firstRow.Doswiadczenie,
            login: firstRow.login,
            naprawy: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.id_Naprawa) {
                const Naprawa = {
                    id_Naprawa: row.id_Naprawa,
                    OpisUszkodzenia: row.OpisUszkodzenia,
                    DataNaprawy: row.DataNaprawy,
                    KosztNaprawy: row.KosztNaprawy,
                    Pojazd: {
                        id_Pojazd: row.id_Pojazd,
                        Tablica_Rejestracyjna: row.Tablica_Rejestracyjna,
                        Przebieg: row.Przebieg,
                        Jednostka_KmMil: row.Jednostka_KmMil
                    }
                };
                mechanic.naprawy.push(Naprawa);
            }
        }
        return mechanic;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}


exports.updateMechanic = (mechanicId, MechanicData) => {
    const vRes = empSchema.validate(MechanicData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    // const Imie = MechanicData.Imie;
    // const Nazwisko = MechanicData.Nazwisko;
    // const Doswiadczenie = MechanicData.Doswiadczenie;
    // const login = MechanicData.login;
    // const password = MechanicData.password;
    // const passHashed = authUtil.hashPassword(password);



    // const sql = `UPDATE Mechanik set Imie = ?, Nazwisko = ?, Doswiadczenie = ?, login=?, password=? where id_mechanik = ?`;
    // return db.promise().execute(sql, [Imie, Nazwisko, Doswiadczenie,login,passHashed, mechanicId]);






    return checkEmailUnique(MechanicData.login, mechanicId)
    .then(emailErr => {
        if(emailErr) {

            return Promise.reject(emailErr);
        } else {
            const Imie = MechanicData.Imie;
            const Nazwisko = MechanicData.Nazwisko;
            const Doswiadczenie = MechanicData.Doswiadczenie;
            const login = MechanicData.login;
            const password = MechanicData.password;
            const passHashed = authUtil.hashPassword(password);
        
        
        
            const sql = `UPDATE Mechanik set Imie = ?, Nazwisko = ?, Doswiadczenie = ?, login=?, password=? where id_mechanik = ?`;
            return db.promise().execute(sql, [Imie, Nazwisko, Doswiadczenie,login,passHashed, mechanicId]);
        }
    })
    .catch(err => {
        console.log("TU WYWALA SIE");
        console.log();
        if (Object.keys(err).length === 0) {
            console.log("IF");
            const Imie = MechanicData.Imie;
            const Nazwisko = MechanicData.Nazwisko;
            const Doswiadczenie = MechanicData.Doswiadczenie;
            const login = MechanicData.login;
            const password = MechanicData.password;
            const passHashed = authUtil.hashPassword(password);
        
            const sql = `UPDATE Mechanik set Imie = ?, Nazwisko = ?, Doswiadczenie = ?, login=?, password=? where id_mechanik = ?`;
            return db.promise().execute(sql, [Imie, Nazwisko, Doswiadczenie,login,passHashed, mechanicId]);
        }else{
            console.log("else");
        }
        return Promise.reject(err);
    });


};


exports.updateMechanicShow = () => {
    const vRes = empSchemaa.validate(null, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
}

// checkEmailUnique = (email) => {
//     let sql, promise;
//         sql = `SELECT COUNT(1) as c FROM Mechanik where login = ?`;
//         promise = db.promise().query(sql, [email]);

//     return promise.then( (results, fields) => {
//         const count = results[0][0].c;
//         let err = {};
//         if(count > 0) {
//             err = {
//                 details: [{
//                     path: ['login'],
//                     message: 'Podany adres email jest już używany'
//                 }]
//             };
           
//         }
//         return err;
//     });
// }






checkEmailUnique = (email, empId) => {
    let sql, promise;
    if(empId) {
        sql = `SELECT COUNT(1) as c FROM Mechanik where id_mechanik != ? and login = ?`;
        promise = db.promise().query(sql, [empId, email]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Mechanik where login = ?`;
        promise = db.promise().query(sql, [email]);
    }
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0) {
            err = {
                details: [{
                    path: ['login'],
                    message: 'Podany adres email jest już używany'
                }]
            };
        }
        return err;
    });
}




