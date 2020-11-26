exports.showCarList = (req, res, next) => {
    res.render('pages/cars-list', {navLocation: 'car'});
}

exports.showCarForm = (req, res, next) => {
    res.render('pages/car-form', {navLocation: 'car'});
}

exports.showCarInfo = (req, res, next) => {
    res.render('pages/car-info', {navLocation: 'car'});
}

exports.showCarEdit = (req, res, next) => {
    res.render('pages/car-edit', {navLocation: 'car'});
}