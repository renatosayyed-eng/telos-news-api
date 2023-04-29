const { authorsDatabase } = require('../controllers/authors.controller');

const removePrivateData = (author) => {
    const { id, email, password, ...rest } = author;

    return rest;
};

const verifyEmail = (email) => {
    const author = authorsDatabase.find((author) => author.email === email);

    if (author) {
        return true;
    }

    return false;
};

module.exports = {
    removePrivateData,
    verifyEmail,
};