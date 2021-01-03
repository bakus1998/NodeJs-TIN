const db = require('../../config/mysql2/db');

exports.getRepairs = () =>{
    return db.promise().query('Select * From Naprawa')
    .then((result, fields) =>{
        console.log(result[0]);
        return result[0];
    }).catch(err =>{
        console.log(err);
        throw err;
    })
};


exports.deleteRepair= (repairId) =>{
    const sql = 'DELETE FROM Naprawa WHERE id_Naprawa = ?'
    return db.promise().execute(sql, [repairId]);
};

exports.createRepair = (newRepairData) => {
    const KosztNaprawy = newRepairData.KosztNaprawy;
    const OpisUszkodzenia = newRepairData.OpisUszkodzenia;
    const DataNaprawy = newRepairData.DataNaprawy;
    const id_Pojazd = newRepairData.id_Pojazd;
    const id_mechanik = newRepairData.id_mechanik;
    const sql = 'INSERT into Naprawa (KosztNaprawy, OpisUszkodzenia, DataNaprawy,id_Pojazd,id_mechanik) VALUES (?, ?, ?, ?, ?)'
    return db.promise().execute(sql, [KosztNaprawy, OpisUszkodzenia, DataNaprawy,id_Pojazd,id_mechanik]);
};


exports.updateRepair = (repairId, RepairData) => {
    const KosztNaprawy = RepairData.KosztNaprawy;
    const OpisUszkodzenia = RepairData.OpisUszkodzenia;
    const DataNaprawy = RepairData.DataNaprawy;
    const id_Pojazd = RepairData.id_Pojazd;
    const id_mechanik = RepairData.id_mechanik;
    const sql = `UPDATE Naprawa set KosztNaprawy = ?, OpisUszkodzenia = ?, DataNaprawy = ?, id_Pojazd = ? , id_mechanik = ?  where id_Naprawa = ?`;
    return db.promise().execute(sql, [KosztNaprawy, OpisUszkodzenia, DataNaprawy,id_Pojazd,id_mechanik, repairId]);
};

exports.getRepairById = (repairId) =>{
    const query = 
    `SELECT n.OpisUszkodzenia, n.DataNaprawy, n.KosztNaprawy, m.Nazwisko, p.Tablica_Rejestracyjna, m.Imie, m.Doswiadczenie, 
    p.Marka, p.Przebieg, p.Jednostka_KmMil 
    FROM Naprawa n 
    JOIN Mechanik m 
    ON m.id_mechanik=n.id_mechanik 
    Join Pojazd p 
    On p.id_Pojazd=n.id_Pojazd 
    WHERE id_Naprawa = ?`


return db.promise().query(query, [repairId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const Naprawa = {
            id_Naprawa: parseInt(repairId),
            OpisUszkodzenia: firstRow.OpisUszkodzenia,
            DataNaprawy: firstRow.DataNaprawy,
            KosztNaprawy: firstRow.KosztNaprawy,
            Mechanik: {
                Nazwisko: firstRow.Nazwisko,
                Imie: firstRow.Imie,
                Doswiadczenie: firstRow.Doswiadczenie
            },
            Pojazd: {
                Tablica_Rejestracyjna: firstRow.Tablica_Rejestracyjna,
                Marka: firstRow.Marka,
                Przebieg: firstRow.Przebieg + firstRow.Jednostka_KmMil
            }
        }

        return Naprawa;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}