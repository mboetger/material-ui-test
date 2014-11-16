var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var less = require("less-middleware");
var oauthserver = require('oauth2-server');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set("js", app.get("env") === "development" ? "dev" : "min");
app.use(function(req, res, next) {
    if (req.url === "/javascripts/bundle.js") {
          req.url = "/javascripts/bundle." + app.get("js") + ".js";
            }

      next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//material-ui needs less
app.use(less(path.join(__dirname, 'public/less')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);


//oauth server
app.oauth = oauthserver({
    model: {}, // See below for specification
    grants: ['password'],
    debug: true
});
app.all('/oauth/token', app.oauth.grant());
app.get('/api', app.oauth.authorise(), function (req, res) {
    res.send('Secret area');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
