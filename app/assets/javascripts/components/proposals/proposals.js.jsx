var Proposals = React.createClass({
  propTypes: {
    proposals: React.PropTypes.array
  },

  getInitialState() { return { proposals: this.props.proposals } },

  handleSave: function(proposal) {
    var newProposals = this.state.proposals;
    newProposals.push(proposal);
    this.setState({ proposals: newProposals });
  },

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
          <div className="col-lg-1 text-right"><strong>#</strong></div>
          <div className="col-lg-2"><strong>From</strong></div>
          <div className="col-lg-3"><strong>Location</strong></div>
          <div className="col-lg-3"><strong>Meal type</strong></div>
          <div className="col-lg-2"><strong>Meal time</strong></div>
          <div className="col-lg-1"/>
        </div>
        { proposals }
      </div>
    );
  }
});

