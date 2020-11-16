import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import { ResultText, Table } from './styles';
import { AddressConstants } from '../../utils/constants';
import { AddressCollection } from '../../../api/collections';
import { calculateDistance, convertKilometersToMiles } from '../../utils/coordinateUtils'
import { encodeHTML } from '../../utils/helpers';

const AddressList = (props) => {
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    Meteor.call(
      "address.getAddressesWithinRange",
      props.userLatitude, props.userLongitude, props.maxDistance, props.distanceUnits,
      (error, response) => {
        if (!error && response && response.length > 0){
          setAddresses(response);
        } else {
          setAddresses([])
        }
      }
    );
  }, [props.userLatitude, props.userLongitude, props.maxDistance, props.distanceUnits])

  const distanceUnit = props.distanceUnits === AddressConstants.MetricUnits.MILES ? "mi" : "km";

  return (
    <div>
      {addresses && addresses.length > 0 ? (
      <>
      <ResultText>{props.searchedType === AddressConstants.SearchByType.ADDRESS ? `Displaying results within ${props.maxDistance} ${distanceUnit === "mi" ? "miles" : "kilometers"} of address ${encodeHTML(props.searchedAddress)}` :  `Displaying results within ${props.maxDistance} ${distanceUnit === "mi" ? "miles" : "kilometers"} of coordinates ${props.userLatitude},${props.userLongitude}`}
        
      </ResultText>
      <Table>
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
            return (
              <tr key={address._id}>
                <td>{address.street_number} {address.route}</td>
                <td>{address.locality}</td>
                <td>{address.administrativeArea}</td>
                <td>{address.country}</td>
                <td>{address.postalCode}</td>
                <td>{props.distanceUnits === AddressConstants.MetricUnits.MILES ? convertKilometersToMiles(address.distance).toFixed(2) : address.distance.toFixed(2)} {distanceUnit}</td> 
              </tr>
            )
          }
        )}
        </tbody>
      </Table>
      </>
      )
      :
      <ResultText>0 results found. Try a different location or increasing the search radius.</ResultText>
      }
    </div>
  );
};

export default AddressList;
