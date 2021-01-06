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
                navLocation: 'repair',
                emp: {},
                validationErrors: {}
            });
        });
}


exports.addRepair = (req, res, next) => {

    const repairData = { ...req.body };
    console.log(req.body);
    RepairRepository.createRepair(repairData)
        .then( result => {
            res.redirect('/repair');
        }).catch(err => {
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
                    pageTitle: 'Dodaj nową naprawę',
                    btnLabel: 'Nowa naprawa',
                    formAction: '/repair/add',
                    navLocation: 'repair',
                    emp: repairData,
                    allEmps: allEmps,
                    allDepts: allDepts,
                    validationErrors: err.details
               });
              
            });
        });
};

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


exports.showRepairEdit = (req, res, next) => {
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
                formAction: '/repair/edit/'+repairId,
                navLocation: 'repair',
                validationErrors: {}
            });
        })
}

exports.updateRepairEdit = (req, res, next) => {
    const repairId = req.body.id_Naprawa;
    const repairData = { ...req.body };
    let repairEdit;
    let mechanicEdit;
    let carEdit;
    RepairRepository.updateRepair(repairId,repairData)
        .then( result => {
            res.redirect('/repair');
        }).catch(err => {
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
                    val: repairData,
                    repairEdit: repairEdit,
                    mechanicEdit: mechanicEdit,
                    carEdit: carEdit,
                    formMode: 'edit',
                    pageTitle: 'Aktualizacja naprawy',
                    btnLabel: 'Edytuj naprawę',
                    formAction: '/repair/edit/'+repairId,
                    navLocation: 'repair',
                    validationErrors: err.details
                });
            
            });
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