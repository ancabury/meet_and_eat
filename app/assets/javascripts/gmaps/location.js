$(document).ready(function() {
  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
  }

  $('.newRequestForm input[name=location]').on('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      $.ajax({
        url: '/api/locations/city',
        method: 'GET',
        data: { lat: position.coords.latitude, long: position.coords.longitude },
        success: function(response) {
          console.log(response)
        },
        error: function(response) {
          console.log(response)
        }
    });
    });
  });
});
