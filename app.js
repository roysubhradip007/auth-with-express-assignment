const express = require('express');
const databaseConnect = require('./config/databaseConfig');
const authRouter = require('./router/authRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
    origin: ['http://127.0.0.1:5500'],  
    credentials: true,
};
app.use(cors(corsOptions));


databaseConnect();

app.use('/', authRouter);

module.exports = app;
