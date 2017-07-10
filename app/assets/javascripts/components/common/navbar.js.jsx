var Navbar = React.createClass({
  propTypes: {
    links: React.PropTypes.array,
    controlArea: React.PropTypes.object
  },

  render: function() {
    var links = this.props.links.map((l) => {
      return (
        <NavbarLink link={ l } key={ l.path }/>
      )
    });

    var user_details;
    if(this.props.controlArea.user != undefined ){
      user_details = <li> <a href='#'> Welcome, { this.props.controlArea.user } </a></li>
    }

    return (
      <nav className="navbar navbar-default navbar-toggleable-sm">
        <div className="container-fluid">
          <div className="navbar-header">
            <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu" aria-expanded="false">
              <Icon iconClass="fa fa-bars" class="navbar-toggler-icon"/>
            </button>
            <a className="navbar-brand" href="#">MeetNeat</a>
          </div>

          <div className="collapse navbar-collapse" id="menu">
            <ul className="nav navbar-nav">
              { links }
            </ul>

            <ul className="nav navbar-nav navbar-right">
              { user_details }
              <li><a href={ this.props.controlArea.controlLink.path }>{ this.props.controlArea.controlLink.name }</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
