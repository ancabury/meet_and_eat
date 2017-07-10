var Request = React.createClass({
  propTypes: {
    request: React.PropTypes.object,
    deleteHandler: React.PropTypes.func
  },

  getInitialState() { return { is_edited: false, request: this.props.request, errors: {} } },

//  ### Actions ###
  handleInputChange: function(event) {
    const prop = event.target.name;
    const value = event.target.value;
    var newRequest = this.state.request;
    newRequest[prop] = value;

    this.setState({
      request: newRequest
    })
  },

  handleEdit: function() {
    this.setState({ is_edited: true })
  },

  handleUpdate: function(id) {
    $.ajax({
      url: `/api/requests/${id}`,
      method: 'PATCH',
      data: { request: {
                location: this.state.request.location,
                meal_type: this.state.request.meal_type,
                meal_time: this.state.request.meal_time
            } },
      success: (request) => {
        this.setState({ is_edited: false });
        console.log(request.msg)
      },
      error: (response) => {
        this.handleErrors(response.responseJSON, response.status, response.responseJSON.request);
      }
    });
  },

  handleDelete: function(id) {
    $.ajax({
      url: `/api/requests/${id}`,
      method: 'DELETE',
      success: (request) => {
        this.props.deleteHandler(id);
        console.log(request.msg)
      },
      error: (response) => {
        this.handleErrors(response.responseJSON, response.status, response.responseJSON.request);
      }
    });
  },

  handleCreateProposal: function(id) {
    $.ajax({
      url: `/api/proposals`,
      method: 'POST',
      data: { proposal: { request_id: id} },
      success: (request) => {
        console.log(request.msg)
      },
      error: (response) => {
        console.log(response.responseJSON.errors.user_id);
      }
    });
  },

  handleErrors: function(errors, status, object) {
    if (status == 403){ // user has no permission
      console.log(errors.unauthorized);
      if(object != undefined) this.setState({ is_edited: false, request: object })
    }
    else {
      this.setState({ errors: errors.errors });
    }
  },

//  ### HTML ###
  renderInfos: function(){
    return(
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 hidden-xs hidden-sm text-right"> { this.state.request.id } </div>
        <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2"> { this.state.request.location } </div>
        <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2"> { this.state.request.meal_type } </div>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"> { this.state.request.meal_time } </div>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"> { this.state.request.user.name } </div>
        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 text-left">
          <div className="row">
            <Icon action={ this.handleEdit } iconClass="fa fa-edit" class="col-md-1 col-sm-1 col-xs-1" title="Edit"/>
            <Icon action={ this.handleDelete.bind(this, this.state.request.id) } iconClass="fa fa-trash" class="col-md-1 col-sm-1 col-xs-1" title="Delete"/>
            <Icon action={ this.handleCreateProposal.bind(this, this.state.request.id) } iconClass="fa fa-cutlery" class="col-md-1 col-sm-1 col-xs-1" title="Create proposal"/>
          </div>
        </div>
      </div>
      )
    },

  editInputs: function() {
    return(
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 hidden-xs hidden-sm text-right"> { this.state.request.id } </div>
        <InputWithErrors attrName="location" errors={ this.state.errors } className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
          <input className="form-control" value={ this.state.request.location } name="location" onChange={ this.handleInputChange }/>
        </InputWithErrors>
        <InputWithErrors attrName="meal_type" errors={ this.state.errors } className="col-lg-3 col-md-2 col-sm-3 col-xs-3">
          <input className="form-control" value={ this.state.request.meal_type } name="meal_type" onChange={ this.handleInputChange }/>
        </InputWithErrors>
        <InputWithErrors attrName="meal_time" errors={ this.state.errors } className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <input className="form-control" value={ this.state.request.meal_time } name="meal_time" onChange={ this.handleInputChange }/>
        </InputWithErrors>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"/>
        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 text-left">
          <Icon type="submit" action={ this.handleUpdate.bind(this, this.state.request.id) } iconClass="fa fa-check"/>
        </div>
      </div>
    )
  },

  render() {
    var content = this.state.is_edited ? this.editInputs(): this.renderInfos();

    return (
      <div>
        { content }
      </div>
    )
  }
});
