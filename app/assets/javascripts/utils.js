function displayFlash(message) {
  var element = document.getElementById('flash-message');
  element.innerHTML = message;
  $('#flash-message').show();
  setTimeout(function() {
    $('#flash-message').fadeOut();
  }, 3000);
}
