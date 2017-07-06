var Request = React.createClass({
  propTypes: {
    request: React.PropTypes.object
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
        if (!response.responseJSON)
          this.setState({ errors: { name: response.responseText } });
        else
          this.setState({ errors: { name: response.responseJSON.errors.name } });
      }
    });
  },

//  ### HTML ###
  renderInfos: function(){
    return(
      <div className="row">
        <div className="col-lg-1"> { this.state.request.id } </div>
        <div className="col-lg-3"> { this.state.request.location } </div>
        <div className="col-lg-3"> { this.state.request.meal_type } </div>
        <div className="col-lg-3"> { this.state.request.meal_time } </div>
        <div className="col-lg-2"> <Icon action={ this.handleEdit } iconClass="fa fa-edit"/> </div>
      </div>
      )
    },

  editInputs: function() {
    return(
      <div className="row">
        <div className="col-lg-1"> { this.state.request.id } </div>
        <InputWithErrors attrName="location" errors={ this.state.errors } className="col-lg-3">
          <input className="form-control" value={ this.state.request.location } name="location" onChange={ this.handleInputChange }/>
        </InputWithErrors>
        <InputWithErrors attrName="meal_type" errors={ this.state.errors } className="col-lg-3">
          <input className="form-control" value={ this.state.request.meal_type } name="meal_type" onChange={ this.handleInputChange }/>
        </InputWithErrors>
        <InputWithErrors attrName="meal_time" errors={ this.state.errors } className="col-lg-3">
          <input className="form-control" value={ this.state.request.meal_time } name="meal_time" onChange={ this.handleInputChange }/>
        </InputWithErrors>
        <div className="col-lg-2">
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
