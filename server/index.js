var Io = require('socket.io');
var users = require('./admin/users/users.js');
var clients = require('./admin/clients/clients.js');

exports.listen = function (app) {
  console.log('starting io server');
  var io = Io(app);
  
  io.on('connection', function (socket) {
    console.log('connection started');
    users(socket);
    clients(socket);
  });
};

