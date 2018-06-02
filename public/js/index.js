window.onload = (() => {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitudeInput = document.getElementById('latitude') || {};
    const longitudeInput = document.getElementById('longitude') || {};
    const messageLabel = document.getElementById('message-label') || {};
    messageLabel.innerText = 'This is your current location';
    const { latitude, longitude } = position.coords;
    longitudeInput.value = longitude;
    latitudeInput.value = latitude;
  }, () => {
    const messageLabel = document.getElementById('message-label');
    messageLabel.innerText = 'Failed to get your current location';
  });
})();