const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');
const FileStore = require('session-file-store')(session);
const path = require('path');

const connectDB = require('./config/db');
const routings = require('./handlers/routing');

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
    session({
        store: new FileStore(),
        key: 'user_sid',
        secret: 'something',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 1000 * 60 * 60, // an hour
        },
    })
);

// app.set('views', path.join(__dirname, '..', 'views'));
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

routings(app);

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on ${PORT} port`
    )
);
