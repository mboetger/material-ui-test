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
var orm = require('orm');
var oauthModel = require('./models/oauth.js');
var admin = require('./routes/admin');
var passport = require('passport');
var login = require('./routes/login')(passport)
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var ConnectRoles = require('connect-roles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//material-ui needs less
app.use(less(path.join(__dirname, 'public/less')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'sick bunny' }));

passport.serializeUser(oauthModel.serializeUser);
passport.deserializeUser(oauthModel.deserializeUser);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(oauthModel.getUser));

//set up roles
var user = new ConnectRoles({
  failureHandler: function (req, res, action) {
    var accept = req.headers.accept || '';
    res.status(403);
    if (~accept.indexOf('html')) {
      res.render('access-denied', {title: 'Access Denied', action: action});
    } else {
      res.send('Access Denied - You don\'t have permission to: ' + action);
    }
  }
});

app.use(user.middleware());
//anonymous users can only access the home page
user.use(function (req, action) {
  if (!req.isAuthenticated()) return action === 'open';
});
//don't return false, because admins can also see private
user.use('private', function (req) {
  if (req.user.role === 'noob') { return true; }
});
//admins can see everything
user.use(function (req) {
  if (req.user.role === 'admin') { return true; }
});

app.use('/', user.can('open'), routes);
app.use('/', user.can('open'), login);
app.use('/admin', user.can('admin'), admin);
app.use('/users', users);


//oauth server
app.oauth = oauthserver({
    model: oauthModel, // See below for specification
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
