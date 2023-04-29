// Importing the express module
const express = require('express');

// Importing the routes to the authentication
const authenticateRoutes = require('./routes/authenticate.routes');
// Importing the routes to the authors
const authorsRoutes = require('./routes/authors.routes');

// Importing the environment variables
const { PORT } = require('./config/env');

const app = express();

app.use(express.json());
app.use(authenticateRoutes);
app.use(authorsRoutes);

// Setting up the default route
app.get('/', (req, res) => {
    res.status(200).end('Welcome to the TELOS NEWS API');
});

// Setting up the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});