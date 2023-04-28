const { compare, hash } = require('bcryptjs');

const generateHash = async (payload) => {
    return hash(payload, 8);
}

const compareHash = async (payload, hashedPayload) => {
    return compare(payload, hashedPayload);
}

module.exports = {
    generateHash,
    compareHash,
}