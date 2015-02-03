/**
 ** @jsx React.DOM
 **/
var React = require('react'),
      mui = require('material-ui'),
      Reactable = require('react-table-component'),
      Table = Reactable.Table,
      io = require('socket.io-client');

var socket = io.connect('http://localhost');

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

var Users= React.createClass({
  

  getData: function() {
    var data = {};
    var usersElem = document.getElementById('users');
    if (usersElem) {
      data = JSON.parse(usersElem.getAttribute('data'));
    }
    return data;
  },

  render: function() {
    return (
      <Table className="table" data={this.getData()}>
      </Table>
    );
  }
});


React.render(
  <Users />, 
  document.getElementById('users')
);
