const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const serviceRequestRouter = require('./app/routes/ServiceRequest');

const app = express();

//app.set('port',process.env.PORT || 4000);
app.listen(4000);
console.log('Listening on port '+ process.env.PORT || 4000);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/client',express.static(path.join(__dirname+'/views', 'webapp')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/client', serviceRequestRouter);

// view engine setup
app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname+'/views', 'webapp'));
app.set('view engine', 'html');

//cross domain
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error view
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
