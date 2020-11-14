export const isValidCoordinates = (longitude, latitude) => {
    var tempLongitude = Number(longitude);
    var tempLatitude = Number(latitude);

    if (!isValidCoordinate(longitude) || !isValidCoordinate(latitude)) {
      return false;
    } else if (tempLongitude > 180 || tempLongitude < -180) {
      return false;
    } else if (tempLatitude > 90 || tempLatitude < -90) {
      return false;
    }
    return true;
}

export const isValidCoordinate = (coordinate) => {
    return coordinate != null && coordinate !== "" && !isNaN(Number(coordinate));
}