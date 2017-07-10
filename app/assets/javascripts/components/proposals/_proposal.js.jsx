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
        this.handleErrors(response.responseJSON, response.status, undefined);
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
        this.handleErrors(response.responseJSON, response.status, undefined);
      }
    });
  },

  handleErrors: function(errors, status, object) {
    if (status == 403){ // user has no permission
      console.log(errors.unauthorized);
      if(object != undefined) this.setState({ is_edited: false, request: object })
    }
    else {
      this.setState({ errors: response.responseJSON.errors });
    }
  },

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 hidden-xs hidden-sm text-right"> { this.state.proposal.id } </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"> { this.state.proposal.user.name } </div>
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2"> { this.state.proposal.request.location } </div>
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2"> { this.state.proposal.request.meal_type } </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"> { this.state.proposal.request.meal_time } </div>
          <div className="col-lg-1 col-md-2 col-sm-2 col-xs-2">
            <Icon action={ this.handleDelete.bind(this, this.state.proposal.id) } iconClass="fa fa-trash" class="col-md-1 col-sm-1 col-xs-1" title="Delete"/>
            <Icon action={ this.handleAccept.bind(this, this.state.proposal.id) } iconClass="fa fa-check-square-o" class="col-md-1 col-sm-1 col-xs-1" title="Accept"/>
          </div>
        </div>
      </div>
    )
  }
});
