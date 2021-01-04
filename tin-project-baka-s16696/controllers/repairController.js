// exports.showRepairList = (req, res, next) => {
//     res.render('pages/repair-list', {navLocation: 'repair'});
// }


const RepairRepository = require('../repository/mysql2/repairRepository');
const MechanicRepository = require('../repository/mysql2/mechanicRepository');
const CarRepository = require('../repository/mysql2/carRepository');



exports.showRepairList = (req, res, next) => {
    RepairRepository.getRepairs()
    .then(repairs => {
        res.render('pages/repair-list', {
            repairs: repairs,
            navLocation: 'repair'
        });
    });
}


exports.showRepairForm = (req, res, next) => {
    let allEmps, allDepts;
    MechanicRepository.getMechanics()
        .then(emps => {
            allEmps = emps;
            return CarRepository.getCars();
        
        })
        .then(depts => {
            allDepts = depts;
            res.render('pages/repair-form', {
                employment: {},
                formMode: 'createNew',
                allEmps: allEmps,
                allDepts: allDepts,
                pageTitle: 'Dodaj nową naprawę',
                btnLabel: 'Nowa naprawa',
                formAction: '/repair/add',
                navLocation: 'repair'
            });
        });
}


exports.addRepair = (req, res, next) => {
    const repairData = { ...req.body };
    console.log(req.body);
    RepairRepository.createRepair(repairData)
        .then( result => {
            res.redirect('/repair');
        });
};


// exports.showRepairForm = (req, res, next) => {
//     res.render('pages/repair-form', {navLocation: 'repair'});
// }

// exports.showRepairInfo = (req, res, next) => {
//     res.render('pages/repair-info', {navLocation: 'repair'});
// }


exports.showRepairInfo = (req, res, next) => {
    const repairId = req.params.repairId;
    RepairRepository.getRepairById(repairId)
        .then(repair => {
            res.render('pages/repair-info', {
                repair: repair,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły o naprawie',
                formAction: '',
                navLocation: 'repair'
            });
        });
}


// exports.showRepairEdit = (req, res, next) => {
//     res.render('pages/repair-edit', {navLocation: 'repair'});
// }


exports.showRepairEdit = (req, res, next) => {
    // res.render('pages/mechanics-edit', {navLocation: 'mechanic'});

    const repairId = req.params.repairId;
    let repairEdit;
    let mechanicEdit;
    let carEdit;

    RepairRepository.getRepairById(repairId)
        .then(repair => {
            repairEdit = repair;
            return MechanicRepository.getMechanics();
        })
        .then(mechanics => {
            mechanicEdit = mechanics;
            return CarRepository.getCars();
        })
        .then(cars => {
            carEdit = cars;
            res.render('pages/repair-edit', {
                repairEdit: repairEdit,
                mechanicEdit: mechanicEdit,
                carEdit: carEdit,
                formMode: 'edit',
                pageTitle: 'Aktualizacja naprawy',
                btnLabel: 'Edytuj naprawę',
                formAction: '/repair/edit/',
                navLocation: 'repair'
            });
        })
}

exports.updateRepairEdit = (req, res, next) => {
    const repairId = req.body.id_Naprawa;
    const repairData = { ...req.body };
    RepairRepository.updateRepair(repairId,repairData)
        .then( result => {
            res.redirect('/repair');
        });

};


exports.deleteRepair = (req, res, next) => {
    const repairId = req.params.repairId;
    console.log("TO TUTAJ : " + repairId);
    RepairRepository.deleteRepair(repairId)
    .then( () => {
        res.redirect('/repair');
    });
};