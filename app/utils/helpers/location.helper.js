function isValidCoordinate(value) {
  const regex = /^-?\d{1,3}(\.\d{1,6})?$/; // Matches up to 6 decimal places
  return regex.test(value);
}

function isLocationValid(latitude, longitude) {
  return isValidCoordinate(latitude) && isValidCoordinate(longitude);
}

module.exports = { isLocationValid };
