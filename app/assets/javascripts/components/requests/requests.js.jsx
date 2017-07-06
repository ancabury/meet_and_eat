var Requests = React.createClass({
  propTypes: {
    requests: React.PropTypes.array
  },

  getInitialState() { return { requests: this.props.requests } },

  render: function() {
    var requests = this.state.requests.map((r) => {
      return (
        <Request key={ r.id } request={ r }/>
      )
    });

    return (
      <div>
        <div className="row">
          <div className="col-lg-1">#</div>
          <div className="col-lg-3">Location</div>
          <div className="col-lg-3">Meal type</div>
          <div className="col-lg-3">Meal time</div>
          <div className="col-lg-2"/>
        </div>
        { requests }
      </div>
    );
  }
});

