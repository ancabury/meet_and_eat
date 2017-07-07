var MealDate = React.createClass({
  propTypes: {
    meal_date: React.PropTypes.object,
  },

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-1 text-right"> { this.props.meal_date.id } </div>
          <div className="col-lg-2"> { this.props.meal_date.restaurant_name } </div>
          <div className="col-lg-4"> { this.props.meal_date.restaurant_address } </div>
          <div className="col-lg-2"> { this.props.meal_date.meal_time } </div>
          <div className="col-lg-2"> { this.props.meal_date.participants } </div>
        </div>
      </div>
    )
  }
});
