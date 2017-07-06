var Icon = React.createClass({
  propTypes: {
    iconClass: React.PropTypes.string,
    action: React.PropTypes.func
  },

  getDefaultProps(){
    return {
      iconClass: '',
      action: function() {}
    }
  },

  render(){
    return(
      <a onClick={ this.props.action }>
        <span className="icon">
          <i className={ this.props.iconClass } aria-hidden="true">
          </i>
        </span>
      </a>
    )
  }
});
