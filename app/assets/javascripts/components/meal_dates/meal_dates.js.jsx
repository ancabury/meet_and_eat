var MealDates = React.createClass({
  propTypes: {
    meal_dates: React.PropTypes.array
  },

  getInitialState() { return { meal_dates: this.props.meal_dates } },

  render: function() {
    var meal_dates = this.state.meal_dates.map((r) => {
      return (
        <MealDate key={ r.id } meal_date={ r }/>
      )
    });

    return (
      <div>
        <div className="row">
          <div className="col-lg-1 text-right"><strong>#</strong></div>
          <div className="col-lg-2"><strong>Restaurant</strong></div>
          <div className="col-lg-4"><strong>Restaurant address</strong></div>
          <div className="col-lg-2"><strong>Meal time</strong></div>
          <div className="col-lg-2"><strong>Participants</strong></div>
        </div>
        { meal_dates }
      </div>
    );
  }
});

