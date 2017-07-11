var Proposals = React.createClass({
  propTypes: {
    proposals: React.PropTypes.array
  },

  getInitialState() { return { proposals: this.props.proposals } },

  updateCollection: function(id) {
    var newProposal = this.state.proposals.filter((i) => { return i.id != id });
    this.setState({ proposals: newProposal });
  },

  render: function() {
    var proposals = this.state.proposals.map((r) => {
      return (
        <Proposal key={ r.id } proposal={ r } updateCollection={ this.updateCollection }/>
      )
    });

    return (
      <div>
        <div className="row">
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 hidden-xs hidden-sm text-right"><strong>#</strong></div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"><strong>From</strong></div>
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2"><strong>Location</strong></div>
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2"><strong>Meal type</strong></div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"><strong>Meal time</strong></div>
          <div className="col-lg-1 col-md-2 col-sm-2 col-xs-2"/>
        </div>
        { proposals }
      </div>
    );
  }
});

