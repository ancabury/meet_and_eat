$(document).ready(function() {
  $('.newRequestForm input[name=location]').on('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      $.ajax({
        url: '/api/locations/city',
        method: 'GET',
        data: { lat: position.coords.latitude, long: position.coords.longitude },
        success: function(response) {
          var input = $('.newRequestForm input[name=location]');
          input.val(response.city);
        },
        error: function(response) {
          console.log(response)
        }
    });
    });
  });
});
