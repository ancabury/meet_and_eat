var NewRequest = React.createClass({
  defaultRequest: function(){
    return { location: '', meal_time: '', meal_type: '' }
  },

  propTypes: {
    saveHandler: React.PropTypes.func
  },

  getInitialState() { return { request: this.defaultRequest(), errors: {} } },

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

  saveRequest: function(e) {
    e.preventDefault();

    $.ajax({
      url: `/api/requests`,
      method: 'POST',
      data: { request: this.state.request },
      success: (response) => {
        this.props.saveHandler(response.request);
        this.setState({ request: this.defaultRequest() });
        console.log(response.msg)
      },
      error: (response) => {
        if (!response.responseJSON)
          this.setState({ errors: { name: response.responseText } });
        else
          this.setState({ errors: { name: response.responseJSON.errors.name } });
      }
    });
  },

  render: function() {
    return (
      <form className="newRequestForm" onSubmit={ this.saveRequest }>
        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 hidden-xs hidden-sm text-right"/>
        <InputWithErrors attrName="location" errors={ this.state.errors } className="col-lg-3 col-md-2 col-sm-2 col-xs-2 text-center">
          <input className="form-control" value={ this.state.request.location } name="location" onChange={ this.handleInputChange }/>
        </InputWithErrors>
        <InputWithErrors attrName="meal_type" errors={ this.state.errors } className="col-lg-3 col-md-2 col-sm-2 col-xs-2 text-center">
          <input className="form-control" value={ this.state.request.meal_type } name="meal_type" onChange={ this.handleInputChange }/>
        </InputWithErrors>
        <InputWithErrors attrName="meal_time" errors={ this.state.errors } className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
          <input className="form-control" value={ this.state.request.meal_time } name="meal_time" onChange={ this.handleInputChange }/>
        </InputWithErrors>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"/>
        <div className="col-lg-1 col-md-2 col-sm-2 col-xs-1 text-left">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    )
  }
})
