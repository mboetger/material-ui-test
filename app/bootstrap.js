/**
 ** @jsx React.DOM
 **/

var React = require('react'),
      mui = require('material-ui'),
        PaperButton = mui.PaperButton;

React.render(
  <PaperButton type={PaperButton.Types.FLAT} label="Default" />,
  document.getElementById('example')
    );
