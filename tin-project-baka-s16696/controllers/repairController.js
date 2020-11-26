exports.showRepairList = (req, res, next) => {
    res.render('pages/repair-list', {navLocation: 'repair'});
}

exports.showRepairForm = (req, res, next) => {
    res.render('pages/repair-form', {navLocation: 'repair'});
}

exports.showRepairInfo = (req, res, next) => {
    res.render('pages/repair-info', {navLocation: 'repair'});
}

exports.showRepairEdit = (req, res, next) => {
    res.render('pages/repair-edit', {navLocation: 'repair'});
}