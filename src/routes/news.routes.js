const { Router } = require('express');

const routes = Router();
const { createNews, listAllNews, getNewsById, filterNewsByAuthor, updateNews, deleteNews } = require('../controllers/news.controller');

// Importing the middleware to validate the token
const { verifyAuthentication } = require('../middlewares/verifyAuthentication');

routes.get('/news', listAllNews);
routes.get('/news/:id', getNewsById);
routes.get('/news/author/:author_id', filterNewsByAuthor);
routes.post('/news', verifyAuthentication, createNews);
routes.put('/news/:id', updateNews);
routes.delete('/news/:id', deleteNews);

module.exports = routes;