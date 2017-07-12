var Icon = React.createClass({
  propTypes: {
    iconClass: React.PropTypes.string,
    class: React.PropTypes.string,
    action: React.PropTypes.func,
    title: React.PropTypes.string,
    permission: React.PropTypes.bool
  },

  getDefaultProps(){
    return {
      iconClass: '',
      classs: '',
      action: function() {},
      title: '',
      permission: false
    }
  },

  isDisabled: function() {
    if (!this.props.permission)
      return 'disabled';
  },

  render(){
    return(
      <a onClick={ this.props.action } title={ this.props.title } className={ this.isDisabled() }>
        <span className={ "icon " + this.props.class }>
          <i className={ this.props.iconClass } aria-hidden="true">
          </i>
        </span>
      </a>
    )
  }
});
