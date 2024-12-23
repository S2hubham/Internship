const express = require('express');
const passport = require('passport');
const { registerUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', passport.authenticate('local'), (req, res) => res.send('Logged in'));
router.get('/logout', (req, res) => {
  req.logout(() => res.send('Logged out'));
});

module.exports = router;
