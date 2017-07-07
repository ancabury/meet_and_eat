var Proposal = React.createClass({
  propTypes: {
    proposal: React.PropTypes.object,
    updateCollection: React.PropTypes.func
  },

  getInitialState() { return { proposal: this.props.proposal } },

  handleDelete: function(id) {
    $.ajax({
      url: `/api/proposals/${id}`,
      method: 'DELETE',
      success: (request) => {
        this.props.updateCollection(id);
        console.log(request.msg)
      },
      error: (response) => {
        console.log(response.responseText);
      }
    });
  },

  handleAccept: function(id) {
    $.ajax({
      url: `/api/proposals/${id}/accept`,
      method: 'GET',
      success: (request) => {
        this.props.updateCollection(id);
        console.log(request.msg)
      },
      error: (response) => {
        console.log(response.responseText);
      }
    });
  },

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-1 text-right"> { this.state.proposal.id } </div>
          <div className="col-lg-2"> { this.state.proposal.user.name } </div>
          <div className="col-lg-3"> { this.state.proposal.request.location } </div>
          <div className="col-lg-3"> { this.state.proposal.request.meal_type } </div>
          <div className="col-lg-2"> { this.state.proposal.request.meal_time } </div>
          <div className="col-lg-1 text-left">
            <Icon action={ this.handleDelete.bind(this, this.state.proposal.id) } iconClass="fa fa-trash" class="col-md-6 col-sm-2 col-xs-1" title="Delete"/>
            <Icon action={ this.handleAccept.bind(this, this.state.proposal.id) } iconClass="fa fa-check-square-o" class="col-md-6 col-sm-2 col-xs-1" title="Accept"/>
          </div>
        </div>
      </div>
    )
  }
});
