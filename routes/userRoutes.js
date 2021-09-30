const express = require('express');
const router = express.Router();
const user = require('../controller/userController');
const passport = require('passport');
require('../middleware/passport')(passport)

router.post('/signup', user.signup);
router.post('/login', user.login);

//router.get('/', user.getAllUser)
router.get('/:id', user.getUserById)

router.get('/', passport.authenticate('jwt',{session:false}) ,(req, res) => {
    res.send("hello World")
})

module.exports = router