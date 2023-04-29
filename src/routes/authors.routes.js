const { Router } = require('express');

const routes = Router();
const { createAuthor, listAuthors, getAuthor, updateAuthor, removeAuthor } = require('../controllers/authors.controller');

// Route to get all authors
routes.get('/authors', listAuthors);

// Route to get an author by id
routes.get('/authors/:id', getAuthor);

// Route to create a new author {id, name, biography, email, password, createdAt, updatedAt}
routes.post('/authors', createAuthor);

// Route to update an author by id {name, biography, email, password, updatedAt}
routes.put('/authors/:id', updateAuthor);

// Route to delete an author by id
routes.delete('/authors/:id', removeAuthor);

module.exports = routes;