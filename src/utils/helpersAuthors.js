const removePrivateData = (author) => {
    const { id, email, password, ...rest } = author;

    return rest;
};

const verifyEmail = (email) => {
    const author = authors.find((author) => author.email === email);

    if (author) {
        return true;
    }

    return false;
};

module.exports = {
    removePrivateData,
    verifyEmail,
};