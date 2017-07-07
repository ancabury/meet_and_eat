var Requests = React.createClass({
  propTypes: {
    requests: React.PropTypes.array
  },

  getInitialState() { return { requests: this.props.requests } },

  handleSave: function(request) {
    var newRequests = this.state.requests;
    newRequests.push(request);
    this.setState({ requests: newRequests });
  },

  handleDelete: function(id) {
    var newRequests = this.state.requests.filter((i) => { return i.id != id });
    this.setState({ requests: newRequests });
  },

  render: function() {
    var requests = this.state.requests.map((r) => {
      return (
        <Request key={ r.id } request={ r } deleteHandler={ this.handleDelete }/>
      )
    });

    return (
      <div>
        <div className="row">
          <div className="col-lg-1 text-right"><strong>#</strong></div>
          <div className="col-lg-3"><strong>Location</strong></div>
          <div className="col-lg-3"><strong>Meal type</strong></div>
          <div className="col-lg-2"><strong>Meal time</strong></div>
          <div className="col-lg-2"><strong>User</strong></div>
          <div className="col-lg-1"/>
        </div>
        <div className="row">
          <NewRequest saveHandler={ this.handleSave }/>
        </div>
        { requests }
      </div>
    );
  }
});

