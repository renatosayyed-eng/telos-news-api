// Importing the uuidv4 library
const { v4: uuidv4 } = require('uuid');

// Importing the authors database
const { authorsDatabase } = require('../controllers/authors.controller');

const news = [
    {
        id: "20390db8-5602-4d7a-95e9-63f35aaa0b1b",
        title: 'News 1',
        brief: 'Brief 1',
        content: 'Content 1',
        author_id: 'b90e13eb-36b3-4e4f-9d3d-670d68969730',
        image: 'https://picsum.photos/200/300',
        publish_date: '2021-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "20412fg8-5602-4d7a-95e9-63f35aaa0b1b",
        title: 'News 2',
        brief: 'Brief 2',
        content: 'Content 2',
        author_id: 'b90e13eb-36b3-4e4f-9d3d-670d68969730',
        image: 'https://picsum.photos/200/300',
        publish_date: '2021-01-02',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "df4fd06a-4e2f-4039-b8e4-552a4ac1ebed",
        title: 'News 3',
        brief: 'Brief 3',
        content: 'Content 3',
        author_id: 'df4fd06a-4e2f-4039-b8e4-221a3ac8ebed',
        image: 'https://picsum.photos/200/300',
        publish_date: '2021-01-03',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

const createNews = (req, res) => {
    const { title, brief, content, image, publish_date } = req.body;
    
    const newNews = {
        id: uuidv4(),
        title,
        brief,
        content,
        author_id: req.user.id,
        image,
        publish_date,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    news.push(newNews);

    res.status(201).end('News was created successfully');
}

const listAllNews = (req, res) => {
    // List all news

    const newsToReturn = news.map((news) => {
        const author = authorsDatabase.find((author) => author.id === news.author_id);

        return {
            id: news.id,
            title: news.title,
            author_name: author.name,
            author_id: author.id,
            publish_date: news.publish_date,
        };
    });
    
    res.status(200).json(newsToReturn);
}

const getNewsById = (req, res) => {
    const { id } = req.params;
    const newsToShow = news.find((news) => news.id === id);

    if (!newsToShow) {
        return res.status(404).json({ message: 'News not found' });
    }

    const newsToReturn = {
        id: newsToShow.id,
        title: newsToShow.title,
        brief: newsToShow.brief,
        content: newsToShow.content,
        author_id: news.author_id,
        image: newsToShow.image,
        publish_date: newsToShow.publish_date,
        createdAt: newsToShow.createdAt,
        updatedAt: newsToShow.updatedAt,
    };

    res.status(200).json(newsToReturn);
}

const filterNewsByAuthor = (req, res) => {
    const { author_id } = req.params;
    const newsToShow = news.filter((news) => news.author_id === author_id);

    if (!newsToShow) {
        return res.status(404).json({ message: 'There is no news published by this author' });
    }

    const author = authorsDatabase.find((author) => author.id === author_id);

    const newsToReturn = newsToShow.map((news) => {
        return {
            id: news.id,
            title: news.title,
            publish_date: news.publish_date,
            author_name: author.name,
            author_id: author.id,
        };
    });

    res.status(200).json(newsToReturn);
}

const updateNews = (req, res) => {
    const { id } = req.params;
    const { title, brief, content, image, publish_date } = req.body;

    const newsIndex = news.findIndex((news) => news.id === id);

    if (newsIndex === -1) {
        return res.status(404).json({ message: 'News not found' });
    }

    const newsToUpdate = {
        id,
        title,
        brief,
        content,
        author_id: news[newsIndex].author_id,
        image,
        publish_date,
        createdAt: news[newsIndex].createdAt,
        updatedAt: new Date(),
    };

    news[newsIndex] = newsToUpdate;

    res.status(200).end(`News ${id} was updated successfully`);
}

const deleteNews = (req, res) => {
    const { id } = req.params;

    const newsIndex = news.findIndex((news) => news.id === id);

    if (newsIndex === -1) {
        return res.status(404).json({ message: 'News not found' });
    }

    news.splice(newsIndex, 1);

    res.status(200).end(`News ${id} was deleted successfully`);

}

module.exports = {
    createNews,
    listAllNews,
    getNewsById,
    filterNewsByAuthor,
    updateNews,
    deleteNews,
}