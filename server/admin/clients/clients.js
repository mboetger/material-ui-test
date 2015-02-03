/* User server side controller */

var controller = function(socket) {
  socket.emit('news', { hello: 'clients-world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
};

module.exports = controller;
