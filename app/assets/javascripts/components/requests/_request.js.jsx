var Request = React.createClass({
  propTypes: {
    request: React.PropTypes.object,
    deleteHandler: React.PropTypes.func,
    mealTimeOptions: React.PropTypes.array
  },

  getInitialState() { return { is_edited: false, request: this.props.request, errors: {} } },

  componentDidMount() {
    $.ajax({
      url: `/api/requests/${this.state.request.id}/permissions`,
      method: 'GET',
      success: (response) => {
        this.setState({ can_edit: response.permissions.edit, can_destroy: response.permissions.destroy, can_create_proposal: response.permissions.create_proposal })
      },
    });
  },

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
        let flash = JST['templates/alert_success']({msg: request.msg, styles: 'width: inherit;'});
        displayFlash(flash);
      },
      error: this.handleErrors
    });
  },

  handleDelete: function(id) {
    $.ajax({
      url: `/api/requests/${id}`,
      method: 'DELETE',
      success: (request) => {
        this.props.deleteHandler(id);
        let flash = JST['templates/alert_success']({msg: request.msg, styles: 'width: inherit;'});
        displayFlash(flash);
      },
      error: this.handleErrors
    });
  },

  handleCreateProposal: function(id) {
    $.ajax({
      url: `/api/proposals`,
      method: 'POST',
      data: { proposal: { request_id: id} },
      success: (request) => {
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
      if(response.responseJSON.request)
        this.setState({ is_edited: false, request: response.responseJSON.request })
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
            <Icon action={ this.handleEdit } iconClass="fa fa-edit" class="col-md-1 col-sm-1 col-xs-1" title="Edit"
                  permission={ this.state.can_edit }/>
            <Icon action={ this.handleDelete.bind(this, this.state.request.id) } iconClass="fa fa-trash" class="col-md-1 col-sm-1 col-xs-1" title="Delete"
                  permission={ this.state.can_destroy }/>
            <Icon action={ this.handleCreateProposal.bind(this, this.state.request.id) } iconClass="fa fa-cutlery" class="col-md-1 col-sm-1 col-xs-1" title="Create proposal"
                  permission={ this.state.can_create_proposal }/>
          </div>
        </div>
      </div>
      )
    },

  mealTimeSelect: function() {
    return(
      <select value={ this.state.request.meal_time } className="form-control" name="meal_time" onChange={ this.handleInputChange }>
        <option value="" disabled/>
        {
          this.props.mealTimeOptions.map(function(opt) {
            return <option key={ opt } value={ opt }>{ opt }</option>
          })
        }
      </select>
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
          { this.mealTimeSelect() }
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
