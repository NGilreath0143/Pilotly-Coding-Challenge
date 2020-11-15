const MEAN_EARTH_RADIUS_KM = 6371.009;
const DEGREES_IN_RADIAN = 57.29577951;
const KILOMETRES_IN_MILE = 1.60934;

export const isValidCoordinates = (latitude, longitude) => {
  var tempLatitude = Number(latitude);
  var tempLongitude = Number(longitude);


  if (!isValidCoordinate(latitude) || !isValidCoordinate(longitude)) {
    return false;
  } else if (tempLatitude > 90 || tempLatitude < -90) {
    return false;
  } else if (tempLongitude > 180 || tempLongitude < -180) {
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

export const calculateDistance = (latitude1, longitude1, latitude2, longitude2) => {

  if (!isValidCoordinates(latitude1, longitude1) || !isValidCoordinates(latitude2, longitude2)) {
    return -1;
  }

  const latitude1InRadians = convertDegreesToRadians(Number(latitude1));
  const longitude1InRadians = convertDegreesToRadians(Number(longitude1));
  const latitude2InRadians = convertDegreesToRadians(Number(latitude2));
  const longitude2InRadians = convertDegreesToRadians(Number(longitude2));
  const longitudeDifference = Math.abs(longitude1InRadians - longitude2InRadians);

  const centralAngleInRadians = Math.acos(Math.sin(latitude1InRadians)
                                        * Math.sin(latitude2InRadians)
                                        + Math.cos(latitude1InRadians)
                                        * Math.cos(latitude2InRadians)
                                        * Math.cos(longitudeDifference))

  const distanceInKilometers = MEAN_EARTH_RADIUS_KM * centralAngleInRadians;

  return Number(distanceInKilometers.toFixed(2));
}

export const isValidDistance = (distance) => {
  return distance != null && distance !== "" && !isNaN(Number(distance)) && Number(distance) >= 0;
}