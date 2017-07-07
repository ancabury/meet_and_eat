var Icon = React.createClass({
  propTypes: {
    iconClass: React.PropTypes.string,
    class: React.PropTypes.string,
    action: React.PropTypes.func
  },

  getDefaultProps(){
    return {
      iconClass: '',
      classs: '',
      action: function() {}
    }
  },

  render(){
    return(
      <a onClick={ this.props.action }>
        <span className={ "icon " + this.props.class }>
          <i className={ this.props.iconClass } aria-hidden="true">
          </i>
        </span>
      </a>
    )
  }
});
