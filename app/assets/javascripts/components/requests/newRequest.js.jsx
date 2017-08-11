var NewRequest = React.createClass({
  defaultRequest: function(){
    return { location: '', meal_time: '', meal_type: '' }
  },

  propTypes: {
    mealTimeOptions: React.PropTypes.array,
    saveHandler: React.PropTypes.func
  },

  getInitialState() { return { request: this.defaultRequest(), errors: {} } },

//  ### HTML ###
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
        let flash = JST['templates/alert_success']({msg: response.msg, styles: 'width: inherit;'});
        displayFlash(flash);
      },
      error: (response) => {
        this.setState({ errors: response.responseJSON.errors });
      }
    });
  },

  render: function() {
    return (
      <form className="newRequestForm" onSubmit={ this.saveRequest }>
        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 hidden-xs hidden-sm text-right"/>
        <InputWithErrors attrName="location" errors={ this.state.errors } className="col-lg-3 col-md-2 col-sm-2 col-xs-2 text-center">
          <input type="text" className="form-control" value={ this.state.request.location } name="location" onChange={ this.handleInputChange } aria-describedby="geoLocation"/>
          <span className="form-control-feedback" aria-hidden="true">
            <i className="fa fa-map-marker" aria-hidden="true"/>
          </span>
        </InputWithErrors>
        <InputWithErrors attrName="meal_type" errors={ this.state.errors } className="col-lg-3 col-md-2 col-sm-2 col-xs-2 text-center">
          <input className="form-control" value={ this.state.request.meal_type } name="meal_type" onChange={ this.handleInputChange }/>
        </InputWithErrors>
        <InputWithErrors attrName="meal_time" errors={ this.state.errors } className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
          { this.mealTimeSelect() }
        </InputWithErrors>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"/>
        <div className="col-lg-1 col-md-2 col-sm-2 col-xs-1 text-left">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    )
  }
})
