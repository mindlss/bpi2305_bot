const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const getBotInstance = require('./bot/init');

const send = require('./bot/send');

dotenv.config();

const app = express();

getBotInstance();

//send.sendMessageToUser(940946764, 'Hello from the bot!');

const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);

const appRoute = require('./routes/App');
const apiRoute = require('./routes/Api');


app.use('/', appRoute);
app.use('/api', apiRoute);

app.listen(process.env.APP_PORT, () =>
    console.log(`started on port ${process.env.APP_PORT}`)
);
