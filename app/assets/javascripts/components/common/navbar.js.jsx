var Navbar = React.createClass({
  propTypes: {
    links: React.PropTypes.array
  },

  getInitialState() { return { links: [] } },

  render: function() {
    var links = this.props.links.map((l) => {
      return (
        <NavbarLink link={ l } key={ l.path }/>
      )
    });

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              { links }
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Log in</a></li>
              <li><a href="#">Log out</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
