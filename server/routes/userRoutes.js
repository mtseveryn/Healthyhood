const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/favorites', userController.postFavorite);

router.get('/favorites/:id', userController.getAllFavorites);

module.exports = router;
