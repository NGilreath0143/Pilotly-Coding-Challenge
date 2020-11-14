import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { AddressCollection } from '../../api/collections';
import { isValidCoordinates } from '../utils/coordinateUtils'

export const AddressForm = (props) => {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const filterAddresses = () => {
    const addresses = useTracker(() =>
      AddressCollection.find({administrativeArea: "CA"}, {
        sort: { createdAt: -1 },
      }).fetch()
    );
    console.log(addresses)
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!isValidCoordinates(longitude, latitude)) {
      return;
    }

    // Meteor.call('addresses.searchAddressesInRangeByAddress', text);
    props.setUserLongitude(longitude);
    props.setUserLatitude(latitude);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Maximum Distance"
        value={maxDistance}
        onChange={(e) => setMaxDistance(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};