const MechanicRepository = require('../repository/mysql2/mechanicRepository');


exports.showMechanicList = (req, res, next) => {
    MechanicRepository.getMechanics()
    .then(emps => {
        res.render('pages/mechanics-list', {
            emps: emps,
            navLocation: 'mechanic'
        });
    });
}

exports.showMechanicForm = (req, res, next) => {
    MechanicRepository.createMechanicShow()
        .then( result => {
            res.redirect('/mechanics');
        })
        .catch(err => {
            console.log(err);
            res.render('pages/mechanics-form', {
                pageTitle: 'Dodawanie pracownika',
                formMode: 'createNew',
                btnLabel: 'Dodaj pracownika',
                formAction: '/mechanics/add',
                navLocation: 'mechanic',
                emp:{
                    Nazwisko: '',
                    Imie:'',
                    Doswiadczenie: ''
                },
                validationErrors: err.details
            });
        });
        
}

exports.addEmployee = (req, res, next) => {
    const empData = { ...req.body };
    MechanicRepository.createMechanic(empData)
        .then( result => {
            res.redirect('/mechanics');
        })
        .catch(err => {
            console.log(err);
            res.render('pages/mechanics-form', {
                emp: empData,
                pageTitle: 'Dodawanie pracownika',
                formMode: 'createNew',
                btnLabel: 'Dodaj pracownika',
                formAction: '/mechanics/add',
                navLocation: 'mechanic',
                validationErrors: err.details
            });
        });
};


exports.showMechanicInfo = (req, res, next) => {
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
    const mechanicId = req.params.mechanicId;
    console.log("TO TUTAJ show : " + mechanicId);
    MechanicRepository.getMechanicById(mechanicId)
        .then(emp => {
            console.log("TO TUTAJ show  RENDER: " + mechanicId);
            res.render('pages/mechanics-edit', {
                emp: emp,
                formMode: 'edit',
                pageTitle: 'Aktualizacja mechanika',
                btnLabel: 'Edytuj mechanika',
                formAction: '/mechanics/edit/'+mechanicId,
                navLocation: 'mechanic',
                validationErrors: {}
            });
        });
}


exports.updateMechanicEdit = (req, res, next) => {
    const mechanicId = req.body.id_mechanic;
    const empData = { ...req.body };
    MechanicRepository.updateMechanic(mechanicId,empData)
        .then( result => {
            res.redirect('/mechanics');
        })
        .catch(err => {
            console.log("TO UPDATE : " + mechanicId);
            res.render('pages/mechanics-form', {
                emp: empData,
                pageTitle: 'Aktualizacja mechanika',
                formMode: 'edit',
                btnLabel: 'Edytuj mechanika',
                formAction: '/mechanics/edit/'+mechanicId,
                navLocation: 'mechanic',
                validationErrors: err.details
            });
        });
};


exports.deleteMechanic = (req, res, next) => {
    const mechanicId = req.params.mechanicId;
    console.log("TO TUTAJ : " + mechanicId);
    MechanicRepository.deleteMechanic(mechanicId)
    .then( () => {
        res.redirect('/mechanics');
    }).catch(e =>{

    });
};