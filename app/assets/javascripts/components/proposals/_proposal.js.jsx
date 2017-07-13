var Proposal = React.createClass({
  propTypes: {
    proposal: React.PropTypes.object,
    updateCollection: React.PropTypes.func
  },

  getInitialState() { return { proposal: this.props.proposal } },

  componentDidMount() {
    $.ajax({
      url: `/api/proposals/${this.state.proposal.id}/permissions`,
      method: 'GET',
      success: (response) => {
        this.setState({ can_accept: response.permissions.accept, can_destroy: response.permissions.destroy })
      },
    });
  },

//  ### Actions ###

  handleDelete: function(id) {
    $.ajax({
      url: `/api/proposals/${id}`,
      method: 'DELETE',
      success: (request) => {
        this.props.updateCollection(id);
        let flash = JST['templates/alert_success']({msg: request.msg, styles: 'width: inherit;'});
        displayFlash(flash);
      },
      error: this.handleErrors
    });
  },

  handleAccept: function(id) {
    $.ajax({
      url: `/api/proposals/${id}/accept`,
      method: 'GET',
      success: (request) => {
        this.props.updateCollection(id);
        let flash = JST['templates/alert_success']({msg: request.msg, styles: 'width: inherit;'});
        displayFlash(flash);
      },
      error: this.handleErrors
    });
  },

  handleErrors: function(response) {
    if (response.status == 403){ // user has no permission
      let flash = JST['templates/alert_error']({msg: response.responseJSON.unauthorized, styles: 'width: inherit;'});
      displayFlash(flash);
    }
    else {
      Object.keys(response.responseJSON.errors).map(function (key) {
        err_msg = response.responseJSON.errors[key];
        let flash = JST['templates/alert_error']({msg: err_msg, styles: 'width: inherit;'});
        displayFlash(flash);
      });
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
            <Icon action={ this.handleDelete.bind(this, this.state.proposal.id) } iconClass="fa fa-trash" class="col-md-1 col-sm-1 col-xs-1" title="Delete"
                  permission={ this.state.can_destroy }/>
            <Icon action={ this.handleAccept.bind(this, this.state.proposal.id) } iconClass="fa fa-check-square-o" class="col-md-1 col-sm-1 col-xs-1" title="Accept"
                  permission={ this.state.can_accept }/>
          </div>
        </div>
      </div>
    )
  }
});
