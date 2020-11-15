import React, { useState } from 'react';

import { isValidCoordinates, isValidDistance } from '../utils/coordinateUtils'

export const AddressForm = (props) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [distance, setDistance] = useState(props.maxDistance);

  const handleSubmit = e => {
    e.preventDefault();

    if (!isValidCoordinates(latitude, longitude)) {
      return;
    }

    if (!isValidDistance(distance)) {
      setDistance(props.maxDistance);
    } else {
      props.setMaxDistance(Number(distance));
    }

    props.setUserLatitude(latitude);
    props.setUserLongitude(longitude);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Maximum Distance"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};