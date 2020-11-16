import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import { Table } from './styles';
import { AddressCollection } from '../../../api/collections';
import { calculateDistance } from '../../utils/coordinateUtils'

const AddressList = (props) => {
  const addresses = useTracker(() => {
    var addressList = AddressCollection.find({ "$where": function(address) {
        var distance = calculateDistance(address.latitude, address.longitude, props.userLatitude, props.userLongitude);
        return distance < props.maxDistance && distance !== -1;
      }
    }).fetch();
    addressList.forEach((address) => {
      address.distance = calculateDistance(address.latitude, address.longitude, props.userLatitude, props.userLongitude);
    });
    addressList.sort((address1, address2) => { return address1.distance - address2.distance});
    return addressList;
  });

  return (
    <div>
      {addresses && addresses.length > 0 ? (
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
                <td>{address.distance} km</td> 
              </tr>
            )
          }
        )}
        </tbody>
      </Table>
      )
      :
      <p>0 results found. Try a different location or increasing the search radius.</p>
      }
    </div>
  );
};

export default AddressList;
