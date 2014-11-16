/**
 ** @jsx React.DOM
 **/
var React = require('react'),
      mui = require('material-ui'),
      Input = mui.Input,
      PaperButton = mui.PaperButton;

var Login = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    };
  },
  propTypes: {
    url: React.PropTypes.string.isRequired,
  },
  submit:function() {
    document.forms["login"].submit();
  } ,
  validate:function() {
    this.submit();
  },
  onClick:function(event) {
    this.validate();
  },
  render: function() {
    return (
      <form name="login" action={this.props.url} method="post">
        <Input name="username" type="text" description="Please enter your username" value={this.state.username}/>
        <Input name="password" type="password" description="Please enter your password" value={this.state.password}/>
        <PaperButton type={PaperButton.Types.FLAT} label="Submit" onClick={this.onClick} />
      </form>
    );
  }
});

React.render(
  <Login url="/login" />, 
  document.getElementById('login')
);
