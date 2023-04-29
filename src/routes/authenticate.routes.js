const { Router } = require('express');

const { login } = require('../controllers/authenticate.controller');

const routes = Router();

routes.post('/login', login);

module.exports = routes;