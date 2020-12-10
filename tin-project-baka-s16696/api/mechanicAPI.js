const mechanicRepository = require('../repository/mysql2/mechanicRepository');

exports.getMechanics = (req, res, next) => {
    mechanicRepository.getMechanics()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
           console.log(err);
        });
};



exports.deleteMechanic = (req, res, next) => {
    const mechanicId = req.params.mechanicId;
    mechanicRepository.deleteMechanic(mechanicId)
        .then(result => {
            res.status(200).json({message: 'Removed mechanic', Mechanik: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};




exports.createMechanic = (req, res, next) => {
    mechanicRepository.createMechanic(req.body)
        .then(newObj => {
           res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getMechanicById = (req, res, next) => {
    const mechanicId = req.params.mechanicId;
    mechanicRepository.getMechanicById(mechanicId)
        .then(e => {
            if(!e) {
                res.status(404).json({
                    message: 'Mechanic with id: '+mechanicId+' not found'
                })
            } else {
                res.status(200).json(e);
            }
        });
};


exports.updateMechanic = (req, res, next) => {
    const mechanicId = req.params.mechanicId;
    mechanicRepository.updateEmployee(mechanicId, req.body)
        .then(result => {
           res.status(200).json({message: 'Mechanic updated!', mechanic: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};