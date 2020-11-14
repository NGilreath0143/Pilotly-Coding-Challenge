import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { AddressCollection } from '../../api/collections';
import { isValidCoordinates } from '../utils/coordinateUtils'

const MEAN_EARTH_RADIUS_KM = 6371.009;
const DEGREES_IN_RADIAN = 57.29577951;
const KILOMETRES_IN_MILE = 1.60934;

export const AddressList = (props) => {
  const addresses = useTracker(() => {
    return AddressCollection.find().fetch();
  });

  const convertDegreesToRadians = (degrees) => {
    return degrees / DEGREES_IN_RADIAN;
  }
  const convertRadiansToDegrees = (radians) => {
    return radians * DEGREES_IN_RADIAN
  }
  const calculateDistance = (locationLongitude, locationLatitude) => {
    const userLongitudeInRadians = convertDegreesToRadians(Number(props.userLongitude));
    const userLatitudeInRadians = convertDegreesToRadians(Number(props.userLatitude));
    const locationLongitudeInRadians = convertDegreesToRadians(Number(locationLongitude));
    const locationLatitudeInRadians = convertDegreesToRadians(Number(locationLatitude));
    const longitudeDifference = Math.abs(userLongitudeInRadians - locationLongitudeInRadians);

    const centralAngleInRadians = Math.acos(Math.sin(userLatitudeInRadians)
                                          * Math.sin(locationLatitudeInRadians)
                                          + Math.cos(userLatitudeInRadians)
                                          * Math.cos(locationLatitudeInRadians)
                                          * Math.cos(longitudeDifference))
    const centralAngleInDegrees = convertRadiansToDegrees(centralAngleInRadians);
    const distanceInKilometers = MEAN_EARTH_RADIUS_KM * centralAngleInRadians;
    return distanceInKilometers.toFixed(2);
  }
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Street Address</th>
            <th>City</th>
            <th>State/Province</th>
            <th>Country/Region</th>
            <th>Zip/Postal Code</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
        {addresses.map(
          address => {
            if (isValidCoordinates(address.longitude, address.latitude)) {
              return (
                <tr key={address._id}>
                  <td>{address.street_number} {address.route}</td>
                  <td>{address.locality}</td>
                  <td>{address.administrativeArea}</td>
                  <td>{address.country}</td>
                  <td>{address.postalCode}</td>
                  { isValidCoordinates(props.userLongitude, props.userLatitude) ? 
                    <td>{calculateDistance(address.longitude, address.latitude)} km</td> 
                    : 
                    <td>-</td>
                  }
                </tr>
              )
            }
          }
        )}
        </tbody>
      </table>
    </div>
  );
};
