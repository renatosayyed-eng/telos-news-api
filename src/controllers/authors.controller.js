// Importing UUID to generate unique ids
const { v4: uuidv4 } = require('uuid');

// Importing the password hashing utility
const { generateHash } = require('../utils/hashProvider');
// Importing the helper functions
const { removePrivateData } = require('../utils/helpersAuthors');

// Emulating the database - Statefull
const authors = [
    {
        id: 'b90e13eb-36b3-4e4f-9d3d-670d68969730',
        name: 'J. K. Rowling',
        biography: 'Joanne Rowling CH, OBE, HonFRSE, FRCPE, FRSL, better known by her pen name J. K. Rowling, is a British author, philanthropist, film producer, television producer, and screenwriter.',
        email: 'jkrowling@gmail.com',
        password: '$2a$08$TLXys8txEmo9DVlGDAW1MOcJYkIFDtlJa1RWYtubOx9wAIQqC7qW2',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'df4fd06a-4e2f-4039-b8e4-221a3ac8ebed',
        name: 'George R. R. Martin',
        biography: 'George Raymond Richard Martin, also known as GRRM, is an American novelist and short story writer, screenwriter, and television producer.',
        email: 'grr@gmail.com',
        password: '$2a$08$TLXys8txEmo9DVlGDAW1MOcJYkIFDtlJa1RWYtubOx9wAIQqC7qW2',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const createAuthor = async (req, res) => {
    const { name, biography, email, password } = req.body;

    const emailAlreadyInUse = authors.some((author) => author.email === email);

    if (emailAlreadyInUse) {
        return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await generateHash(password);

    const newAuthor = {
        id: uuidv4(),
        name,
        biography,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    authors.push(newAuthor);

    res.status(201).end('Author was created successfully');
};

const listAuthors = (req, res) => {
    res.status(200).json(authors.map(removePrivateData));
};

const getAuthor = (req, res) => {
    const { id } = req.params;
    const author = authors.find((author) => author.id === id);

    if (author) {
        return res.status(200).json(removePrivateData(author));
    }

    res.status(404).json({ message: 'Author not found' });
};

const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name, biography, email, password } = req.body;

    const authorIndex = authors.findIndex((author) => author.id === id);

    if (authorIndex === -1) {
        return res.status(404).json({ message: 'Author not found' });
    }

    const hashedPassword = await generateHash(password);

    const author = {
        id,
        name,
        biography,
        email,
        password: hashedPassword,
        createdAt: authors[authorIndex].createdAt,
        updatedAt: new Date(),
    };

    authors[authorIndex] = author;

    res.status(200).end(`Author ${id} was updated successfully`);
};

const removeAuthor = (req, res) => {
    const { id } = req.params;

    const authorIndex = authors.findIndex((author) => author.id === id);

    if (authorIndex === -1) {
        return res.status(404).json({ message: 'Author not found' });
    }

    authors.splice(authorIndex, 1);

    res.status(200).json({ message: `Author ${id} deleted` });
};

module.exports = {
    createAuthor,
    getAuthor,
    listAuthors,
    updateAuthor,
    removeAuthor,
    authorsDatabase: authors,
};