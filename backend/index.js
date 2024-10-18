const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const getBotInstance = require('./bot/init');
const path = require('path');
const mongoose = require('mongoose');

const send = require('./bot/send');

dotenv.config();

const app = express();

mongoose.connect('mongodb://mongodb:27017/miniapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));  

getBotInstance();

const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);

const appRoute = require('./routes/App');
const apiRoute = require('./routes/Api');


app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.svg')) {
            res.setHeader('Content-Type', 'image/svg+xml');
        } else if (path.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
        } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        } else if (path.endsWith('.gif')) {
            res.setHeader('Content-Type', 'image/gif');
        } else if (path.endsWith('.webp')) {
            res.setHeader('Content-Type', 'image/webp');
        }
    }
}));


app.use('/', appRoute);
app.use('/api', apiRoute);

app.listen(process.env.APP_PORT, () =>
    console.log(`started on port ${process.env.APP_PORT}`)
);
