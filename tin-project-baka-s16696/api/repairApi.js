const repairRepository = require('../repository/mysql2/repairRepository');

exports.getRepairs = (req, res, next) => {
    repairRepository.getRepairs()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
           console.log(err);
        });
};




exports.deleteRepair = (req, res, next) => {
    const repairId = req.params.repairId;
    repairRepository.deleteRepair(repairId)
        .then(result => {
            res.status(200).json({message: 'Removed repair', Repair: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};




exports.createRepair = (req, res, next) => {
    repairRepository.createRepair(req.body)
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

exports.getRepairById = (req, res, next) => {
    const repairId = req.params.repairId;
    repairRepository.getRepairById(repairId)
        .then(e => {
            if(!e) {
                res.status(404).json({
                    message: 'Repair id: '+repairId+' not found'
                })
            } else {
                res.status(200).json(e);
            }
        });
};


exports.updateRepair = (req, res, next) => {
    const repairId = req.params.repairId;
    repairRepository.updateRepair(repairId, req.body)
        .then(result => {
           res.status(200).json({message: 'Repair updated!', repair: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};