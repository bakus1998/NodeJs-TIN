// exports.showCarList = (req, res, next) => {
//     res.render('pages/cars-list', {navLocation: 'car'});
// }

const CarRepository = require('../repository/mysql2/carRepository');
const { getMechanicById } = require('../repository/mysql2/mechanicRepository');


exports.showCarList = (req, res, next) => {
    // res.render('pages/mechanics-list', {navLocation: 'mechanic'});
    CarRepository.getCars()
    .then(cars => {
        res.render('pages/cars-list', {
            cars: cars,
            navLocation: 'car'
        });
    });
}

// exports.showCarForm = (req, res, next) => {
//     res.render('pages/car-form', {navLocation: 'car'});
// }

exports.showCarForm = (req, res, next) => {
    res.render('pages/car-form', {
        cars:{},
        pageTitle: 'Dodaj nowy pojazd',
        formMode: 'createNew',
        formAction: '/car/add', 
        navLocation: 'car'});
}



exports.addCar = (req, res, next) => {
    const carData = { ...req.body };
    CarRepository.createCar(carData)
        .then( result => {
            res.redirect('/car');
        });
};


// exports.showCarInfo = (req, res, next) => {
//     res.render('pages/car-info', {navLocation: 'car'});
// }

exports.showCarInfo = (req, res, next) => {
    // res.render('pages/mechanic-info', {navLocation: 'mechanic'});
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

// exports.showCarEdit = (req, res, next) => {
//     res.render('pages/car-edit', {navLocation: 'car'});
// }


exports.showCarEdit = (req, res, next) => {
    // res.render('pages/mechanics-edit', {navLocation: 'mechanic'});

    const carId = req.params.carId;
    console.log("TO TUTAJ : " + carId);
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car-edit', {
                car: car,
                formMode: 'edit',
                pageTitle: 'Aktualizacja pojazdu',
                btnLabel: 'Edytuj pojazd',
                formAction: '/car/edit/',
                navLocation: 'car'
            });
        });

}


exports.updateCarEdit = (req, res, next) => {
    const carId = req.body.id_Pojazd;
    console.log("TO ten : " + carId);

    const carData = { ...req.body };
    //const mechanicId = req.body.id_mechanik;
    CarRepository.updateCar(carId,carData)
        .then( result => {
            res.redirect('/car');
        });

    //console.log("TO TUTAJ : " + mechanicId);
};

exports.deleteMechanic = (req, res, next) => {
    const carId = req.params.carId;
    console.log("TO TUTAJ : " + carId);
    CarRepository.deleteCar(carId)
    .then( () => {
        res.redirect('/car');
    });
};