var NavbarLink = React.createClass({
  propTypes: {
    link: React.PropTypes.object
  },

  render: function() {
    return (
      <li className="active">
        <a href={ this.props.link.path }>
          { this.props.link.name }
        </a>
      </li>
    )
  }
});
