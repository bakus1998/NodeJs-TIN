const db = require('../../config/mysql2/db');

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
    const sql = 'DELETE FROM Mechanik WHERE id_mechanik = ?'
    return db.promise().execute(sql, [mechanicId]);
};

exports.createMechanic = (newMechanicData) => {
    const Imie = newMechanicData.Imie;
    const Nazwisko = newMechanicData.Nazwisko;
    const Doswiadczenie = newMechanicData.Doswiadczenie;
    const sql = 'INSERT into Mechanik (Imie, Nazwisko, Doswiadczenie) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [Imie, Nazwisko, Doswiadczenie]);
};

exports.getMechanicById = (mechanicId) =>{
    const query = 
    `SELECT m.Nazwisko, m.Imie, m.Doswiadczenie, n.OpisUszkodzenia,
    p.Tablica_Rejestracyjna, p.Przebieg, n.DataNaprawy, n.KosztNaprawy, n.id_Naprawa, p.id_Pojazd, m.id_mechanik
    FROM Mechanik m
    JOIN Naprawa n
    ON n.id_mechanik = m.id_mechanik
    JOIN Pojazd p
    ON p.id_Pojazd=n.id_Pojazd
    WHERE m.id_mechanik= ?`

    const queryWithoutNaprawa = 
    `Select id_mechanik,Nazwisko, Imie, Doswiadczenie
    FROM Mechanik
    WHERE id_mechanik= ?`

return db.promise().query(query, [mechanicId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return db.promise().query(queryWithoutNaprawa, [mechanicId])
            .then( (results2, fields) => {
                return results2[0][0];
            
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
                        Przebieg: row.Przebieg
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
    const Imie = MechanicData.Imie;
    const Nazwisko = MechanicData.Nazwisko;
    const Doswiadczenie = MechanicData.Doswiadczenie;
    const sql = `UPDATE Mechanik set Imie = ?, Nazwisko = ?, Doswiadczenie = ? where id_mechanik = ?`;
    return db.promise().execute(sql, [Imie, Nazwisko, Doswiadczenie, mechanicId]);
};
