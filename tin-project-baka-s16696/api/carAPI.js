const carRepository = require('../repository/mysql2/carRepository');

exports.getCars = (req, res, next) => {
    carRepository.getCars()
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
           console.log(err);
        });
};


exports.deleteCar = (req, res, next) => {
    const carId = req.params.carId;
    carRepository.deleteCar(carId)
        .then(result => {
            res.status(200).json({message: 'Removed car', Car: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createCar = (req, res, next) => {
    carRepository.createCar(req.body)
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

exports.getCarById = (req, res, next) => {
    const carId = req.params.carId;
    carRepository.getCarById(carId)
        .then(e => {
            if(!e) {
                res.status(404).json({
                    message: 'Car with id: '+carId+' not found'
                })
            } else {
                res.status(200).json(e);
            }
        });
};



exports.updateCar = (req, res, next) => {
    const carId = req.params.carId;
    carRepository.updateCar(carId, req.body)
        .then(result => {
           res.status(200).json({message: 'Car updated!', car: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};