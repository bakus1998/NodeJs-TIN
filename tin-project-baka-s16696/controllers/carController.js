const CarRepository = require('../repository/mysql2/carRepository');
const { getMechanicById } = require('../repository/mysql2/mechanicRepository');


exports.showCarList = (req, res, next) => {
    CarRepository.getCars()
    .then(cars => {
        res.render('pages/cars-list', {
            cars: cars,
            navLocation: 'car',
            komunikat: false,
            komunikatedycja: false
        });
    });
}

exports.showCarForm = (req, res, next) => {
        CarRepository.createCarShow()        
        .then( result => {
            res.redirect('/car');
        })
        .catch(err => {
            console.log(err);
            res.render('pages/car-form', {
                pageTitle: 'Dodaj nowy pojazd',
                formMode: 'createNew',
                btnLabel: 'Dodaj pojazd',
                formAction: '/car/add',
                navLocation: 'car',
                emp:{},
                validationErrors: err.details
            });
        });
}


exports.addCar = (req, res, next) => {
    const carData = { ...req.body };
    CarRepository.createCar(carData)
        .then( result => {
            CarRepository.getCars()
            .then(cars => {
                res.render('pages/cars-list', {
                    cars: cars,
                    navLocation: 'car',
                    komunikat: true,
                    komunikatedycja: false
                });
            });
        }).catch(err => {
            console.log(err);
            res.render('pages/car-form', {
                emp: carData,
                pageTitle: 'Dodaj nowy pojazd',
                formMode: 'createNew',
                btnLabel: 'Dodaj pojazd',
                formAction: '/car/add',
                navLocation: 'car',
                validationErrors: err.details
            });
        });;
};


exports.showCarInfo = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car-info', {
                car: car,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły o pojeździe',
                formAction: '',
                navLocation: 'car'
            });
        });
}

exports.showCarEdit = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car-edit', {
                car: car,
                formMode: 'edit',
                pageTitle: 'Aktualizacja pojazdu',
                btnLabel: 'Edytuj pojazd',
                formAction: '/car/edit/'+carId,
                navLocation: 'car',
                validationErrors: {}
            });
        });

}


exports.updateCarEdit = (req, res, next) => {
    const carId = req.body.id_Pojazd;
    const carData = { ...req.body };
    CarRepository.updateCar(carId,carData)
        .then( result => {
            CarRepository.getCars()
            .then(cars => {
                res.render('pages/cars-list', {
                    cars: cars,
                    navLocation: 'car',
                    komunikat: false,
                    komunikatedycja: true
                });
            });
        }).catch(err => {
            res.render('pages/car-edit', {
                car: carData,
                pageTitle: 'Aktualizacja pojazdu',
                formMode: 'edit',
                btnLabel: 'Edytuj pojazd',
                formAction: '/car/edit/'+carId,
                navLocation: 'car',
                validationErrors: err.details
            });
        });
};


exports.deleteMechanic = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.deleteCar(carId)
    .then( () => {
        res.redirect('/car');
    });
};