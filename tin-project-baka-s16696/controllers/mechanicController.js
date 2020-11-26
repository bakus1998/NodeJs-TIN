exports.showMechanicList = (req, res, next) => {
    res.render('pages/mechanics-list', {navLocation: 'mechanic'});
}

exports.showMechanicForm = (req, res, next) => {
    res.render('pages/mechanics-form', {navLocation: 'mechanic'});
}

exports.showMechanicInfo = (req, res, next) => {
    res.render('pages/mechanic-info', {navLocation: 'mechanic'});
}

exports.showMechanicEdit = (req, res, next) => {
    res.render('pages/mechanics-edit', {navLocation: 'mechanic'});
}