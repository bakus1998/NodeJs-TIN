const MechanicRepository = require('../repository/mysql2/mechanicRepository');


exports.showMechanicList = (req, res, next) => {
    // res.render('pages/mechanics-list', {navLocation: 'mechanic'});
    MechanicRepository.getMechanics()
    .then(emps => {
        res.render('pages/mechanics-list', {
            emps: emps,
            navLocation: 'mechanic'
        });
    });
}

exports.showMechanicForm = (req, res, next) => {
    res.render('pages/mechanics-form', {
        mechanics:{},
        pageTitle: 'Dodaj nowego mechanika',
        formMode: 'createNew',
        formAction: '/mechanics/add', //TU 
        navLocation: 'mechanic'});
}

exports.addEmployee = (req, res, next) => {
    const empData = { ...req.body };
    MechanicRepository.createMechanic(empData)
        .then( result => {
            res.redirect('/mechanics');
        });
};


exports.showMechanicInfo = (req, res, next) => {
    // res.render('pages/mechanic-info', {navLocation: 'mechanic'});
    const mechanicId = req.params.mechanicId;
    MechanicRepository.getMechanicById(mechanicId)
        .then(emp => {
            res.render('pages/mechanic-info', {
                emp: emp,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły o mechaniku',
                formAction: '',
                navLocation: 'mechanic'
            });
        });
}

exports.showMechanicEdit = (req, res, next) => {
    // res.render('pages/mechanics-edit', {navLocation: 'mechanic'});

    const mechanicId = req.params.mechanicId;
    console.log("TO TUTAJ : " + mechanicId);
    MechanicRepository.getMechanicById(mechanicId)
        .then(emp => {
            res.render('pages/mechanics-edit', {
                emp: emp,
                formMode: 'edit',
                pageTitle: 'Aktualizacja mechanika',
                btnLabel: 'Edytuj pracownika',
                formAction: '/mechanics/edit/',
                navLocation: 'mechanic'
            });
        });

}


exports.updateMechanicEdit = (req, res, next) => {
    const mechanicId = req.body.id_mechanic;
    const empData = { ...req.body };
    //const mechanicId = req.body.id_mechanik;
    MechanicRepository.updateMechanic(mechanicId,empData)
        .then( result => {
            res.redirect('/mechanics');
        });

    //console.log("TO TUTAJ : " + mechanicId);
};



// exports.DeleteMechanic= (req, res, next) => {
//     // res.render('pages/mechanics-list', {navLocation: 'mechanic'});
//     const MechanicId = req.params.empId;

//     MechanicRepository.deleteMechanic()
//     .then(emps => {
//         res.render('pages/mechanics-list', {
//             emps: emps,
//             navLocation: 'mechanic'
//         });
//     });
// }

exports.deleteMechanic = (req, res, next) => {
    const mechanicId = req.params.mechanicId;
    console.log("TO TUTAJ : " + mechanicId);
    MechanicRepository.deleteMechanic(mechanicId)
    .then( () => {
        res.redirect('/mechanics');
    });
};