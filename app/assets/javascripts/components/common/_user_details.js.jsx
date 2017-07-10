var UserDetails = React.createClass({
  propTypes: {
    user_name: React.PropTypes.string,
    user_image_link: React.PropTypes.string
  },

  render: function(){
    return(
    <li>
      <img className="pull-left user-profile-img" src={ this.props.user_image_link }/>
      <a href='#' className="pull-right"> Welcome, { this.props.user_name } </a>
    </li>
    )
  }
});
