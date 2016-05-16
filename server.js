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

var mongoose = require('mongoose');
var Schedule = require('./db/models/schedule');
var config = require('./config');

var Admin_RosterManagement_Routes = require('./api/roster');
var Auth_Routes = require('./api/auth');

var fs = require('fs');
var cors = require('cors');
//var db = require('./db/database');

var passport = require('./passport');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, apikey");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Max-Age", "86400");
//
//     if (req.method.toLowerCase() !== "options") {
//         return next();
//     }
//     return res.sendStatus(204);
// });

app.use(cookieParser());
app.use(session({ secret: 'blizzard',
                  saveUninitialized: true,
                  resave: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/admin/roster/', Admin_RosterManagement_Routes);
app.use('/auth/', Auth_Routes);

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

require('ssl-root-cas')
  .inject()
  .addFile(path.join(__dirname, 'self-certs', 'server', 'my-private-root-ca.cert.pem'))
  ;

var options = {
  key: fs.readFileSync(path.join(__dirname, 'self-certs', 'server', 'privkey.pem'))
// You don't need to specify `ca`, it's done by `ssl-root-cas`
//, ca: [ fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-root-ca.crt.pem'))]
, cert: fs.readFileSync(path.join(__dirname, 'self-certs', 'server', 'cert.pem'))
};

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var httpsServer = require('https').createServer(options, app);
var io = require('socket.io')(server);
var ioSecure = require('socket.io')(httpsServer);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  ioSecure.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
    ioSecure.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

ioSecure.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  ioSecure.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
    ioSecure.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

httpsServer.listen(8443, function() {
  console.log('Express HTTPS server listening on port ' + 8443);
});
