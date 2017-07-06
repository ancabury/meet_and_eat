var InputWithErrors = React.createClass({
  getDefaultProps(){
    return {
      attrName: '',
      errors: {},
      className: ''
    }
  },

  className(){
    if (this.props.errors && this.props.errors[this.props.attrName])
      return `${this.props.className} has-error`;
    return this.props.className
  },

  errors(){
    if (this.props.errors && this.props.errors[this.props.attrName])
      var errorMessages = this.props.errors[this.props.attrName].join(', ');

    return (
      <span className="help-block">
        { errorMessages }
      </span>
    )
  },

  render(){
    return(
      <div className={ this.className() }>
        { this.props.children }

        { this.errors() }
      </div>
    )
  }
});
