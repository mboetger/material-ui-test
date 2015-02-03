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

var Clients= React.createClass({
  

  getData: function() {
    var data = {};
    var clientsElem = document.getElementById('clients');
    if (clientsElem) {
      data = JSON.parse(clientsElem.getAttribute('data'));
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
  <Clients />, 
  document.getElementById('clients')
);
