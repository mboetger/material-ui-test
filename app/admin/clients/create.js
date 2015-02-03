/**
 ** @jsx React.DOM
 **/
var React = require('react'),
      mui = require('material-ui'),
      Input = mui.Input,
      PaperButton = mui.PaperButton;

var CreateClient = React.createClass({
  getInitialState: function() {
    return {
      client_secret: '',
      redirect_uri: ''
    };
  },
  propTypes: {
    url: React.PropTypes.string.isRequired,
  },
  submit:function() {
    document.forms["create-client"].submit();
  } ,
  validate:function() {
    this.submit();
  },
  onClick:function(event) {
    this.validate();
  },
  render: function() {
    return (
      <form name="create-client" action={this.props.url} method="post">
        <Input name="client_secret" type="text" description="Please enter a client secret" value={this.state.client_secret}/>
        <Input name="redirect_uri" type="text" description="Please enter your redirect uri" value={this.state.redirect_uri}/>
        <PaperButton type={PaperButton.Types.FLAT} label="Submit" onClick={this.onClick} />
      </form>
    );
  }
});

React.render(
  <CreateClient url="/admin/clients" />, 
  document.getElementById('create-client')
);
