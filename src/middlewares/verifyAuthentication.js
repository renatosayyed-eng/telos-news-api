const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/env');

const verifyAuthentication = (req, res, next) => {
    const { authorization } = req.headers;
    const message = 'Invalid token';

    if ( authorization ) {
        return res.status(401).json({ message: message });
    }

    const [prefix, token] = authorization.split(' ');

    if (prefix != 'Bearer') {
        return res.status(401).json({ message: message });
    }

    if (!token) {
        return res.status(401).json({ message: message });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: message });
        }

        req.user = decoded;

        next();
    });
}

module.exports = {
    verifyAuthentication,
};