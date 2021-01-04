const db = require('../../config/mysql2/db');

exports.getCars = () =>{
    return db.promise().query('Select * From Pojazd')
    .then((result, fields) =>{
        console.log(result[0]);
        return result[0];
    }).catch(err =>{
        console.log(err);
        throw err;
    })
};

exports.deleteCar = (carId) =>{
    const sql = 'DELETE FROM Pojazd WHERE id_Pojazd = ?'
    return db.promise().execute(sql, [carId]);
};

exports.createCar = (newCarData) => {
    const Marka = newCarData.Marka;
    const Przebieg = parseInt(newCarData.Przebieg);
    const Jednostka_KmMil = newCarData.Jednostka_KmMil;
    const Tablica_Rejestracyjna = newCarData.Tablica_Rejestracyjna;
    const sql = 'INSERT into Pojazd (Marka, Przebieg, Jednostka_KmMil,Tablica_Rejestracyjna) VALUES (?, ?, ?, ?)'
    return db.promise().execute(sql, [Marka, Przebieg, Jednostka_KmMil,Tablica_Rejestracyjna]);
};

// exports.getCarByIda = (carId) =>{
//     const query = `SELECT e._id as _id, e.firstName, e.lastName, e.email, empl._id as empl_id,
//         empl.salary, empl.dateFrom, dept._id as dept_id, empl.dateTo, dept.name, dept.budget 
//     FROM Employee e 
//     left join Employment empl on empl._id = e._id
//     left join Department dept on empl._id = dept._id 
//     where e._id = ?`
// return db.promise().query(query, [empId])
//     .then( (results, fields) => {
//         const firstRow = results[0][0];
//         if(!firstRow) {
//             return {};
//         }
//         const emp = {
//             _id: parseInt(empId),
//             firstName: firstRow.firstName,
//             lastName: firstRow.lastName,
//             email: firstRow.email,
//             employments: []
//         }
//         for( let i=0; i<results[0].length; i++ ) {
//             const row = results[0][i];
//             if(row.empl_id) {
//                 const employment = {
//                     _id: row.empl_id,
//                     salary: row.salary,
//                     dateFrom: row.dateFrom,
//                     dateTo: row.dateTo,
//                     department: {
//                         _id: row.dept_id,
//                         name: row.name,
//                         budget: row.budget
//                     }
//                 };
//                 emp.employments.push(employment);
//             }
//         }
//         return emp;
//     })
//     .catch(err => {
//         console.log(err);
//         throw err;
//     });
// }

exports.getCarById = (carId) =>{
    const query = 
    `SELECT p.id_Pojazd, p.Marka, p.Przebieg,p.Tablica_Rejestracyjna , p.Jednostka_KmMil, 
    n.OpisUszkodzenia, n.DataNaprawy, n.KosztNaprawy, m.Imie
    FROM Pojazd p
    JOIN Naprawa n
    ON n.id_Pojazd=p.id_Pojazd
    JOIN Mechanik m
    ON m.id_mechanik=n.id_mechanik
    WHERE p.id_Pojazd= ?`

    const queryWithoutNaprawa = 
    `Select id_Pojazd,Marka, Przebieg, Jednostka_KmMil,Tablica_Rejestracyjna
    FROM Pojazd
    WHERE id_Pojazd= ?`

return db.promise().query(query, [carId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return db.promise().query(queryWithoutNaprawa, [carId])
            .then( (results2, fields) => {
                const fRow = results2[0][0];
                const car = {
                    id_Pojazd: parseInt(carId),
                    Marka: fRow.Marka,
                    Tablica_Rejestracyjna: fRow.Tablica_Rejestracyjna,
                    Jednostka_KmMil: fRow.Jednostka_KmMil,
                    Przebieg: fRow.Przebieg,
                    naprawy: []
                }
                return car;
            
            }).catch(err => {
        console.log(err);
        throw err;
    });
        }

        const car = {
            id_Pojazd: parseInt(carId),
            Marka: firstRow.Marka,
            Tablica_Rejestracyjna: firstRow.Tablica_Rejestracyjna,
            Jednostka_KmMil: firstRow.Jednostka_KmMil,
            Przebieg: firstRow.Przebieg,
            naprawy: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.id_Pojazd) {
                const Naprawa = {
                    OpisUszkodzenia: row.OpisUszkodzenia,
                    Imie: row.Imie,
                    DataNaprawy: row.DataNaprawy,
                    KosztNaprawy: row.KosztNaprawy,
                };
                car.naprawy.push(Naprawa);
            }
        }
        return car;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}

exports.updateCar = (carId, carData) => {
    const Marka = carData.Marka;
    const Przebieg = carData.Przebieg;
    const Jednostka_KmMil = carData.Jednostka_KmMil;
    const Tablica_Rejestracyjna = carData.Tablica_Rejestracyjna;
    const sql = `UPDATE Pojazd set Marka = ?, Przebieg = ?, Jednostka_KmMil = ?, Tablica_Rejestracyjna = ? where id_Pojazd = ?`;
    return db.promise().execute(sql, [Marka, Przebieg, Jednostka_KmMil, Tablica_Rejestracyjna,carId]);
};

/*

SELECT p.id_Pojazd, p.Marka, p.Przebieg, p.Jednostka_KmMil, 
n.OpisUszkodzenia, n.DataNaprawy, n.KosztNaprawy, m.Imie
FROM Pojazd p
JOIN Naprawa n
ON n.id_Pojazd=p.id_Pojazd
JOIN Mechanik m
ON m.id_mechanik=n.id_mechanik
WHERE p.id_Pojazd=1;


*/