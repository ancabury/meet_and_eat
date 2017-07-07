var Icon = React.createClass({
  propTypes: {
    iconClass: React.PropTypes.string,
    class: React.PropTypes.string,
    action: React.PropTypes.func,
    title: React.PropTypes.string
  },

  getDefaultProps(){
    return {
      iconClass: '',
      classs: '',
      action: function() {},
      title: ''
    }
  },

  render(){
    return(
      <a onClick={ this.props.action } title={ this.props.title }>
        <span className={ "icon " + this.props.class }>
          <i className={ this.props.iconClass } aria-hidden="true">
          </i>
        </span>
      </a>
    )
  }
});
