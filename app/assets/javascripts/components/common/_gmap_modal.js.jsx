var GmapModal = React.createClass({
  map: null,

  propTypes: {
    currentLocation: React.PropTypes.string,
    position: React.PropTypes.object
  },

  componentDidMount: function() {
    window.initMap = this.initMap;

    loadjs('https://maps.googleapis.com/maps/api/js?v=3.28&key=AIzaSyD8d-Dn69ORtsOmV34QjUZwHjlDfJFAr9g&callback=initMap', { async: true });

    $('#gmapModal').on('shown.bs.modal', function () {
      google.maps.event.trigger(map, "resize");
    });
  },

  initMap: function() {
    map = new google.maps.Map(document.getElementById('gmap'), {
      zoom: 13,
      center: this.props.position
    });

    var marker = new google.maps.Marker({
      position: this.props.position,
      map: map
    });
  },

  render() {
    return(
      <div className="modal fade" id="gmapModal" tabIndex="-1" role="dialog" aria-labelledby="gmapModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Google Map</h4>
            </div>
            <div className="modal-body">
              {/*Location: { this.props.currentLocation }*/}
              <div id="gmap"/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Done</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
