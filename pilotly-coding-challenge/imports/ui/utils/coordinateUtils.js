const MEAN_EARTH_RADIUS_KM = 6371.009;
const DEGREES_IN_RADIAN = 57.29577951;
const KILOMETRES_IN_MILE = 1.60934;

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


export const convertDegreesToRadians = (degrees) => {
  return degrees / DEGREES_IN_RADIAN;
}

export const calculateDistance = (longitude1, latitude1, longitude2, latitude2) => {
  console.log(longitude1, latitude1)
  if (!isValidCoordinates(longitude1, latitude1) || !isValidCoordinates(longitude2, latitude2)) {
    return -1;
  }

  const longitude1InRadians = convertDegreesToRadians(Number(longitude1));
  const latitude1InRadians = convertDegreesToRadians(Number(latitude1));
  const longitude2InRadians = convertDegreesToRadians(Number(longitude2));
  const latitude2InRadians = convertDegreesToRadians(Number(latitude2));
  const longitudeDifference = Math.abs(longitude1InRadians - longitude2InRadians);

  const centralAngleInRadians = Math.acos(Math.sin(latitude1InRadians)
                                        * Math.sin(latitude2InRadians)
                                        + Math.cos(latitude1InRadians)
                                        * Math.cos(latitude2InRadians)
                                        * Math.cos(longitudeDifference))
  const distanceInKilometers = MEAN_EARTH_RADIUS_KM * centralAngleInRadians;

  return Number(distanceInKilometers.toFixed(2));
}