const jwt = require('jsonwebtoken');

const { authorsDatabase } = require('../controllers/authors.controller');
const { compareHash } = require('../utils/hashProvider');
const { JWT_SECRET } = require('../config/env');

const login = async (req, res) => {
    const { email, password } = req.body;

    const author = authorsDatabase.find((author) => author.email === email);

    const errorMessage = 'Invalid email or password';

    if (!author) {
        return res.status(404).json({ message: errorMessage});
    }

    const isPasswordValid = await compareHash(password, author.password);

    if (!isPasswordValid) {
        return res.status(404).json({ message: errorMessage});
    }

    const token = jwt.sign(author, JWT_SECRET, {
        expiresIn: '1h',
    });

    const { password: authorPassword, ...authorData } = author;

    res.status(200).json({ message: 'Login successfully', token: token, authorData});
};

module.exports = {
    login,
};