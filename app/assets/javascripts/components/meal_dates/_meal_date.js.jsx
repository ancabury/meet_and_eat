var MealDate = React.createClass({
  propTypes: {
    meal_date: React.PropTypes.object,
  },

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-right"> { this.props.meal_date.id } </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"> { this.props.meal_date.restaurant_name } </div>
          <div className="col-lg-4 col-md-3 col-sm-3 col-xs-3"> { this.props.meal_date.restaurant_address } </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"> { this.props.meal_date.meal_time } </div>
          <div className="col-lg-2 col-md-3 col-sm-3 col-xs-3"> { this.props.meal_date.participants } </div>
        </div>
      </div>
    )
  }
});
