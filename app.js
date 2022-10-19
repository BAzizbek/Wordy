require('dotenv').config();
require('./handlers/hbs');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');
const path = require('path');

const connectDB = require('./config/db');
const routings = require('./handlers/routing');

connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
routings(app);

app.engine('hbs', engine({ defaultLayout: 'index', extname: '.hbs' }));
app.set('view engine', 'hbs');

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on ${PORT} port`
    )
);
