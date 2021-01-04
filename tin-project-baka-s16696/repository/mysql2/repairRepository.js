const db = require('../../config/mysql2/db');

exports.getRepairs = () =>{
    const query = 
    `SELECT n.id_Naprawa, n.OpisUszkodzenia, m.Nazwisko, m.Imie, p.Tablica_Rejestracyjna,n.DataNaprawy, n.KosztNaprawy  
    FROM Naprawa n
    JOIN Mechanik m
    ON n.id_mechanik=m.id_mechanik
    JOIN Pojazd p
    ON p.id_Pojazd = n.id_Pojazd`

    return db.promise().query(query)
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
    p.Marka, p.Przebieg, p.Jednostka_KmMil, m.id_mechanik, p.id_Pojazd
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
                id_mechanik: firstRow.id_mechanik,
                Nazwisko: firstRow.Nazwisko,
                Imie: firstRow.Imie,
                Doswiadczenie: firstRow.Doswiadczenie
            },
            Pojazd: {
                id_Pojazd: firstRow.id_Pojazd,
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