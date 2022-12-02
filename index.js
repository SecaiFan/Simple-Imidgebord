process.title = 'bordapp';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./DB');
const path = require('path');
const postController = require('./controllers/postController.js');

const PORT = process.env.PORT ?? 7000;

const router = require('./routes/index.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use('/', router);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Обработка ошибок, замыкающий Middleware

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, function() {console.log(`Server start on Port: ${PORT}`);});
    } catch(error) {
        console.log(error);
    }
};

start();