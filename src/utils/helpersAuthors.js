const { authorsDatabase } = require('../controllers/authors.controller');

const removePrivateData = (author) => {
    const { id, email, password, ...rest } = author;

    return rest;
};

module.exports = {
    removePrivateData,
};