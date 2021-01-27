var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main', komunikat: false, komunikatzaloguj: false });
}); 
module.exports = router;

router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);