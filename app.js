const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const serviceRequestRouter = require('./app/routes/ServiceRequest');
const app = express();
const cors = require('cors');


//cross domain
app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/client',express.static(path.join(__dirname, 'webapp')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true }));

app.use('/client', serviceRequestRouter);

// view engine setup
app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname+'/views', 'webapp'));
app.set('view engine', 'html');


module.exports = app;
