const { Router } = require('express');

const routes = Router();
const { createAuthor, listAuthors, getAuthor, updateAuthor, removeAuthor } = require('../controllers/authors.controller');

// Importing the middleware to verify the authentication
const { verifyAuthentication } = require('../middlewares/verifyAuthentication');

// Method to get all authors
routes.get('/authors', listAuthors);

// Method to get an author by id
routes.get('/authors/:id', getAuthor);

// Method to create a new author {id, name, biography, email, password, createdAt, updatedAt}
routes.post('/authors', createAuthor);

// Method to update an author by id {name, biography, email, password, updatedAt}
routes.put('/authors/:id', updateAuthor);

// Method to delete an author by id
routes.delete('/authors/:id', removeAuthor);

module.exports = routes;