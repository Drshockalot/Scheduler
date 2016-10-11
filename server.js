// Babel ES6/JSX Compiler
require('babel-register');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var Roster_Routes = require('./api/roster');
var Auth_Routes = require('./api/auth');
var User_Routes = require('./api/user');
var Character_Routes = require('./api/character');
var RaidWeek_Routes = require('./api/raidweek');
var Raid_Routes = require('./api/raid');
var Boss_Routes = require('./api/boss');
var Schedule_Routes = require('./api/schedule');
var Home_Routes = require('./api/home');
var Attendance_Routes = require('./api/attendance');

var fs = require('fs');
var cors = require('cors');
var db = require('./db/database');

var passport = require('./passport');

var cookieParser = require('cookie-parser');
var session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
var knex = require('./db/database').knex;
const store = new KnexSessionStore({
  knex: knex,
  tablename: 'sessions',
  clearInterval: 31536000
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, parameterLimit: 1000000 }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(cookieParser());
app.use(session({ store: store,
                  secret: 'blizzard',
                  saveUninitialized: true,
                  resave: true,
                  maxAge: 31*24*60*60*1000
                }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/roster/', Roster_Routes);
app.use('/auth/', Auth_Routes);
app.use('/api/user/', User_Routes);
app.use('/api/character/', Character_Routes);
app.use('/api/raidweek/', RaidWeek_Routes);
app.use('/api/raid/', Raid_Routes);
app.use('/api/boss/', Boss_Routes);
app.use('/api/schedule/', Schedule_Routes);
app.use('/api/home/', Home_Routes);
app.use('/api/attendance', Attendance_Routes);

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found');
    }
  });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
